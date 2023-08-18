import React, { useEffect, useState } from "react";
import { Button } from "./Button";

function ExercisesList({
  selectedExercises,
  isEdition = false,
  updateSelectedExercises,
}) {
  const [selectedExercisesCopy, setSelectedExercisesCopy] = useState([]);

  useEffect(() => {
    setSelectedExercisesCopy([...selectedExercises]);
  }, [selectedExercises]);

  const handleDelete = (id) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id),
    );
  };

  const handleEdit = () => {};
  const handleReset = () => {
    setSelectedExercisesCopy([...selectedExercises]);
  };
  const handleSave = () => {
    updateSelectedExercises(selectedExercisesCopy);
  };
  return (
    <>
      <ul>
        {selectedExercisesCopy.map((exercise) => {
          return (
            <li key={exercise.id}>
              {exercise.exercise_name}
              {isEdition && (
                <>
                  <Button onClick={handleEdit}>Edit</Button>
                  <Button onClick={() => handleDelete(exercise.id)}>
                    Delete
                  </Button>
                </>
              )}
            </li>
          );
        })}
      </ul>
      {isEdition && (
        <>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleReset}>Reset</Button>
        </>
      )}
    </>
  );
}

export default ExercisesList;
