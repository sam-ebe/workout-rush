import React, { useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
import Modal from "./Modal";
import MuscleGroupList from "./MuscleGroupList";
import ExercicesModalContent from "./ExercicesModalContent";

const allMuscleGroup = ["Top", "Core", "Legs"];

function SessionSelect() {
  const [open, setOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState([
    getRandomInArray(allMuscleGroup),
  ]);
  const [isSavedMuscleGroup, setIsSavedMuscleGroup] = useState(false);
  const [firstTimeSaved, setFirstTimeSaved] = useState(false);

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
      // After that it remains always displayed, just refreshing the loaded data (exercices and eauipment)
      setFirstTimeSaved(true);
    }
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
        {(firstTimeSaved || isSavedMuscleGroup) && (
          <>
            {/* Changes only the number of reps/series (if displayed in the exercises list. For example : no numbers for AMRAP) and session duration */}
            <h2>Session Type</h2>
            <Selector>
              <Button>{"<"}</Button>
              <p>AMRAP</p>
              <Button>{">"}</Button>
            </Selector>
            {/*Opens a modal*/}
            {/*search by categories*/}
            {/*Inputs for number of reps, default 10*/}
            {/*Add Recommended number of exercises : 1-5 */}
            <h2>Choose your Exercises</h2>
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
            {open && (
              <Modal>
                <ExercicesModalContent handleClose={handleClose} />
              </Modal>
            )}
          </>
        )}
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
