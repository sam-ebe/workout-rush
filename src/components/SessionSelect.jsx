import React, { useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
import Modal from "./Modal";
import MuscleGroupList from "./MuscleGroupList";

const allMuscleGroup = ["Top", "Core", "Legs"];

function SessionSelect() {
  const [open, setOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([
    getRandomInArray(allMuscleGroup),
  ]);
  const [isSavedMuscleGroup, setIsSavedMuscleGroup] = useState(false);
  const modalTitle = "Choose your Exercises";

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeMuscleGroup = (muscleGroup) => {
    setSelectedMuscleGroup(
      selectedMuscleGroup.includes(muscleGroup)
        ? selectedMuscleGroup.filter((item) => item !== muscleGroup)
        : [...selectedMuscleGroup, muscleGroup],
    );
  };

  const handleSaveMuscleGroup = (val) => {
    setIsSavedMuscleGroup(val);
  };

  return (
    <>
      <StyledSessionSelect>
        {/*after Save button will reload exercises from exercise list */}
        <MuscleGroupList
          allMuscleGroup={allMuscleGroup}
          selectedMuscleGroup={selectedMuscleGroup}
          handleChangeMuscleGroup={handleChangeMuscleGroup}
          isSavedMuscleGroup={isSavedMuscleGroup}
          handleSaveMuscleGroup={handleSaveMuscleGroup}
        />

        {/* Changes only the number of reps/series (if displayed in the exercises list. For example : no numbers for AMRAP) and session duration */}
        <h2>Session Type</h2>
        <Selector>
          <Button>{"<"}</Button>
          <p>AMRAP</p>
          <Button>{">"}</Button>
        </Selector>
        {/*Opens a modal*/}
        {/*search by categories*/}
        {/*Inputs for number of reps*/}
        {/*Add Recommended number of exercises : 1-5 */}
        <h2>{modalTitle}</h2>
        <Selector>
          List
          <Button onClick={handleOpen}>Modify</Button>
        </Selector>
        {/* depends on selected exercises, comes from loaded exercises data*/}
        <h2>Necessary Equipment List (based on the exercises list)</h2>
        <Selector>
          <p>None (just bodyweight)</p>
        </Selector>
        {/* 5 per five, min 5 min*/}
        <h2>Duration</h2>
        <Selector>
          <Button>-</Button>
          <p>20 min</p>
          <Button>+</Button>
        </Selector>
        <Button>GO ! </Button>
        {open && <Modal handleOpen={handleOpen} modalTitle={modalTitle} />}
      </StyledSessionSelect>
    </>
  );
}

export default SessionSelect;

function getRandomInArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const StyledSessionSelect = styled.div`
  position: relative;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;
