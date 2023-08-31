// clamp a value within a specific range, especially for input min value
export const clampValue = (value, minValue) => {
  return Math.max(value, minValue);
};
