import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button } from "./Button";
function SearchList({
  allExercises,
  selectedExercisesCopy,
  updateSelectedExercisesCopy,
  selectedMuscleGroup,
}) {
  // passing selectedExercisesCopy because the user may have deleted some exercises without saving

  // copy allExercises to perform sortings
  // keep only exercises corresponding to selected Muscles Group
  const [allExercisesCopy, setAllExercisesCopy] = useState([]);
  useEffect(() => {
    setAllExercisesCopy(
      sortByMuscleGroupAndName(
        filterSelectedMusclesGroupOnly([...allExercises]),
      ),
    );
  }, [allExercises]);

  const filterSelectedMusclesGroupOnly = (exercisesArray) => {
    console.log("filter");
    return exercisesArray.filter((exercise) =>
      selectedMuscleGroup.includes(exercise.bodyPart),
    );
  };

  const sortByMuscleGroupAndName = (array) => {
    return array.sort(compareMuscleGroupAndName);
  };

  const compareMuscleGroupAndName = (a, b) => {
    if (a.bodyPart === b.bodyPart) {
      return compareExerciseName(a, b);
    }
    return a.bodyPart > b.bodyPart ? 1 : -1;
  };

  const compareExerciseName = (a, b) => (a.name > b.name ? 1 : -1);

  // by main muscle
  // by equipment

  // display filters on top
  // mosaic allExercises with buttons Details and Add
  return (
    <StyledSearchList>
      <Filters>
        <p>{`Selected Muscles Groups: ${selectedMuscleGroup.join(" - ")}`}</p>
      </Filters>
      <StyledUl>
        {allExercisesCopy.map((exercise, index, self) => {
          return (
            <StyledLiWrapper key={`filtered-list-${exercise.id}`}>
              {(index === 0 ||
                exercise.bodyPart !==
                  self[self.findIndex((ex) => ex.id === exercise.id) - 1]
                    .bodyPart) && <p>{exercise.bodyPart}</p>}
              <StyledLi>
                {exercise.name}
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
