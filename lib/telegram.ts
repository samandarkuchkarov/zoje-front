type TelegramOptions = {
  parseMode?: 'Markdown' | 'HTML';
};

export async function sendTelegramMessage(
  text: string,
  options: TelegramOptions = {}
): Promise<void> {
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
        text,
        ...(options.parseMode ? { parse_mode: options.parseMode } : {}),
      }),
    }
  );

  if (!res.ok) throw new Error(`Telegram error: ${res.status}`);
}
