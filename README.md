# Zoje.uz — Sewing Machine E-commerce Site

Online shop for Zoje brand sewing machines in Uzbekistan. Customers browse machines, add them to a cart, and submit an order request. A manager contacts the customer to confirm — no online payment.

## Stack

- **Next.js 16** (App Router, TypeScript strict)
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** (cart, localStorage persist)
- **React Hook Form + Zod** (form validation)
- **Motion (motion/react)** (animations)
- **next-intl** (Uzbek/Russian i18n)
- **Resend** (email notifications)
- **Telegram Bot API** (order notifications)

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Configure env vars
cp .env.example .env.local
# Fill in TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RESEND_API_KEY, ORDER_EMAIL_TO

# 3. Run dev server
pnpm dev
```

Site is at http://localhost:3000 and redirects to `/uz` by default.

## Env vars

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | From @BotFather |
| `TELEGRAM_CHAT_ID` | Yes | Chat/channel to receive orders |
| `RESEND_API_KEY` | Yes | From resend.com dashboard |
| `ORDER_EMAIL_TO` | Yes | Email receiving order notifications |

## Adding a product

1. Open `data/products.json`
2. Add a new object following the `Product` type in `types/product.ts`
3. Place images in `public/products/<slug>/` as `1.webp`, `2.webp`, …
4. Rebuild or restart dev server

Example entry:
```json
{
  "id": "25",
  "slug": "zj-newmodel",
  "name": { "uz": "Zoje ZJ-NewModel", "ru": "Zoje ZJ-NewModel" },
  "category": "industrial",
  "model": "ZJ-NewModel",
  "images": ["/products/zj-newmodel/1.webp"],
  "price": 7000000,
  "inStock": true,
  "featured": false,
  "shortDescription": { "uz": "...", "ru": "..." },
  "description": { "uz": "...", "ru": "..." },
  "specs": {
    "motor": "Servo motor 550W",
    "maxSpeed": "4500 SPM",
    "voltage": "220V / 50Hz"
  }
}
```

## Deploy to Vercel

Push to GitHub, then connect the repo in Vercel. Set all env vars under **Settings → Environment Variables**. No extra config needed — `next.config.ts` is already set up.

## Routes

| Route | Description |
|---|---|
| `/uz` or `/ru` | Homepage |
| `/uz/catalog` | All products with filters |
| `/uz/catalog/[category]` | Category page |
| `/uz/product/[slug]` | Product detail |
| `/uz/cart` | Cart |
| `/uz/checkout` | Order form |
| `/uz/order/success` | Thank-you page |
| `/uz/about` | About |
| `/uz/contact` | Contact |

## Project structure

```
app/
  [locale]/       # All i18n pages
  api/order/      # POST handler → Telegram + Resend
components/
  layout/         # Header, Footer
  catalog/        # ProductCard, CatalogView, Filters
  product/        # Gallery, AddToCartButton, SpecsTable
  cart/           # CartDrawer, CartPageView
  checkout/       # CheckoutForm
  home/           # HeroSection, WhyUsSection, CtaSection
  shared/         # PriceTag, Breadcrumbs, QuantityInput, etc.
data/
  products.json   # Seed data — 24 Zoje models
i18n/             # next-intl routing & request config
messages/         # uz.json, ru.json
store/
  cart.ts         # Zustand cart store
types/
  product.ts      # Product type
```
