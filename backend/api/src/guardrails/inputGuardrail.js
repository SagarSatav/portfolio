const BLOCKED = [/ignore previous instructions/i, /system prompt/i];

export function assertSafeUserInput(text) {
  if (!text || typeof text !== "string") {
    return { ok: false, reason: "Message must be a non-empty string." };
  }
  if (text.length > 2000) {
    return { ok: false, reason: "Message is too long (max 2000 chars)." };
  }
  if (BLOCKED.some((re) => re.test(text))) {
    return { ok: false, reason: "Message blocked by safety rules." };
  }
  return { ok: true };
}
