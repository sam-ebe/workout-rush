import { useState } from "react";
import Quiz from "./components/Quiz";
import "./index.css";
import SessionSelect from "./components/SessionSelect";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(true);

  const handleQuizComplete = (c) => {
    setQuizCompleted(c);
  };
  return (
    <>
      {!quizCompleted ? (
        <Quiz
          quizCompleted={quizCompleted}
          handleQuizComplete={handleQuizComplete}
        />
      ) : (
        /*<button onClick={() => handleQuizComplete(!quizCompleted)}>
          Back to the Quiz
        </button>*/
        <SessionSelect />
      )}
    </>
  );
}

export default App;
