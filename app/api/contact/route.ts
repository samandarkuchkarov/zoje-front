import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { sendTelegramMessage } from '@/lib/telegram';

const ContactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  message: z.string().min(5),
});

function formatContactMessage(data: z.infer<typeof ContactSchema>) {
  return `📩 Новая заявка с сайта ZOJE

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}

💬 Сообщение:
${data.message}`;
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', details: parsed.error.issues },
      { status: 422 }
    );
  }

  try {
    await sendTelegramMessage(formatContactMessage(parsed.data));
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Telegram failed',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
