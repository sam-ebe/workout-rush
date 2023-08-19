import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import SearchList from "./SearchList";
import { styled } from "styled-components";

function ExercisesList({
  selectedExercises,
  isEdition = false,
  updateSelectedExercises,
  allExercisesData,
  isSearching = false,
  handleIsSearching,
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
  const updateSelectedExercisesCopy = (id) => {
    setSelectedExercisesCopy([
      ...selectedExercisesCopy,
      ...allExercisesData.filter((exercise) => exercise.id === id),
    ]);
  };
  return (
    <>
      <StyledExercisesList>
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
      </StyledExercisesList>
      {isEdition && (
        <>
          <Flex>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Flex>
          <Button onClick={handleIsSearching}>Add</Button>
        </>
      )}

      {isSearching && (
        <>
          <SearchList
            allExercisesData={allExercisesData}
            selectedExercisesCopy={selectedExercisesCopy}
            updateSelectedExercisesCopy={updateSelectedExercisesCopy}
          />
        </>
      )}
    </>
  );
}

export default ExercisesList;

const StyledExercisesList = styled.ul`
  list-style-type: none;
`;

const Flex = styled.div`
  display: flex;
`;
