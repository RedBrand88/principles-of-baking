export const toFraction = (decimal: number): string => {
  const fractions = [
    {value: 1/8, display: "⅛"},
    {value: 1/4, display: "¼"},
    {value: 1/2, display: "½"},
    {value: 3/4, display: "¾"},
    {value: 1, display: "1"},
  ];

  const whole = Math.floor(decimal);
  const remainder = decimal - whole;

  if (remainder < 0.05) return whole > 0 ? `${whole}` : "0";

  let closest = fractions[0];
  for (const f of fractions) {
    if (Math.abs(f.value - remainder) < Math.abs(closest.value - remainder)) {
      closest = f;
    }
  }
  if (closest.value === 1) {
    return `${whole + 1}`
  }

  const leftover = remainder - closest.value;
  let secondFraction = null;
  if (Math.abs(leftover) >= 0.07) {
    let closestLeftover = fractions[0];
    for (const f of fractions) {
      if (Math.abs(f.value - Math.abs(leftover)) < Math.abs(closestLeftover.value - Math.abs(leftover))) {
        closestLeftover = f;
      }
    }
    if (closestLeftover.value === 1) {
      secondFraction = null;
    } else {
      secondFraction = closestLeftover;
    }
  }

  const fractionStr = secondFraction
    ? `${closest.display} + ${secondFraction.display}`
    : closest.display;

  return whole > 0 ? `${whole} ${fractionStr}` : fractionStr;
};

export const tbspToFraction = (decimal: number): string => {
  const whole = Math.floor(decimal);
  const remainder = decimal - whole;

  if (remainder < 0.15) return whole > 0 ? `${whole}` : "0";
  if (remainder < 0.65) return whole > 0 ? `${whole} ½` : "½";
  return `${whole + 1}`;
};
