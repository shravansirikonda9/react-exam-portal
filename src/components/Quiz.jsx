import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleAnswerClick = (isCorrect) => {
    // 1. Calculate the new score exactly in this moment
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    // 2. Move to next question or end the quiz
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);

      // 3. THE MAGIC: Check and save the High Score
      const previousHighScore = localStorage.getItem("reactExamHighScore") || 0;
      if (newScore > previousHighScore) {
        localStorage.setItem("reactExamHighScore", newScore);
      }
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple",
        );
        const data = await response.json();

        // Formatting the API data to match our app's structure
        const formattedQuestions = data.results.map((loadedQuestion) => {
          const formattedQuestion = {
            questionText: loadedQuestion.question,
            answerOptions: [],
          };

          // Combine incorrect and correct answers into one array
          const answerChoices = [...loadedQuestion.incorrect_answers];
          // Insert the correct answer at a random position so it isn't always last
          const randomIndex = Math.floor(Math.random() * 4);
          answerChoices.splice(randomIndex, 0, loadedQuestion.correct_answer);

          answerChoices.forEach((choice) => {
            formattedQuestion.answerOptions.push({
              answerText: choice,
              isCorrect: choice === loadedQuestion.correct_answer,
            });
          });

          return formattedQuestion;
        });

        setQuestions(formattedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setIsLoading(false); // Add this line so it doesn't spin forever!
      }
    };

    fetchQuestions();
  }, []);

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

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>Loading Exam...</h2>
          <p>Fetching live questions from the server.</p>
        </div>
      </div>
    );
  }

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
