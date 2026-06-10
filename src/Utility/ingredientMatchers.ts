export const isFlour = (name: string): boolean => name.toLowerCase().includes("flour");
export const isWater = (name: string): boolean => name.toLowerCase().includes("water");
export const isYeast = (name: string): boolean => name.toLowerCase().includes("yeast");
export const isStarter = (name: string): boolean => {
  const lower = name.toLowerCase();
  return (
    lower.includes("starter") ||
    lower.includes("levain") ||
    lower.includes("sourdough") ||
    lower.includes("discard") ||
    lower.includes("biga") ||
    lower.includes("poolish")
  );
};
