import React, { useState } from "react";
import { Button } from "./Button";
import ExercisesList from "./ExercisesList";
import { styled } from "styled-components";

function ExercisesModalContent({
  handleClose,
  selectedExercises,
  allExercisesData,
  isEdition,
  updateSelectedExercises,
  selectedMuscleGroup,
}) {
  const [isSearching, setIsSearching] = useState(false);
  const handleIsSearching = () => {
    setIsSearching((s) => !s);
  };
  return (
    <StyledExercisesModalContent>
      <Button onClick={handleClose}>Close</Button>
      <h2>Choose your Exercises</h2>

      <ExercisesList
        selectedExercises={selectedExercises}
        isEdition={isEdition}
        updateSelectedExercises={updateSelectedExercises}
        allExercisesData={allExercisesData}
        isSearching={isSearching}
        handleIsSearching={handleIsSearching}
        selectedMuscleGroup={selectedMuscleGroup}
      />
    </StyledExercisesModalContent>
  );
}

export default ExercisesModalContent;

const StyledExercisesModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
