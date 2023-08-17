import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
import Modal from "./Modal";
import MuscleGroupList from "./MuscleGroupList";
import ExercisesModalContent from "./ExercisesModalContent";
import ExercisesList from "./ExercisesList";
import { exercisesData } from "../data/data";

function SessionSelect() {
  const muscleGroupToIds = useMemo(() => {
    return convertToMuscleGroupToIds(exercisesData);
  }, [exercisesData]);

  const allMuscleGroup = Object.keys(muscleGroupToIds);

  const [open, setOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([
    getRandomInArray(allMuscleGroup),
  ]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isSavedMuscleGroup, setIsSavedMuscleGroup] = useState(false);
  const [firstTimeSaved, setFirstTimeSaved] = useState(false);

  useEffect(() => {
    if (isSavedMuscleGroup) {
      // data will be fetched there if coming from external source
      console.log("effect setSelectedExercises");
      const numberOfExercices = 3;

      setSelectedExercises(
        getRandomExercisesByMuscleGroup(
          selectedMuscleGroup,
          exercisesData,
          muscleGroupToIds,
          numberOfExercices,
        ),
      );
    }
  }, [isSavedMuscleGroup]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMuscleGroup = (muscleGroup) => {
    setSelectedMuscleGroup(
      selectedMuscleGroup.includes(muscleGroup)
        ? selectedMuscleGroup.filter((item) => item !== muscleGroup)
        : [...selectedMuscleGroup, muscleGroup],
    );
  };

  const handleSaveMuscleGroup = (val) => {
    if (!isSavedMuscleGroup) {
      // the "rest" of StyledSessionSelect is hidden only the first time isSavedMuscleGroup turns from false to true.
      // After that it remains always displayed, just refreshing the loaded data (Exercises and eauipment)
      setFirstTimeSaved(true);
    }
    setIsSavedMuscleGroup(val);
  };

  return (
    <>
      <StyledSessionSelect>
        {/*after Save button will reload exercises from exercise list */}
        <MuscleGroupList
          allMuscleGroup={allMuscleGroup}
          selectedMuscleGroup={selectedMuscleGroup}
          handleChangeMuscleGroup={handleChangeMuscleGroup}
          isSavedMuscleGroup={isSavedMuscleGroup}
          handleSaveMuscleGroup={handleSaveMuscleGroup}
        />
        {(firstTimeSaved || isSavedMuscleGroup) && (
          <>
            {/* Changes only the number of reps/series (if displayed in the exercises list. For example : no numbers for AMRAP) and session duration */}
            <h2>Session Type</h2>
            <Selector>
              <Button>{"<"}</Button>
              <p>AMRAP</p>
              <Button>{">"}</Button>
            </Selector>

            {/*Opens a modal*/}
            {/*search by categories*/}
            {/*Inputs for number of reps, default 10*/}
            {/*Add Recommended number of exercises : 1-5 */}

            <h2>Choose your Exercises</h2>
            <Selector>
              <ExercisesList selectedExercises={selectedExercises} />
              <Button onClick={handleOpen}>Modify</Button>
            </Selector>
            {/* depends on selected exercises, comes from loaded exercises data*/}
            <h2>Necessary Equipment List (based on the exercises list)</h2>
            <Selector>
              <p>None (just bodyweight)</p>
            </Selector>
            {/* 5 per five, min 5 min*/}
            <h2>Duration</h2>
            <Selector>
              <Button>-</Button>
              <p>20 min</p>
              <Button>+</Button>
            </Selector>
            <Button>GO ! </Button>
            {open && (
              <Modal>
                <ExercisesModalContent
                  handleClose={handleClose}
                  selectedExercises={selectedExercises}
                />
              </Modal>
            )}
          </>
        )}
      </StyledSessionSelect>
    </>
  );
}

export default SessionSelect;

function getRandomInArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Output format: { top: [1, 2, 3], core: [4, 5, 6], legs: [7, 8, 9] }
function convertToMuscleGroupToIds(allMuscleGroup) {
  console.log("converting");
  let muscleGroupToIds = {};
  allMuscleGroup.forEach((item) => {
    if (!muscleGroupToIds.hasOwnProperty(item.muscle_group)) {
      // create a new key in the object
      muscleGroupToIds[item.muscle_group] = [item.id];
    } else {
      // push the exercises id value to the existing key
      muscleGroupToIds[item.muscle_group].push(item.id);
    }
  });

  return muscleGroupToIds;
}

// returns an array of random exercises based on the selected muscle groups
// while maintaining a proportional distribution of exercises from each muscle group
function getRandomExercisesByMuscleGroup(
  selectedMuscleGroup,
  exercisesData,
  muscleGroupToIds,
  numberOfExercises = 1,
) {
  const randomExercisesArray = [];

  // calculate proportional distribution of exercises per group
  const exercisesPerGroup = Math.floor(
    numberOfExercises / selectedMuscleGroup.length,
  );

  const muscleGroupToIdsRemaining = { ...muscleGroupToIds };

  let totalAddedExercises = 0;
  while (totalAddedExercises < numberOfExercises) {
    selectedMuscleGroup.forEach((group) => {
      // iterate until the desired number of exercises for this group is reached
      for (let i = 0; i < exercisesPerGroup; i++) {
        if (
          totalAddedExercises < numberOfExercises &&
          muscleGroupToIdsRemaining[group].length > 0
        ) {
          // get a random exercise id from the remaining ids for this group
          const randomExerciseId = getRandomInArray(
            muscleGroupToIdsRemaining[group],
          );
          // find the exercise with the given id in the exercisesData array
          const randomExercise = exercisesData.find(
            (exercise) => exercise.id === randomExerciseId,
          );

          randomExercisesArray.push(randomExercise);

          // remove the selected exercise id from the remaining ids
          muscleGroupToIdsRemaining[group] = muscleGroupToIdsRemaining[
            group
          ].filter((id) => id !== randomExerciseId);
          totalAddedExercises++;
        }
      }
    });
  }
  console.log(randomExercisesArray);
  return randomExercisesArray;
}

const StyledSessionSelect = styled.div`
  position: relative;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;
