import React from "react";
import { Button } from "./Button";
import { styled } from "styled-components";
function SessionSelect() {
  return (
    <>
      {/*Opens a modal, saves state after Save button (because it will reload exercices from exercice list */}
      {/*possibility of multiple muscle groups. When full body selected , the others turn gray, add button too */}
      <h2>Muscle group List</h2>
      <Selector>
        <p>Core</p>
        <Button>Modify</Button>
      </Selector>
      {/* Changes only the number of reps/series (if displayed in the exercices list. For example : no numbers for AMRAP) and session duration */}
      <h2>Session Type</h2>
      <Selector>
        <Button>left</Button>
        <p>AMRAP</p>
        <Button>right</Button>
      </Selector>
      {/*Opens a modal*/}
      {/*search by categories*/}
      {/*Inputs for number of reps*/}
      {/*Add Recommended number of exercices : 1-5 */}
      <h2>Exercices list</h2>
      <Selector>
        List
        <Button>Modify</Button>
      </Selector>
      {/* depends on selected exercices, comes from loaded exercices data*/}
      <h2>Necessary Equipment List (based on the exercices list)</h2>
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
    </>
  );
}

export default SessionSelect;

const Selector = styled.div`
  display: flex;
  align-items: center;
`;
