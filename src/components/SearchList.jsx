import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "./Button";
function SearchList({
  allExercisesData,
  selectedExercisesCopy,
  updateSelectedExercisesCopy,
  selectedMuscleGroup,
}) {
  // passing selectedExercisesCopy because the user may have deleted some exercises without saving

  // copy allExercisesData to perform sortings
  // keep only exercises corresponding to selected Muscles Group
  const [allExercisesDataCopy, setAllExercisesDataCopy] = useState([]);
  useEffect(() => {
    setAllExercisesDataCopy(
      sortByMuscleGroupAndName(
        filterSelectedMusclesGroupOnly([...allExercisesData]),
      ),
    );
  }, [allExercisesData]);

  const filterSelectedMusclesGroupOnly = (exercisesArray) => {
    return exercisesArray.filter((exercise) =>
      selectedMuscleGroup.includes(exercise.muscle_group),
    );
  };

  const sortByMuscleGroupAndName = (array) => {
    return array.sort(compareMuscleGroupAndName);
  };

  const compareMuscleGroupAndName = (a, b) => {
    if (a.muscle_group === b.muscle_group) {
      return compareExerciseName(a, b);
    }
    return a.muscle_group > b.muscle_group ? 1 : -1;
  };

  const compareExerciseName = (a, b) =>
    a.exercise_name > b.exercise_name ? 1 : -1;

  // by main muscle
  // by equipment

  // display filters on top
  // mosaic allExercisesData with buttons Details and Add
  // the selected have no Add button

  const handleChange = (e) => {};
  return (
    <StyledSearchList>
      <Filters>
        <p>{`Selected Muscles Groups: ${selectedMuscleGroup.join(" - ")}`}</p>
      </Filters>
      <StyledUl>
        {allExercisesDataCopy.map((exercise, index, self) => {
          return (
            <StyledLiWrapper key={`filtered-list-${exercise.id}`}>
              {(index === 0 ||
                exercise.muscle_group !==
                  self[self.findIndex((ex) => ex.id === exercise.id) - 1]
                    .muscle_group) && <p>{exercise.muscle_group}</p>}
              <StyledLi>
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
            </StyledLiWrapper>
          );
        })}
      </StyledUl>
    </StyledSearchList>
  );
}

export default SearchList;

const StyledSearchList = styled.div`
  background: lightgray;
  width: 100%;
  overflow-y: auto;
`;

const Filters = styled.div`
  /*display: flex;*/
  background: silver;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.div`
  display: flex;
  align-items: center;
  & p {
    color: green;
  }
`;

const StyledLiWrapper = styled.li`
  & > p {
    background: gray;
  }
`;
