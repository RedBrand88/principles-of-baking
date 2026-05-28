const UNICODE_FRACTIONS: Record<string, string> = {
  '½': '1/2',
  '¼': '1/4',
  '¾': '3/4',
  '⅛': '1/8',
};

export const parseFraction = (s: string): number | null => {
  let normalized = s.trim();
  if (!normalized) return null;

  for (const [unicode, ascii] of Object.entries(UNICODE_FRACTIONS)) {
    normalized = normalized.split(unicode).join(ascii);
  }

  // Plain integer or decimal (no negatives)
  if (/^\d+(\.\d+)?$/.test(normalized)) return parseFloat(normalized);

  // Simple fraction: a/b
  const simple = normalized.match(/^(\d+)\/(\d+)$/);
  if (simple) {
    const den = parseInt(simple[2], 10);
    if (den === 0) return null;
    return parseInt(simple[1], 10) / den;
  }

  // Mixed number: w a/b
  const mixed = normalized.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const den = parseInt(mixed[3], 10);
    if (den === 0) return null;
    return parseInt(mixed[1], 10) + parseInt(mixed[2], 10) / den;
  }

  return null;
};
