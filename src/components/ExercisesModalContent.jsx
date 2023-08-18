import React from "react";
import { Button } from "./Button";
import ExercisesList from "./ExercisesList";

function ExercisesModalContent({
  handleClose,
  selectedExercises,
  allExercises,
  isEdition,
  updateSelectedExercises,
}) {
  return (
    <>
      <h2>Choose your Exercises</h2>
      <Button onClick={handleClose}>Close</Button>
      <input type="search" name="" id="" />
      <Button>Add</Button>
      <ExercisesList
        selectedExercises={selectedExercises}
        isEdition={isEdition}
        updateSelectedExercises={updateSelectedExercises}
      />
    </>
  );
}

export default ExercisesModalContent;
