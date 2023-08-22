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
    setSelectedExercisesCopy([
      ...selectedExercisesCopy,
      ...allExercisesData.filter((exercise) => exercise.id === id),
    ]);
  };
  const handleInputChange = (id, property, value) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [property]: value } : exercise,
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
                <p>{exercise.exercise_name}</p>
                {isEdition && (
                  <RepsInputs
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

function RepsInputs({ handleInputChange, exercise }) {
  const inputFields = [
    { id: "sets", label: "sets", step: 1 },
    { id: "reps", label: "reps" },
    { id: "weight", label: "kg", step: 1 },
    { id: "restTime", label: "sec", step: 10 },
  ];

  return (
    <StyledRepsInputs>
      {inputFields.map((field) => (
        <React.Fragment key={field.id}>
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
`;

const Flex = styled.div`
  display: flex;
`;

const StyledRepsInputs = styled.div`
  display: flex;
  align-items: center;
  & input {
    max-width: 40px;
  }
`;

const StyledRepsInput = styled.div`
  display: flex;
  flex-direction: column;
`;
