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
  const [toggleIndividualSets, setToggleIndividualSets] = useState([]);

  useEffect(() => {
    console.log("effect ExercisesList");
    setSelectedExercisesCopy([...selectedExercises]);
  }, [selectedExercises]);

  const handleDelete = (id) => {
    setSelectedExercisesCopy((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id),
    );
  };

  const handleToggleIndividualSets = (exerciseId) => {
    if (toggleIndividualSets.includes(exerciseId)) {
      setToggleIndividualSets((prevToggleIndividualSets) => {
        return prevToggleIndividualSets.filter((id) => id !== exerciseId);
      });
    } else {
      setToggleIndividualSets([...toggleIndividualSets, exerciseId]);
    }
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

  // individual input changes
  const handleIndividualInputChange = () => {
    return console.log("individual");
  };

  return (
    <>
      <StyledExercisesList>
        {selectedExercisesCopy.map((exercise) => {
          return (
            <li key={exercise.id}>
              <div>
                <MainRepsFields
                  isEdition={false}
                  exercise={exercise}
                  exerciseNameOnly={exerciseNameOnly}
                />
                {isEdition && (
                  <MainRepsFields
                    isEdition={isEdition}
                    handleInputChange={handleInputChange}
                    exercise={exercise}
                  />
                )}
                {isEdition && toggleIndividualSets.includes(exercise.id) && (
                  <IndividualRepsFields
                    exercise={exercise}
                    handleIndividualInputChange={handleIndividualInputChange}
                  />
                )}
              </div>
              {isEdition && (
                <>
                  <Button
                    onClick={() => handleToggleIndividualSets(exercise.id)}
                  >
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

function MainRepsFields({
  isEdition,
  handleInputChange,
  exercise,
  exerciseNameOnly = false,
}) {
  const getFieldValues = (fieldId) =>
    exercise.sessionSets.map((set) => set[fieldId]);

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

function IndividualRepsFields({ exercise, handleIndividualInputChange }) {
  return (
    <div>
      {exercise.sessionSets.map((set, index) => (
        <IndividualRepsItem key={index}>
          <label>S{index + 1}:&nbsp;</label>
          <div>
            <input
              type="number"
              value={set.reps}
              onChange={(e) =>
                handleIndividualInputChange(index, "reps", e.target.value)
              }
            />
            <label>{exercise.isHold ? "sec" : "reps"}</label>
          </div>
          <div>
            <input
              type="number"
              value={set.weight}
              onChange={(e) =>
                handleIndividualInputChange(index, "weight", e.target.value)
              }
            />
            <label>kg</label>
          </div>
          <div>
            <input
              type="number"
              value={set.restTime}
              onChange={(e) =>
                handleIndividualInputChange(index, "restTime", e.target.value)
              }
            />
            <label>sec</label>
          </div>
        </IndividualRepsItem>
      ))}
    </div>
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

const IndividualRepsItem = styled.div`
  display: flex;
  & input {
    max-width: 50px;
  }
  & label {
    white-space: nowrap;
  }
`;
