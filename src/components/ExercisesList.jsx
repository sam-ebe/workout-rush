import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import SearchList from "./SearchList";
import { styled } from "styled-components";
import { DEFAULT_SET_COUNT } from "../utils/constants";
import { clampValue } from "../utils/helpers";

function ExercisesList({
  selectedExercises,
  isEdition = false,
  updateSelectedExercises,
  allExercisesData,
  isSearching = false,
  handleIsSearching,
  selectedMuscleGroup,
  exerciseNameOnly,
}) {
  const [selectedExercisesCopy, setSelectedExercisesCopy] = useState([]);
  const [openIndividualSets, setOpenIndividualSets] = useState(false);

  useEffect(() => {
    console.log("effect ExercisesList");
    setSelectedExercisesCopy([...selectedExercises]);
  }, [selectedExercises]);

  const handleDelete = (id) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id),
    );
  };

  const handleOpenIndividualSets = (exerciseId) => {
    setOpenIndividualSets((i) => !i);
  };
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
          // Default sets
          sessionSets: Array(DEFAULT_SET_COUNT).fill(
            exercise.isHold
              ? { reps: 60, weight: 0, restTime: 60 }
              : { reps: 8, weight: 0, restTime: 60 },
          ),
        })),
    ]);
  };

  // global input changes
  const handleInputChange = (id, property, value) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? property === "sets"
            ? exercise.sessionSets.length < value
              ? addSetToExercise(exercise) // add a set
              : removeLastSetFromExercise(exercise) // remove a set
            : updatePropertyInAllSets(exercise, property, value) // update property in all sets
          : exercise,
      ),
    );

    // add a new set to an exercise
    const addSetToExercise = (exercise) => {
      const newSet = exercise.isHold
        ? { reps: 60, weight: 0, restTime: 60 }
        : { reps: 8, weight: 0, restTime: 60 };

      return {
        ...exercise,
        sessionSets: [...exercise.sessionSets, newSet],
      };
    };

    // remove the last set from an exercise
    const removeLastSetFromExercise = (exercise) => {
      return {
        ...exercise,
        sessionSets: exercise.sessionSets.slice(0, -1),
      };
    };

    // update a specific property in all sets of an exercise
    const updatePropertyInAllSets = (exercise, property, value) => {
      return {
        ...exercise,
        sessionSets: exercise.sessionSets.map((set) => ({
          ...set,
          [property]: clampValue(parseInt(value), 0),
        })),
      };
    };
  };

  return (
    <>
      <StyledExercisesList>
        {selectedExercisesCopy.map((exercise) => {
          return (
            <li key={exercise.id}>
              <div>
                <RepsFields
                  isEdition={false}
                  exercise={exercise}
                  exerciseNameOnly={exerciseNameOnly}
                />
                {isEdition && (
                  <RepsFields
                    isEdition={isEdition}
                    handleInputChange={handleInputChange}
                    exercise={exercise}
                  />
                )}
                {isEdition && openIndividualSets && <p>individual sets</p>}
              </div>
              {isEdition && (
                <>
                  <Button onClick={() => handleOpenIndividualSets(exercise.id)}>
                    Open Individual Sets
                  </Button>
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

function RepsFields({
  isEdition,
  handleInputChange,
  exercise,
  exerciseNameOnly = false,
}) {
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

  const getFieldValues = (fieldId) =>
    exercise.sessionSets.map((set) => set[fieldId]);

  return (
    <StyledRepsInputs>
      {inputFields.map((field, index) => (
        <React.Fragment key={field.id}>
          {isEdition ? (
            <StyledRepsInput>
              <input
                type="number"
                id={`${exercise.exercise_name}-${field.id}`}
                value={
                  field.id === "sets"
                    ? exercise.sessionSets.length
                    : exercise.sessionSets[0][field.id]
                }
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
              {(field.id === "sets" ||
                field.id === "reps" ||
                (field.id === "weight" &&
                  exercise.sessionSets.some((set) => set.weight > 0))) &&
                !exerciseNameOnly && (
                  <>
                    {index !== 0 && <span>&nbsp;x&nbsp;</span>}
                    <span>
                      {
                        field.id === "sets"
                          ? `${exercise.sessionSets.length}` // display sets count
                          : !exercise.sessionSets.every(
                              (set, setIndex) =>
                                set[field.id] ===
                                exercise.sessionSets[0][field.id],
                            )
                          ? `${Math.min(
                              ...getFieldValues(field.id),
                            )}-${Math.max(...getFieldValues(field.id))}`
                          : `${exercise.sessionSets[0][field.id]}` // display property value from the first set because all identical
                      }
                      {field.label}
                    </span>
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
