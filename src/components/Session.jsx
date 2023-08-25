import React, { useState } from "react";
import { Button } from "./Button";

function Session({ selectedExercises }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [endedSession, setEndedSession] = useState(false);

  const handleNext = () => {
    if (currentSet < selectedExercises[currentExerciseIndex].sets) {
      setCurrentSet(currentSet + 1);
    } else {
      if (currentExerciseIndex < selectedExercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1); // reset currentSet when moving to the next exercise
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
      {!endedSession ? (
        <>
          <ExerciseCard
            exercise={selectedExercises[currentExerciseIndex]}
            currentSet={currentSet}
          />
          <button onClick={handleNext}>
            {currentSet < selectedExercises[currentExerciseIndex].sets
              ? "Next Set"
              : "Next Exercise"}
          </button>
        </>
      ) : (
        <>
          <EndSession />
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

function EndSession() {
  return (
    <div>
      <h3>Session Ended</h3>
      <p>Congratulations on completing your workout session!</p>
      <p>Total Time Spent: 30min</p>
    </div>
  );
}

function ExerciseCard({ exercise, currentSet }) {
  return (
    <div>
      <h3>Current Exercise: {exercise.exercise_name}</h3>
      <p>Muscle Group: {exercise.muscle_group}</p>
      <p>Set: {currentSet}</p>
      <p>{`${exercise.isHold ? "Hold" : "Reps"}: ${exercise.reps}`}</p>
    </div>
  );
}

export default Session;
