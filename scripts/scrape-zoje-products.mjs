import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://www.zoje.com';
const PRODUCT_PAGES = [
  '/ru/products/',
  ...Array.from({ length: 13 }, (_, i) => `/ru/products_${i + 2}/`),
];

const CATEGORY_MAP = {
  straight: 'industrial',
  overlock: 'overlock',
  cover: 'overlock',
  zigzag: 'pattern',
  twin: 'industrial',
  special: 'specialty',
  heavy: 'heavy-duty',
  automation: 'specialty',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function absoluteUrl(url) {
  if (!url) return '';
  return new URL(url.replace(/&amp;/g, '&'), ORIGIN).href;
}

function decodeEntities(value = '') {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10))
    );
}

function stripTags(html = '') {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|h\d|li|tr)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[ \t\r\f\v]+/g, ' ')
      .replace(/\n\s+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function cleanHtml(html = '') {
  return decodeEntities(
    html
      .replace(/\s+(class|style|width|height|valign|data-[^=]+)="[^"]*"/gi, '')
      .replace(/\s+(class|style|width|height|valign|data-[^=]+)='[^']*'/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function matchOne(html, pattern) {
  const match = html.match(pattern);
  return match ? decodeEntities(match[1]).trim() : '';
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function slugify(value) {
  const base = value
    .replace(/Серия/gi, '')
    .replace(/серия/gi, '')
    .replace(/series/gi, '')
    .normalize('NFKD')
    .replace(/[^\w\s/+.-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || createHash('sha1').update(value).digest('hex').slice(0, 8);
}

function modelKey(value) {
  return slugify(value).replace(/-/g, '');
}

async function fetchText(url, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; ZojeCatalogImporter/1.0; +https://zoje.uz)',
      },
    });
    if (response.ok) return response.text();
    if (attempt === retries - 1) {
      throw new Error(`Failed ${response.status} ${url}`);
    }
    await wait(400 * (attempt + 1));
  }
  return '';
}

async function fetchBuffer(url, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; ZojeCatalogImporter/1.0; +https://zoje.uz)',
      },
    });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (attempt === retries - 1) {
      throw new Error(`Failed ${response.status} ${url}`);
    }
    await wait(400 * (attempt + 1));
  }
  return Buffer.from('');
}

async function urlExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.includes('video');
  } catch {
    return false;
  }
}

function extractImages(block = '') {
  return unique(
    [...block.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map((m) =>
      absoluteUrl(m[1])
    )
  );
}

function extractManuals(html) {
  const block = html.match(/<div class="ipdtext[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (!block) return [];
  return [...block[0].matchAll(/<dd>\s*<a href=["']([^"']+)["'][^>]*>[\s\S]*?<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => ({
      label: stripTags(m[2]),
      url: absoluteUrl(m[1]),
    }))
    .filter((manual) => manual.url);
}

function parseCells(rowHtml) {
  return [...rowHtml.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => {
    const html = m[1];
    return {
      text: stripTags(html),
      images: extractImages(html),
    };
  });
}

function parseParameterTables(block = '') {
  return [...block.matchAll(/<table([^>]*)>([\s\S]*?)<\/table>/gi)].map((table) => ({
    className: matchOne(table[1], /class=["']([^"']+)["']/i),
    rows: [...table[2].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
      .map((row) => parseCells(row[1]))
      .filter((row) => row.length > 0),
  }));
}

function extractVideoUrls(html, models) {
  const explicit = unique([
    ...[...html.matchAll(/<video[^>]+src=["']([^"']+\.mp4[^"']*)["']/gi)].map((m) =>
      absoluteUrl(m[1])
    ),
    ...[...html.matchAll(/\brev=["']([^"']+\.mp4[^"']*)["']/gi)].map((m) =>
      absoluteUrl(m[1])
    ),
    ...[...html.matchAll(/["']([^"']+\.mp4[^"']*)["']/gi)].map((m) =>
      absoluteUrl(m[1])
    ),
  ]);

  const inferredCandidates = unique(
    models.flatMap((model) => {
      const raw = model.replace(/^zj-/i, '').replace(/\s+/g, '');
      const base = raw.split(/[/(]/)[0].replace(/[^a-z0-9-]/gi, '');
      const withoutSuffix = base.replace(/[a-z]$/i, '');
      return [raw, base, withoutSuffix]
        .filter((part) => /^[a-z0-9-]{3,}$/i.test(part))
        .flatMap((part) => [
          `${ORIGIN}/static/images/${part}.mp4`,
          `${ORIGIN}/static/images/${part.toUpperCase()}.mp4`,
        ]);
    })
  );

  return { explicit, inferredCandidates };
}

function extractModels(listTitle, detailTitle) {
  const text = `${listTitle} ${detailTitle}`;
  return unique(
    [
      ...text.matchAll(
        /\b(?:ZJ[-\s]?)?[A-Z]{0,4}[-\s]?\d[A-Z0-9-]*(?:[-/][A-Z0-9]+)*\+?/gi
      ),
    ].map((m) => {
      const compact = m[0].replace(/\s+/g, '').replace(/^ZJ-?/i, 'ZJ-');
      return compact.replace(/--+/g, '-');
    })
  );
}

function parseListItems(html) {
  const listBlock = html.match(/<div class="ipdlist[\s\S]*?<div class="page-list">/i)?.[0] ?? '';
  return [...listBlock.matchAll(/<li>\s*<a href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>\s*<\/li>/gi)].map(
    (m) => {
      const href = absoluteUrl(m[1]);
      const body = m[2];
      return {
        officialUrl: href,
        categorySlug: href.match(/\/products\/([^/]+)\//)?.[1] ?? '',
        listTitle: stripTags(matchOne(body, /<h3>([\s\S]*?)<\/h3>/i)),
        summaryRu: stripTags(matchOne(body, /<p>([\s\S]*?)<\/p>/i)),
        listImage: extractImages(body)[0] ?? '',
      };
    }
  );
}

async function downloadImage(remoteUrl, productSlug, prefix, index) {
  const pathname = new URL(remoteUrl).pathname;
  const ext = path.extname(pathname).split('?')[0] || '.jpg';
  const fileName = `${prefix}-${index}${ext.toLowerCase()}`;
  const publicDir = path.join(process.cwd(), 'public', 'products', productSlug);
  const localFile = path.join(publicDir, fileName);
  const publicPath = `/products/${productSlug}/${fileName}`;

  await mkdir(publicDir, { recursive: true });
  const bytes = await fetchBuffer(remoteUrl);
  await writeFile(localFile, bytes);
  return publicPath;
}

async function enrichProduct(item, position) {
  const html = await fetchText(item.officialUrl);
  const detailTitle = stripTags(matchOne(html, /<h1>([\s\S]*?)<\/h1>/i));
  const models = extractModels(item.listTitle, detailTitle);
  const model = models[0] || item.listTitle.replace(/^Серия\s+/i, '').trim();
  const productSlug = slugify(model || item.listTitle || `${position}`);
  const galleryBlock =
    html.match(/<div class="ipdimg[\s\S]*?<div class="ipdtext/i)?.[0] ?? '';
  const galleryRemote = extractImages(galleryBlock);

  const introBlock =
    html.match(/<div class="container wz1[\s\S]*?(?=<div class="ipdpara)/i)?.[0] ??
    '';
  let paramsBlock =
    html.match(/<section class="ipdcs[^"]*"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ??
    '';
  if (!stripTags(paramsBlock) && /<table/i.test(introBlock)) {
    paramsBlock = introBlock;
  }
  const supportMaterialUrl = absoluteUrl(
    html.match(/<a href=["']([^"']+)["'][^>]*>\s*支持材料\s*<\/a>/i)?.[1] ?? ''
  );
  const advantageRu = stripTags(
    matchOne(html, /<strong>[^<]*<\/strong>([\s\S]*?)<\/section>/i)
  );

  const gallery = [];
  for (let i = 0; i < galleryRemote.length; i += 1) {
    const localPath = await downloadImage(galleryRemote[i], productSlug, 'gallery', i + 1);
    gallery.push({ remoteUrl: galleryRemote[i], localPath });
  }

  const parameterImages = extractImages(paramsBlock);
  const parameterLocalImages = [];
  for (let i = 0; i < parameterImages.length; i += 1) {
    const localPath = await downloadImage(parameterImages[i], productSlug, 'parameter', i + 1);
    parameterLocalImages.push({ remoteUrl: parameterImages[i], localPath });
  }

  const introImages = extractImages(introBlock);
  const introLocalImages = [];
  for (let i = 0; i < introImages.length; i += 1) {
    const localPath = await downloadImage(introImages[i], productSlug, 'intro', i + 1);
    introLocalImages.push({ remoteUrl: introImages[i], localPath });
  }

  const videoData = extractVideoUrls(html, models);
  const inferredVideos = [];
  for (const candidate of videoData.inferredCandidates.slice(0, 8)) {
    if (await urlExists(candidate)) {
      inferredVideos.push(candidate);
    }
  }

  const videos = unique([...videoData.explicit, ...inferredVideos]).map((url) => ({ url }));

  return {
    sourceId: item.officialUrl.match(/\/(\d+)\.html/)?.[1] ?? String(position),
    slug: productSlug,
    model,
    models,
    titleRu: detailTitle || item.listTitle,
    category: {
      officialSlug: item.categorySlug,
      localCategory: CATEGORY_MAP[item.categorySlug] ?? 'specialty',
    },
    officialUrl: item.officialUrl,
    summaryRu: item.summaryRu,
    advantageRu,
    listImage: item.listImage,
    gallery,
    videos,
    manuals: extractManuals(html),
    supportMaterialUrl,
    introduction: {
      textRu: stripTags(introBlock),
      html: cleanHtml(introBlock),
      images: introLocalImages,
    },
    parameters: {
      textRu: stripTags(paramsBlock),
      html: cleanHtml(paramsBlock),
      images: parameterLocalImages,
      tables: parseParameterTables(paramsBlock),
    },
  };
}

async function main() {
  const seen = new Set();
  const listItems = [];

  for (const page of PRODUCT_PAGES) {
    const html = await fetchText(absoluteUrl(page));
    const items = parseListItems(html);
    for (const item of items) {
      if (!seen.has(item.officialUrl)) {
        seen.add(item.officialUrl);
        listItems.push(item);
      }
    }
  }

  const products = [];
  for (let i = 0; i < listItems.length; i += 1) {
    const item = listItems[i];
    console.log(`[${i + 1}/${listItems.length}] ${item.listTitle}`);
    products.push(await enrichProduct(item, i + 1));
    await wait(150);
  }

  const output = {
    source: `${ORIGIN}/ru/products/`,
    scrapedAt: new Date().toISOString(),
    productCount: products.length,
    products,
  };

  await writeFile(
    path.join(process.cwd(), 'data', 'zoje-official-products.json'),
    `${JSON.stringify(output, null, 2)}\n`
  );

  const legacyPath = path.join(process.cwd(), 'data', 'products.json');
  const legacy = JSON.parse(await readFile(legacyPath, 'utf8'));
  const byModel = new Map(
    products.flatMap((product) =>
      product.models.flatMap((model) => [
        [slugify(model), product],
        [modelKey(model), product],
      ])
    )
  );

  const merged = legacy.map((product) => {
    const official =
      byModel.get(slugify(product.model)) ||
      byModel.get(modelKey(product.model)) ||
      byModel.get(slugify(product.slug)) ||
      byModel.get(modelKey(product.slug)) ||
      products.find((candidate) =>
        candidate.models.some((model) =>
          modelKey(product.model).includes(modelKey(model)) ||
          modelKey(model).includes(modelKey(product.model))
        )
      );

    if (!official) return product;

    return {
      ...product,
      images: official.gallery.map((image) => image.localPath),
      officialUrl: official.officialUrl,
      videoUrls: official.videos.map((video) => video.url),
      manuals: official.manuals,
      supportMaterialUrl: official.supportMaterialUrl,
      officialParameters: official.parameters.tables,
      officialDescriptionRu: official.introduction.textRu,
    };
  });

  await writeFile(legacyPath, `${JSON.stringify(merged, null, 2)}\n`);

  console.log(
    `Done: ${products.length} official products, ${merged.length} shop products merged.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
