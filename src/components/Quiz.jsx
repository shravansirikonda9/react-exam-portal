import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    questionText: "What is the standard file extension for React components?",
    answerOptions: [
      { answerText: ".html", isCorrect: false },
      { answerText: ".jsx", isCorrect: true },
      { answerText: ".jsm", isCorrect: false },
      { answerText: ".react", isCorrect: false },
    ],
  },
  {
    questionText: "Which hook is used to give a component memory?",
    answerOptions: [
      { answerText: "useEffect", isCorrect: false },
      { answerText: "useNavigate", isCorrect: false },
      { answerText: "useState", isCorrect: true },
      { answerText: "useMemory", isCorrect: false },
    ],
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setShowScore(true);
      return;
    }

    if (!showScore) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // 1000 milliseconds = 1 second

      // Clean up the timer so it doesn't run infinitely
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, showScore]); // React watches these two variables to know when to run

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(60); // Reset the clock!
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="card quiz-card">
        {showScore ? (
          <div className="score-section">
            <h2>Exam Complete!</h2>
            <div className="score-circle">
              {score} / {questions.length}
            </div>
            <p>Your test has been successfully submitted.</p>
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleRestart}>
                Play Again
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="quiz-header">
              <span className="question-count">
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span className="timer-text">⏱ {timeLeft}s</span>
            </div>

            <div className="question-section">
              <h3 className="question-text">
                {questions[currentQuestion].questionText}
              </h3>
            </div>

            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    className="btn btn-answer"
                    onClick={() => handleAnswerClick(answerOption.isCorrect)}
                  >
                    {answerOption.answerText}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
