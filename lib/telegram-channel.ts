export type TelegramPost = {
  id: string;
  postUrl: string;
  text: string;
  image?: string;
  date: string;
  views?: string;
};

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&laquo;': '«',
  '&raquo;': '»',
  '&hellip;': '…',
  '&ndash;': '–',
  '&mdash;': '—',
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&[a-z]+;/g, (m) => ENTITIES[m] ?? m);
}

function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div)>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parsePosts(html: string): TelegramPost[] {
  const chunks = html.split('<div class="tgme_widget_message_wrap');
  chunks.shift();

  const posts: TelegramPost[] = [];
  for (const chunk of chunks) {
    const idMatch = chunk.match(/data-post="([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];

    const dateMatch = chunk.match(/<time[^>]+datetime="([^"]+)"/);
    const textMatch = chunk.match(
      /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const photoMatch = chunk.match(
      /tgme_widget_message_photo_wrap[^"]*"[^>]*style="[^"]*background-image:url\('([^']+)'\)/
    );
    const viewsMatch = chunk.match(
      /tgme_widget_message_views">([^<]+)<\/span>/
    );

    const text = htmlToText(textMatch?.[1] ?? '');
    if (!text && !photoMatch) continue;

    posts.push({
      id,
      postUrl: `https://t.me/${id}`,
      text,
      image: photoMatch?.[1],
      date: dateMatch?.[1] ?? '',
      views: viewsMatch?.[1]?.trim(),
    });
  }

  return posts;
}

export async function getLatestChannelPosts(
  channel: string,
  limit = 8
): Promise<TelegramPost[]> {
  try {
    const res = await fetch(`https://t.me/s/${channel}`, {
      next: { revalidate: 600, tags: [`telegram:${channel}`] },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const posts = parsePosts(html);
    return posts.slice(-limit).reverse();
  } catch {
    return [];
  }
}
