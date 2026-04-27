import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { generateOrderId } from '@/lib/format';

const PHONE_REGEX = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

const OrderItemSchema = z.object({
  productId: z.string(),
  model: z.string(),
  name: z.object({ uz: z.string(), ru: z.string() }),
  price: z.number(),
  quantity: z.number().int().positive(),
});

const OrderSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(PHONE_REGEX),
  city: z.string().min(1),
  address: z.string().min(1),
  comment: z.string().optional(),
  items: z.array(OrderItemSchema).min(1),
});

type OrderItem = z.infer<typeof OrderItemSchema>;

function formatTelegramMessage(
  orderId: string,
  data: z.infer<typeof OrderSchema>
): string {
  const total = data.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const itemLines = data.items
    .map(
      (i) =>
        `  • ${i.model} — ${i.quantity} шт. × ${i.price.toLocaleString('ru-RU')} сум = ${(i.price * i.quantity).toLocaleString('ru-RU')} сум`
    )
    .join('\n');

  return `🧵 *Новый заказ ${orderId}*

👤 *Клиент:* ${data.fullName}
📞 *Телефон:* ${data.phone}
🏙️ *Город:* ${data.city}
📍 *Адрес:* ${data.address}
${data.comment ? `💬 *Комментарий:* ${data.comment}` : ''}

📦 *Товары:*
${itemLines}

💰 *Итого: ${total.toLocaleString('ru-RU')} сум*`;
}

async function sendTelegram(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Telegram env vars missing');

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    }
  );
  if (!res.ok) throw new Error(`Telegram error: ${res.status}`);
}

async function sendEmail(
  orderId: string,
  data: z.infer<typeof OrderSchema>
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  if (!apiKey || !to) throw new Error('Resend env vars missing');

  const total = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemRows = data.items
    .map(
      (i) =>
        `<tr><td>${i.model}</td><td>${i.name.ru}</td><td>${i.quantity}</td><td>${(i.price * i.quantity).toLocaleString('ru-RU')} сум</td></tr>`
    )
    .join('');

  const html = `
<h2>Новый заказ: ${orderId}</h2>
<p><b>Имя:</b> ${data.fullName}<br>
<b>Телефон:</b> ${data.phone}<br>
<b>Город:</b> ${data.city}<br>
<b>Адрес:</b> ${data.address}<br>
${data.comment ? `<b>Комментарий:</b> ${data.comment}` : ''}
</p>
<table border="1" cellpadding="6" cellspacing="0">
<thead><tr><th>Модель</th><th>Название</th><th>Кол-во</th><th>Сумма</th></tr></thead>
<tbody>${itemRows}</tbody>
<tfoot><tr><td colspan="3"><b>Итого</b></td><td><b>${total.toLocaleString('ru-RU')} сум</b></td></tr></tfoot>
</table>`;

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'orders@zoje.uz',
    to,
    subject: `Новый заказ ${orderId} — Zoje.uz`,
    html,
  });
  if (error) throw new Error(error.message);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', details: parsed.error.issues },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const orderId = generateOrderId();
  const message = formatTelegramMessage(orderId, data);

  let telegramOk = false;
  let emailOk = false;
  const errors: string[] = [];

  try {
    await sendTelegram(message);
    telegramOk = true;
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Telegram failed');
  }

  try {
    await sendEmail(orderId, data);
    emailOk = true;
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Email failed');
  }

  if (!telegramOk && !emailOk) {
    return NextResponse.json(
      { ok: false, error: 'Both notification channels failed', details: errors },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId });
}
