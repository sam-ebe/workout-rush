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
  selectedMuscleGroup,
}) {
  const [selectedExercisesCopy, setSelectedExercisesCopy] = useState([]);

  useEffect(() => {
    console.log("effect ExercisesList");
    setSelectedExercisesCopy([...selectedExercises]);
  }, [selectedExercises]);

  const handleDelete = (id) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id),
    );
  };

  const handleDetails = () => {};
  const handleReset = () => {
    setSelectedExercisesCopy([...selectedExercises]);
  };
  const handleSave = () => {
    updateSelectedExercises(selectedExercisesCopy);
  };
  const updateSelectedExercisesCopy = (id) => {
    console.log("update updateSelectedExercisesCopy");
    setSelectedExercisesCopy([
      ...selectedExercisesCopy,
      ...allExercisesData
        .filter((exercise) => exercise.id === id)
        .map((exercise) => ({
          ...exercise,
          sets: 3, // Default sets
          reps: exercise.isHold ? 60 : 8, // Default reps or holdTime
          weight: 0, // Default weight
          restTime: 60, // Default rest time in minutes
        })),
    ]);
  };
  const handleInputChange = (id, property, value) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? { ...exercise, [property]: parseInt(value) }
          : exercise,
      ),
    );
  };
  return (
    <>
      <StyledExercisesList>
        {selectedExercisesCopy.map((exercise) => {
          return (
            <li key={exercise.id}>
              <div>
                <RepsFields isEdition={false} exercise={exercise} />
                {isEdition && (
                  <RepsFields
                    isEdition={isEdition}
                    handleInputChange={handleInputChange}
                    exercise={exercise}
                  />
                )}
              </div>
              {isEdition && (
                <>
                  <Button onClick={handleDetails}>Details</Button>
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
            selectedMuscleGroup={selectedMuscleGroup}
          />
        </>
      )}
    </>
  );
}

export default ExercisesList;

function RepsFields({ isEdition, handleInputChange, exercise }) {
  const inputFields = [
    { id: "sets", label: "sets", step: 1 },
    {
      id: "reps",
      label: exercise.isHold ? "sec" : "reps",
      step: exercise.isHold ? 10 : 1,
    },
    { id: "weight", label: "kg", step: 1 },
    { id: "restTime", label: "sec", step: 10 },
  ];

  return (
    <StyledRepsInputs>
      {inputFields.map((field, index) => (
        <React.Fragment key={field.id}>
          {isEdition ? (
            <StyledRepsInput>
              <input
                type="number"
                id={`${exercise.exercise_name}-${field.id}`}
                value={exercise[field.id]}
                step={field.step}
                onChange={(e) =>
                  handleInputChange(exercise.id, field.id, e.target.value)
                }
              />
              <label htmlFor={`${exercise.exercise_name}-${field.id}`}>
                {field.label}
              </label>
            </StyledRepsInput>
          ) : (
            <>
              {!(field.id === "weight" && !exercise.weight > 0) &&
                !(field.id === "restTime") && (
                  <>
                    {index !== 0 && <span>&nbsp;x&nbsp;</span>}
                    <p>{`${exercise[field.id]}${field.label} `}</p>
                  </>
                )}
              {index === inputFields.length - 1 && (
                <p className="exercise-name">
                  &nbsp;{`${exercise.exercise_name}`}
                </p>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </StyledRepsInputs>
  );
}

const StyledExercisesList = styled.ul`
  list-style-type: none;
  & li {
    display: flex;
    margin: 8px;
  }
  .exercise-name {
    color: blue;
  }
`;

const Flex = styled.div`
  display: flex;
`;

const StyledRepsInputs = styled.div`
  display: flex;
  align-items: center;
  & input {
    max-width: 50px;
  }
`;

const StyledRepsInput = styled.div`
  display: flex;
  flex-direction: column;
`;
