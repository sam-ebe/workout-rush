import { useState } from "react";
import Quiz from "./components/Quiz";
import "./index.css";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);

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
        <button onClick={() => handleQuizComplete(!quizCompleted)}>
          Back to the Quiz
        </button>
      )}
    </>
  );
}

export default App;
