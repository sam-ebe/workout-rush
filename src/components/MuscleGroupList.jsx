import React from "react";
import { Button } from "./Button";

function MuscleGroupList({
  allMuscleGroup,
  selectedMuscleGroup,
  handleChangeMuscleGroup,
  isSavedMuscleGroup,
  handleSaveMuscleGroup,
  bodyParts,
}) {
  const handleChange = (e) => {
    handleChangeMuscleGroup(e.target.value);
  };
  const handleSave = () => {
    handleSaveMuscleGroup(!isSavedMuscleGroup);
  };

  return (
    <>
      <h2>Selected Muscles Group</h2>
      <ul>
        {bodyParts.map((item, index) => {
          return !isSavedMuscleGroup ? (
            <li key={index}>
              <input
                type="checkbox"
                name=""
                id={`selected-muscle-${item}`}
                value={item}
                checked={selectedMuscleGroup.includes(item) ? true : false}
                onChange={handleChange}
              />
              <label htmlFor={`selected-muscle-${item}`}>{item}</label>
            </li>
          ) : (
            selectedMuscleGroup.includes(item) && <li key={index}>{item}</li>
          );
        })}
      </ul>
      <ul>
        {allMuscleGroup.map((item, index) => {
          return !isSavedMuscleGroup ? (
            <li key={index}>
              <input
                type="checkbox"
                name=""
                id={`selected-muscle-${item}`}
                value={item}
                checked={selectedMuscleGroup.includes(item) ? true : false}
                onChange={handleChange}
              />
              <label htmlFor={`selected-muscle-${item}`}>{item}</label>
            </li>
          ) : (
            selectedMuscleGroup.includes(item) && <li key={index}>{item}</li>
          );
        })}
      </ul>

      <Button onClick={handleSave} disabled={selectedMuscleGroup.length === 0}>
        {!isSavedMuscleGroup ? "Save and load Exercises" : "Modify"}
      </Button>
    </>
  );
}

export default MuscleGroupList;
