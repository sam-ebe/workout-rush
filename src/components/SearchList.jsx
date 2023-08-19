import React from "react";
import { styled } from "styled-components";
import { Button } from "./Button";
function SearchList({
  allExercisesData,
  selectedExercisesCopy,
  updateSelectedExercisesCopy,
}) {
  // passing selectedExercisesCopy because the user may have deleted some exercises without saving
  // sort by name
  // by muscle group
  // filter by input
  // by muscle group
  // by main muscle
  // by equipment

  // display filters on top
  // mosaic allExercisesData with buttons Details and Add
  // the selected have no Add button

  return (
    <>
      <StyledSearchList>
        {allExercisesData.map((exercise) => {
          return (
            <StyledLi key={exercise.id}>
              {exercise.exercise_name}
              <Button>Details</Button>
              {selectedExercisesCopy.some((sel) => sel.id === exercise.id) ? (
                <p>Selected</p>
              ) : (
                <Button
                  onClick={() => updateSelectedExercisesCopy(exercise.id)}
                >
                  Add
                </Button>
              )}
            </StyledLi>
          );
        })}
      </StyledSearchList>
    </>
  );
}

export default SearchList;

const StyledSearchList = styled.ul`
  list-style-type: none;
  overflow-y: auto;
  width: 100%;
  background: lightgray;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  & p {
    color: green;
  }
`;
