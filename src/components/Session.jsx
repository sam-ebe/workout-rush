import React, { useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
import spinner from "./../assets/spinner.svg";
import SessionTimer from "./SessionTimer";
import { isHold } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

function Session({
  selectedExercises,
  updateSelectedExercisesEditingSet,
  deleteSelectedExercisesEditingSet,
}) {
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [endedSession, setEndedSession] = useState(false);
  const currentExercise = selectedExercises[currentExerciseIndex];

  const handleNext = () => {
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

  return (
    <>
      <h2>Workout Session</h2>
      <SessionTimer endedSession={endedSession} />
      {!endedSession && (
        <Button onClick={() => handleNext()}>
          {currentSetIndex < currentExercise.sessionSets.length - 1
            ? "Next Set"
            : "Next Exercise"}
        </Button>
      )}
      <SessionHistory
        selectedExercises={selectedExercises}
        currentExerciseIndex={currentExerciseIndex}
        currentSetIndex={currentSetIndex}
        updateSelectedExercisesEditingSet={updateSelectedExercisesEditingSet}
        deleteSelectedExercisesEditingSet={deleteSelectedExercisesEditingSet}
        endedSession={endedSession}
      />
      {endedSession && (
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      )}
    </>
  );
}

function SessionHistory({
  selectedExercises,
  currentExerciseIndex,
  currentSetIndex,
  updateSelectedExercisesEditingSet,
  deleteSelectedExercisesEditingSet,
  endedSession,
}) {
  // array of [exercise id, set id] that are currently in editing state, but unsaved
  const [editingSets, setEditingSets] = useState([]);

  const handleEditSessionSet = (exerciseIndex, setIndex) => {
    // get reps and weight from selectedExercises
    const { reps, weight } =
      selectedExercises[exerciseIndex].sessionSets[setIndex];

    const newEditingSet = {
      exerciseId: exerciseIndex,
      setId: setIndex,
      reps: reps,
      weight: weight,
    };

    setEditingSets((prevSets) => [...prevSets, newEditingSet]);
  };

  const handleCancelSessionSet = (exerciseIndex, setIndex) => {
    setEditingSets((prevSets) =>
      prevSets.filter(
        (set) => !(set.exerciseId === exerciseIndex && set.setId === setIndex),
      ),
    );
  };

  const handleSessionChange = (exerciseIndex, setIndex, newReps, newWeight) => {
    setEditingSets((prevSets) =>
      prevSets.map((set) =>
        set.exerciseId === exerciseIndex && set.setId === setIndex
          ? { ...set, reps: newReps, weight: newWeight }
          : set,
      ),
    );
  };

  const handleDeleteSessionSet = (exerciseIndex, setIndex) => {
    setEditingSets((prevSets) =>
      prevSets.filter(
        (set) => !(set.exerciseId === exerciseIndex && set.setId === setIndex),
      ),
    );
    deleteSelectedExercisesEditingSet(exerciseIndex, setIndex);
  };

  const handleSaveSessionSet = (exerciseIndex, setIndex) => {
    const newReps =
      editingSets[editingSetsFindIndex(exerciseIndex, setIndex)].reps;
    const newWeight =
      editingSets[editingSetsFindIndex(exerciseIndex, setIndex)].weight;
    updateSelectedExercisesEditingSet(
      exerciseIndex,
      setIndex,
      newReps,
      newWeight,
    );
    handleCancelSessionSet(exerciseIndex, setIndex);
  };
  // display editable input if the Edit button has been clicked for this set
  const editingSetsFindIndex = (exerciseIndex, setIndex) => {
    return editingSets.findIndex(
      (set) => set.exerciseId === exerciseIndex && set.setId === setIndex,
    );
  };

  return (
    <ul>
      {selectedExercises.map((exercise, exerciseIndex) => (
        <li key={`${exerciseIndex}-${exercise.name}`}>
          <h3>Exercise: {exercise.name}</h3>
          <ul>
            {exercise.sessionSets.map((set, setIndex) => {
              const current =
                exerciseIndex === currentExerciseIndex &&
                setIndex === currentSetIndex;
              const inactive =
                (exerciseIndex === currentExerciseIndex &&
                  setIndex > currentSetIndex) ||
                exerciseIndex > currentExerciseIndex;
              return (
                <StyledLi
                  key={`${exerciseIndex}-${setIndex}`}
                  $inactive={inactive}
                  $current={current}
                  $endedSession={endedSession}
                >
                  {editingSetsFindIndex(exerciseIndex, setIndex) !== -1 ? (
                    <>
                      <span>Set {setIndex + 1}: </span>

                      <input
                        type="number"
                        value={
                          editingSets[
                            editingSetsFindIndex(exerciseIndex, setIndex)
                          ].reps
                        }
                        onChange={(e) =>
                          handleSessionChange(
                            exerciseIndex,
                            setIndex,
                            e.target.value,
                            editingSets[
                              editingSetsFindIndex(exerciseIndex, setIndex)
                            ].weight,
                          )
                        }
                      />
                      <input
                        type="number"
                        value={
                          editingSets[
                            editingSetsFindIndex(exerciseIndex, setIndex)
                          ].weight
                        }
                        onChange={(e) =>
                          handleSessionChange(
                            exerciseIndex,
                            setIndex,
                            editingSets[
                              editingSetsFindIndex(exerciseIndex, setIndex)
                            ].reps,
                            e.target.value,
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          handleSaveSessionSet(exerciseIndex, setIndex)
                        }
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          handleCancelSessionSet(exerciseIndex, setIndex)
                        }
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {set.reps}
                      {isHold(exercise.name) ? " sec" : " reps"} x {set.weight}{" "}
                      kg
                      {current && !endedSession && (
                        <SpinnerImg src={spinner} alt="In progress..." />
                      )}
                      {!inactive && (
                        <>
                          <Button
                            onClick={() =>
                              handleEditSessionSet(exerciseIndex, setIndex)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeleteSessionSet(exerciseIndex, setIndex)
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </StyledLi>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Session;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.$inactive ? 0.3 : 1)};
  font-size: ${(props) =>
    props.$current && !props.$endedSession ? "2rem" : "1rem"};
  transition: all 0.2s ease-out;
`;
const SpinnerImg = styled.img`
  height: 2rem;
  margin: 0 8px;
`;
