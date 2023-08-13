import React from "react";
import { Button } from "./Button";
function ExercicesModalContent({ handleClose }) {
  return (
    <>
      <h2>Choose your Exercises</h2>
      <Button onClick={handleClose}>Close</Button>
    </>
  );
}

export default ExercicesModalContent;
