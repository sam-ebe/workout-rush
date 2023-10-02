// clamp a value within a specific range, especially for input min value
export const clampValue = (value, minValue) => {
  return Math.max(value, minValue);
};

// check if the exercise name contains "hold" or "plank" to determine the use of seconds (hold) or reps (not a hold) in a given set
export const isHold = (exerciseName) => {
  return exerciseName.includes("hold") || exerciseName.includes("plank");
};
