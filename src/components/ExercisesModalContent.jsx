import React from "react";
import { Button } from "./Button";
import ExercisesList from "./ExercisesList";

function ExercisesModalContent({
  handleClose,
  selectedExercises,
  allExercises,
}) {
  return (
    <>
      <h2>Choose your Exercises</h2>
      <Button onClick={handleClose}>Close</Button>
      <input type="search" name="" id="" />
      <ExercisesList selectedExercises={selectedExercises} />
    </>
  );
}

export default ExercisesModalContent;
