import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { styled } from "styled-components";
import Modal from "../components/Modal";
import MuscleGroupList from "../components/MuscleGroupList";
import ExercisesModalContent from "../components/ExercisesModalContent";
import ExercisesList from "../components/ExercisesList";
import {
  /*allExercisesData,*/
  allExercisesMock,
  bodyPartsMock,
} from "../data/data";
import Session from "../components/Session";
import {
  DEFAULT_EXERCISES_COUNT,
  DEFAULT_SET_COUNT,
  DEFAULT_1_REP_DURATION,
  DEFAULT_END_EXERCISE_REST_DURATION,
  URL_EXERCISES_API,
} from "../utils/constants";
import { exercisesOptions, fetchData } from "../api/fetchData";
import { isHold } from "../utils/helpers";

function SessionSelect() {
  const [open, setOpen] = useState(false);

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isSavedMuscleGroup, setIsSavedMuscleGroup] = useState(false);
  const [firstTimeSaved, setFirstTimeSaved] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [showSession, setShowSession] = useState(false);

  const [allExercises, setAllExercises] = useState(allExercisesMock); // mocked to save API request
  const [bodyParts, setBodyParts] = useState([]); // mocked to save API request

  let isEdition = open;

  const fetchAllExercises = async () => {
    console.log("fetchAllExercises");
    if (!allExercises) {
      const exercisesData = await fetchData(
        URL_EXERCISES_API + "/exercises?limit=9999",
        exercisesOptions,
      );
      setAllExercises(exercisesData);
      console.log(exercisesData);
    }
  };

  useEffect(() => {
    const fetchBodyParts = async () => {
      console.log("fetchAllBodyParts");
      /*
      const bodyPartsData = await fetchData(
        URL_EXERCISES_API + "/exercises/bodyPartList?limit=9999",
        exercisesOptions,
      );
      
      setBodyParts(["all", ...bodyPartsData]);
      */
    };
    fetchBodyParts();
  }, []);

  useEffect(() => {
    if (isSavedMuscleGroup) {
      // data will be fetched there if coming from external source
      console.log("effect setSelectedExercises");

      // if the selectedExercises list is empty, populate it with random exercises
      if (!selectedExercises.length > 0) {
        setSelectedExercises(
          getRandomExercisesByMuscleGroup(
            selectedMuscleGroup,
            allExercisesMock,
            muscleGroupToIds,
          ).map((exercise) => ({
            ...exercise,
            // Default sets
            sessionSets: Array(DEFAULT_SET_COUNT).fill(
              isHold(exercise.name)
                ? { reps: 60, weight: 0, restTime: 60 }
                : { reps: 8, weight: 0, restTime: 60 },
            ),
          })),
        );
      } else {
        // if the selectedExercises list is already populated, remove exercises that don't match the selected Muscle Group
        // the selectedExercises may end up empty (no error)
        setSelectedExercises((prevExercises) =>
          prevExercises.filter((exercise) =>
            selectedMuscleGroup.includes(exercise.bodyPart),
          ),
        );
      }
    }
  }, [isSavedMuscleGroup]);

  useEffect(() => {
    open
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    console.log("effect Estimated Duration");
    setEstimatedDuration(getEstimateDuration(selectedExercises));
  }, [selectedExercises]);

  const muscleGroupToIds = useMemo(() => {
    return convertToMuscleGroupToIds(allExercises);
  }, [allExercises]);

  const allMuscleGroup = Object.keys(muscleGroupToIds);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([
    getRandomInArray(allMuscleGroup),
  ]);
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
      // After that it remains always displayed, just refreshing the loaded data (Exercises and equipment)
      setFirstTimeSaved(true);
    }
    setIsSavedMuscleGroup(val);
  };

  const updateSelectedExercises = (updatedExercises) => {
    setSelectedExercises([...updatedExercises]);
    console.log("saved");
    setOpen(false);
  };

  const updateSelectedExercisesEditingSet = (
    exerciseIndex,
    setIndex,
    newReps,
    newWeight,
  ) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise, index) =>
        exerciseIndex === index
          ? {
              ...exercise,
              sessionSets: exercise.sessionSets.map((set, sIndex) =>
                setIndex === sIndex
                  ? { ...set, reps: newReps, weight: newWeight }
                  : set,
              ),
            }
          : exercise,
      ),
    );
  };

  const deleteSelectedExercisesEditingSet = (exerciseIndex, setIndex) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise, index) =>
        exerciseIndex === index
          ? {
              ...exercise,
              sessionSets: exercise.sessionSets.filter(
                (set, sIndex) => !(setIndex === sIndex),
              ),
            }
          : exercise,
      ),
    );
  };

  let necessaryEquipment = selectedExercises
    .flatMap((exercise) => exercise.equipment) // array with duplicates
    .filter((value, index, self) => {
      return self.indexOf(value) === index; // if the current value's first occurence is on this index, the value gets added to the array
    }); // array with unique values

  console.log("rendered");
  return (
    <>
      {!showSession && (
        <StyledSessionSelect>
          <Button onClick={() => fetchAllExercises()}>
            Fetch all exercises
          </Button>

          {/*Save button will load the exercises for selectedExercises list */}
          <MuscleGroupList
            allMuscleGroup={allMuscleGroup}
            selectedMuscleGroup={selectedMuscleGroup}
            handleChangeMuscleGroup={handleChangeMuscleGroup}
            isSavedMuscleGroup={isSavedMuscleGroup}
            handleSaveMuscleGroup={handleSaveMuscleGroup}
            bodyParts={bodyParts}
          />
          {(firstTimeSaved || isSavedMuscleGroup) && (
            <>
              {/*Add Recommended number of exercises : 1-5 */}

              <h2>Choose your Exercises</h2>
              <ExercisesList selectedExercises={selectedExercises} />
              <Button onClick={handleOpen}>Modify</Button>

              <h2>Necessary Equipment List</h2>

              {necessaryEquipment.map((equipment, index) => (
                <p key={index}>{equipment}</p>
              ))}

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
                    allExercises={allExercises}
                    selectedMuscleGroup={selectedMuscleGroup}
                    exerciseNameOnly={true}
                  />
                </Modal>
              )}
            </>
          )}
        </StyledSessionSelect>
      )}
      {showSession && (
        <Session
          selectedExercises={selectedExercises}
          updateSelectedExercisesEditingSet={updateSelectedExercisesEditingSet}
          deleteSelectedExercisesEditingSet={deleteSelectedExercisesEditingSet}
        />
      )}
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

  selectedExercises.forEach((exercise) => {
    let totalReps = 0;
    let totalRestTime = 0;
    for (const set of exercise.sessionSets) {
      totalReps += set.reps;
      totalRestTime += set.restTime;
    }

    //let totalSets = exercise.sessionSets.length;

    let totalExerciseTime =
      (isHold(exercise.name) ? totalReps : totalReps * DEFAULT_1_REP_DURATION) +
      totalRestTime;

    duration += totalExerciseTime + DEFAULT_END_EXERCISE_REST_DURATION;
  });
  return secondsToMinutes(duration);
}
// Associate muscleGroups to exercises
// Output format: { top: [1, 2, 3], core: [4, 5, 6], legs: [7, 8, 9] }
function convertToMuscleGroupToIds(allExercises) {
  let muscleGroupToIds = {};
  allExercises.forEach((item) => {
    if (!muscleGroupToIds.hasOwnProperty(item.bodyPart)) {
      // create a new key in the object
      muscleGroupToIds[item.bodyPart] = [item.id];
    } else {
      // push the exercises id value to the existing key
      muscleGroupToIds[item.bodyPart].push(item.id);
    }
  });

  return muscleGroupToIds;
}

// returns an array of random exercises based on the selected muscle groups
// while maintaining a proportional distribution of exercises from each muscle group
function getRandomExercisesByMuscleGroup(
  selectedMuscleGroup,
  allExercises,
  muscleGroupToIds,
) {
  const randomExercisesArray = [];

  const muscleGroupToIdsRemaining = { ...muscleGroupToIds };

  let totalAddedExercises = 0;
  // iterate until the desired number of exercises for the array is reached
  while (totalAddedExercises < DEFAULT_EXERCISES_COUNT) {
    selectedMuscleGroup.forEach((group) => {
      if (
        totalAddedExercises < DEFAULT_EXERCISES_COUNT &&
        muscleGroupToIdsRemaining[group].length > 0
      ) {
        // get a random exercise id from the remaining ids for this group
        const randomExerciseId = getRandomInArray(
          muscleGroupToIdsRemaining[group],
        );
        // find the exercise with the given id in the allExercises array
        const randomExercise = allExercises.find(
          (exercise) => exercise.id === randomExerciseId,
        );

        randomExercisesArray.push(randomExercise);

        // remove the selected exercise id from the remaining ids
        muscleGroupToIdsRemaining[group] = muscleGroupToIdsRemaining[
          group
        ].filter((id) => id !== randomExerciseId);
      }
      totalAddedExercises++;
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
