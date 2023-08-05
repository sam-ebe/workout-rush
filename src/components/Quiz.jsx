import React, { useState } from "react";
import { quizData } from "../data/data";
import { styled } from "styled-components";

function Quiz() {
  const [quiz, setQuiz] = useState(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === quiz.length - 1;
  const isFinished = quiz[quiz.length - 1].answers.length !== 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((c) => c + 1);
    }
  };
  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion((c) => c - 1);
      console.log(currentQuestion);
    }
  };

  const handleSkipAll = () => {};

  const handleSelect = (e) => {
    const selectedAnswer = e.target.value;
    const updatedQuiz = quiz.map((item) => {
      if (quiz[currentQuestion].id === item.id) {
        const itemIndex = item.answers.findIndex(
          (elt) => elt === selectedAnswer,
        );
        // already present in the quiz array
        if (itemIndex !== -1) {
          // delete 1 element
          return {
            ...item,
            answers: item.answers.filter((ans) => ans !== selectedAnswer),
          };
        } else {
          // not yet in the quiz array
          return { ...item, answers: [...item.answers, selectedAnswer] };
        }
      } else {
        return item;
      }
    });
    setQuiz(updatedQuiz);
  };
  return (
    <>
      <StyledQuiz>
        <ProgressBar current={currentQuestion + 1} total={quiz.length} />
        <Button onClick={handleSkipAll}>Skip all</Button>
        <Question>{quiz[currentQuestion].question}</Question>
        <Options>{displayOptions(quiz, currentQuestion, handleSelect)}</Options>

        <div className="prevNext">
          {!isFirstQuestion && (
            <Button onClick={handlePrevious}>Previous</Button>
          )}
          <Button onClick={handleNext}>
            {!isLastQuestion ? "Next" : "Finish"}
          </Button>
        </div>
      </StyledQuiz>
      <RecapQuiz></RecapQuiz>
    </>
  );
}

function displayOptions(quiz, currentQuestion, handleSelect) {
  return quiz[currentQuestion].options.map((answer, index) => {
    return (
      <li key={index}>
        <input
          type="checkbox"
          name={`${quiz[currentQuestion].id}`}
          value={answer.label}
          onChange={handleSelect}
          checked={quiz[currentQuestion].answers.includes(answer.label)}
        />
        <label htmlFor={answer.label}>{answer.label}</label>
        {answer.image && ` image: ${answer.image}`}
      </li>
    );
  });
}

function ProgressBar({ current, total }) {
  return (
    <StyledProgressBar>
      <p className="pb-value">{`${current} of ${total}`}</p>
      <div className="pb-track">
        <div className="pb-bar"></div>
      </div>
    </StyledProgressBar>
  );
}

export default Quiz;

/* styling */

const StyledQuiz = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .prevNext {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    width: 100%;
  }
`;

const Question = styled.h1`
  padding: 20px;
  text-align: center;
`;

const Options = styled.ul`
  padding: 0 0 20px 0;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 12px;
  min-width: 100px;
`;

const StyledProgressBar = styled.div`
  & .p
`;

const RecapQuiz = styled.div`
  background: salmon;
`;
