import React, { useState } from "react";
import { quizData } from "../data/data";
function Quiz() {
  const [quiz, setQuiz] = useState(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <>
      <h1>{quiz[currentQuestion].question}</h1>
      <ul>
        {quiz[currentQuestion].options.map((answer, index) => {
          return <li key={index}>{answer}</li>;
        })}
      </ul>
    </>
  );
}

export default Quiz;
