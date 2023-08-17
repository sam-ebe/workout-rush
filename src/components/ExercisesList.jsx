import React from "react";

function ExercisesList({ selectedExercises }) {
  return (
    <ul>
      {selectedExercises.map((exercise) => {
        return <li key={exercise.id}>{exercise.exercise_name}</li>;
      })}
    </ul>
  );
}

export default ExercisesList;
