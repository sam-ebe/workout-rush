import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
import Modal from "./Modal";
import MuscleGroupList from "./MuscleGroupList";
import ExercisesModalContent from "./ExercisesModalContent";
import ExercisesList from "./ExercisesList";
import { allExercisesData } from "../data/data";
import Session from "./Session";

function SessionSelect() {
  const muscleGroupToIds = useMemo(() => {
    return convertToMuscleGroupToIds(allExercisesData);
  }, [allExercisesData]);

  const allMuscleGroup = Object.keys(muscleGroupToIds);

  const [open, setOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([
    getRandomInArray(allMuscleGroup),
  ]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isSavedMuscleGroup, setIsSavedMuscleGroup] = useState(false);
  const [firstTimeSaved, setFirstTimeSaved] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [showSession, setShowSession] = useState(false);

  let isEdition = open;

  useEffect(() => {
    if (isSavedMuscleGroup) {
      // data will be fetched there if coming from external source
      console.log("effect setSelectedExercises");
      const numberOfExercices = 3;
      // if the selectedExercises list is empty, populate it with random exercises
      if (!selectedExercises.length > 0) {
        setSelectedExercises(
          getRandomExercisesByMuscleGroup(
            selectedMuscleGroup,
            allExercisesData,
            muscleGroupToIds,
            numberOfExercices,
          ).map((exercise) => ({
            ...exercise,
            sets: 3, // Default sets
            reps: exercise.isHold ? 60 : 8, // Default reps or holdTime
            weight: 0, // Default weight
            restTime: 60, // Default rest time in minutes
          })),
        );
      } else {
        // if the selectedExercises list is already populated, remove exercises that don't match the selected Muscle Group
        // the selectedExercises may end up empty (no error)
        setSelectedExercises((prevExercises) =>
          prevExercises.filter((exercise) =>
            selectedMuscleGroup.includes(exercise.muscle_group),
          ),
        );
      }
    }
  }, [isSavedMuscleGroup]);

  useEffect(() => {
    console.log("effect Estimated Duration");
    setEstimatedDuration(getEstimateDuration(selectedExercises));
  }, [selectedExercises]);

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

  const updateSelectedExercises = (updatedExercises) => {
    setSelectedExercises([...updatedExercises]);
    console.log("saved");
    setOpen(false);
  };

  let necessaryEquipment = selectedExercises
    .flatMap((exercise) => exercise.necessary_equipment) // array with duplicates
    .filter((value, index, self) => {
      return self.indexOf(value) === index; // if the current value's first occurence is on this index, the value gets added to the array
    }); // array with unique values

  console.log("rendered");
  return (
    <>
      {!showSession && (
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
              <ExercisesList selectedExercises={selectedExercises} />
              <Button onClick={handleOpen}>Modify</Button>

              <h2>Necessary Equipment List</h2>

              {necessaryEquipment.length > 0 ? (
                necessaryEquipment.map((equipment) => {
                  return <p key={equipment}>{equipment}</p>;
                })
              ) : (
                <p>none</p>
              )}

              {/* 5 per five, min 5 min*/}
              <h2>Estimated Duration</h2>

              <p>{estimatedDuration}</p>

              <Button onClick={() => setShowSession(true)}>GO ! </Button>
              {open && (
                <Modal>
                  <ExercisesModalContent
                    handleClose={handleClose}
                    selectedExercises={selectedExercises}
                    isEdition={isEdition}
                    updateSelectedExercises={updateSelectedExercises}
                    allExercisesData={allExercisesData}
                    selectedMuscleGroup={selectedMuscleGroup}
                    exerciseNameOnly={true}
                  />
                </Modal>
              )}
            </>
          )}
        </StyledSessionSelect>
      )}
      {showSession && <Session selectedExercises={selectedExercises} />}
    </>
  );
}

export default SessionSelect;

function getRandomInArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function secondsToMinutes(seconds) {
  let totalMinutes = Math.ceil(seconds / 60);
  return totalMinutes;
}
function getEstimateDuration(selectedExercises) {
  let duration = 0;
  let endExerciseRestTime = 120;
  selectedExercises.forEach((exercise) => {
    let repTimePerSet = exercise.isHold ? 1 : exercise.reps * 6;
    let totalExerciseTime = exercise.sets * (repTimePerSet + exercise.restTime);

    duration += totalExerciseTime + endExerciseRestTime;
  });
  return secondsToMinutes(duration);
}
// Output format: { top: [1, 2, 3], core: [4, 5, 6], legs: [7, 8, 9] }
function convertToMuscleGroupToIds(allMuscleGroup) {
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
  allExercisesData,
  muscleGroupToIds,
  numberOfExercises = 1,
) {
  const randomExercisesArray = [];

  const muscleGroupToIdsRemaining = { ...muscleGroupToIds };

  let totalAddedExercises = 0;
  // iterate until the desired number of exercises for the array is reached
  while (totalAddedExercises < numberOfExercises) {
    selectedMuscleGroup.forEach((group) => {
      if (
        totalAddedExercises < numberOfExercises &&
        muscleGroupToIdsRemaining[group].length > 0
      ) {
        // get a random exercise id from the remaining ids for this group
        const randomExerciseId = getRandomInArray(
          muscleGroupToIdsRemaining[group],
        );
        // find the exercise with the given id in the allExercisesData array
        const randomExercise = allExercisesData.find(
          (exercise) => exercise.id === randomExerciseId,
        );

        randomExercisesArray.push(randomExercise);

        // remove the selected exercise id from the remaining ids
        muscleGroupToIdsRemaining[group] = muscleGroupToIdsRemaining[
          group
        ].filter((id) => id !== randomExerciseId);
        totalAddedExercises++;
      }
    });
  }
  return randomExercisesArray;
}

const StyledSessionSelect = styled.div`
  position: relative;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;
