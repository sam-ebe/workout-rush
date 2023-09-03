import React, { useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";

function Session({ selectedExercises }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseSets, setExerciseSets] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [endedSession, setEndedSession] = useState(false);
  const [editedSets, setEditedSets] = useState({});
  // display in EndSession : your session infos that will be saved :
  /*
  squat
  set 1: 8 reps x 20 kg Edit (edit will activate inputs only fot the corresponding line, after click on Edit : Save and Cancel buttons are displayed)
  set 2: 8 reps x 20 kg Edit 
  set 3: 8 reps x 20 kg Edit Delete (delete only on the last set)

  bicep curl
  set 1: 8 reps x 20 kg Edit
  set 2: 8 reps x 20 kg Edit
  set 3: 8 reps x 20 kg Edit Delete (delete only on the last set)
  
  Save


  */

  const currentExercise = selectedExercises[currentExerciseIndex];

  const handleNext = (exercise) => {
    const newSet = {
      reps: exercise.reps,
      weight: exercise.weight,
    };

    // add the current set to exerciseSets
    const updatedExerciseSets = [...exerciseSets];
    if (!updatedExerciseSets[currentExerciseIndex]) {
      updatedExerciseSets[currentExerciseIndex] = {
        exercise_name: currentExercise.exercise_name,
        sessionSets: [],
      };
    }
    updatedExerciseSets[currentExerciseIndex].sessionSets.push(newSet);
    setExerciseSets(updatedExerciseSets);
    console.log(exerciseSets);

    if (currentSetIndex < currentExercise.sessionSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      if (currentExerciseIndex < selectedExercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0); // reset currentSetIndex when moving to the next exercise
      } else {
        // workout session completed
        setEndedSession(true);
        console.log("end");
      }
    }
  };

  const handleEditSessionSet = (exerciseIndex, setIndex) => {
    const updatedSets = [...exerciseSets];
    updatedSets[exerciseIndex].sessionSets[setIndex].editing = true;

    setExerciseSets(updatedSets);

    // reset edited value to original value
    const editedSetKey = `${exerciseIndex}-${setIndex}`;
    const newEditedSets = { ...editedSets };
    delete newEditedSets[editedSetKey];
    setEditedSets(newEditedSets);
  };

  const handleSaveSessionSet = (
    exerciseIndex,
    setIndex,
    newReps,
    newWeight,
  ) => {
    const updatedSets = [...exerciseSets];
    updatedSets[exerciseIndex].sessionSets[setIndex].reps = newReps;
    updatedSets[exerciseIndex].sessionSets[setIndex].weight = newWeight;
    updatedSets[exerciseIndex].sessionSets[setIndex].editing = false;

    setExerciseSets(updatedSets);

    // remove edited value for the saved set
    const newEditedSets = { ...editedSets };
    delete newEditedSets[exerciseIndex];
    setEditedSets(newEditedSets);
  };

  const handleCancelSessionSet = (exerciseIndex, setIndex) => {
    const updatedSets = [...exerciseSets];
    updatedSets[exerciseIndex].sessionSets[setIndex].editing = false;
    setExerciseSets(updatedSets);
  };

  const handleDeleteSessionSet = (exerciseIndex, setIndex) => {
    const updatedSets = [...exerciseSets];
    updatedSets[exerciseIndex].sessionSets.splice(setIndex, 1);

    if (updatedSets[exerciseIndex].sessionSets.length === 0) {
      updatedSets.splice(exerciseIndex, 1);
    }

    setExerciseSets(updatedSets);
  };

  const handleSessionChange = (exerciseIndex, setIndex, newReps, newWeight) => {
    const editedSetKey = `${exerciseIndex}-${setIndex}`;
    setEditedSets({
      ...editedSets,
      [editedSetKey]: {
        reps: newReps,
        weight: newWeight,
      },
    });
  };

  return (
    <>
      <h2>Workout Session</h2>
      {!endedSession ? (
        <>
          <button onClick={() => handleNext(currentExercise)}>
            {currentSetIndex < currentExercise.sessionSets.length - 1
              ? "Next Set"
              : "Next Exercise"}
          </button>

          <SessionHistory
            selectedExercises={selectedExercises}
            currentExerciseIndex={currentExerciseIndex}
            currentSetIndex={currentSetIndex}
          />
        </>
      ) : (
        <>
          <div>
            <h3>Session Ended</h3>
            <p>Congratulations on completing your workout session!</p>
            <p>Total Workout Time: 30min</p>
            {exerciseSets.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex}>
                <h3>{exercise.exercise_name}</h3>
                {exercise.sessionSets.map((sessionSet, sessionSetIndex) => (
                  <div key={sessionSetIndex}>
                    {sessionSet.editing ? (
                      <>
                        <input
                          type="number"
                          value={
                            editedSets[`${exerciseIndex}-${sessionSetIndex}`]
                              ?.reps ?? sessionSet.reps
                          }
                          onChange={(e) =>
                            handleSessionChange(
                              exerciseIndex,
                              sessionSetIndex,
                              e.target.value,
                              editedSets[`${exerciseIndex}-${sessionSetIndex}`]
                                ?.weight ?? sessionSet.weight,
                            )
                          }
                        />
                        <input
                          type="number"
                          value={
                            editedSets[`${exerciseIndex}-${sessionSetIndex}`]
                              ?.weight ?? sessionSet.weight
                          }
                          onChange={(e) =>
                            handleSessionChange(
                              exerciseIndex,
                              sessionSetIndex,
                              editedSets[`${exerciseIndex}-${sessionSetIndex}`]
                                ?.reps ?? sessionSet.reps,
                              e.target.value,
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            handleSaveSessionSet(
                              exerciseIndex,
                              sessionSetIndex,
                              sessionSet.reps,
                              sessionSet.weight,
                            )
                          }
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            handleCancelSessionSet(
                              exerciseIndex,
                              sessionSetIndex,
                            )
                          }
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <p>
                        set {sessionSetIndex + 1}: {sessionSet.reps} reps x{" "}
                        {sessionSet.weight} kg{" "}
                        <Button
                          onClick={() =>
                            handleEditSessionSet(exerciseIndex, sessionSetIndex)
                          }
                        >
                          Edit
                        </Button>{" "}
                        {sessionSetIndex ===
                          exercise.sessionSets.length - 1 && (
                          <Button
                            onClick={() =>
                              handleDeleteSessionSet(
                                exerciseIndex,
                                sessionSetIndex,
                              )
                            }
                          >
                            Delete
                          </Button>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            onClick={() =>
              alert("Yep, let's go somewhere. An imaginary Home page?")
            }
          >
            Back to Home
          </Button>
        </>
      )}
    </>
  );
}

function SessionHistory({
  selectedExercises,
  currentExerciseIndex,
  currentSetIndex,
}) {
  return (
    <ul>
      {selectedExercises.map((exercise, exerciseIndex) => (
        <li key={`${exerciseIndex}-${exercise.exercise_name}`}>
          <h3>Exercise: {exercise.exercise_name}</h3>
          <ul>
            {exercise.sessionSets.map((set, setIndex) => (
              <StyledLi
                key={`${exerciseIndex}-${setIndex}`}
                $inactive={
                  (exerciseIndex === currentExerciseIndex &&
                    setIndex > currentSetIndex) ||
                  exerciseIndex > currentExerciseIndex
                }
                $current={
                  exerciseIndex === currentExerciseIndex &&
                  setIndex === currentSetIndex
                }
              >
                Set {setIndex + 1}: {set.reps}
                {exercise.isHold ? " sec" : " reps"} x {set.weight} kg
              </StyledLi>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Session;

const StyledLi = styled.li`
  opacity: ${(props) => (props.$inactive ? 0.3 : 1)};
  font-size: ${(props) => (props.$current ? "2rem" : "1rem")};
`;
