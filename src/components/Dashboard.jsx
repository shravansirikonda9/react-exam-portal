import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // When the dashboard loads, check the browser's memory
    const savedScore = localStorage.getItem("reactExamHighScore");
    if (savedScore) {
      setHighScore(savedScore);
    }
  }, []);
  return (
    <div className="page-container">
      <div className="card">
        <h2>Welcome Back!</h2>
        <div style={{ marginBottom: "20px" }}>
          <p>
            You have 1 pending assessment. You will have 60 seconds to complete
            it.
          </p>
          <span
            style={{
              background: "#fef08a",
              color: "#854d0e",
              padding: "5px 10px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            🏆 Personal Best: {highScore}
          </span>
        </div>

        <button className="btn btn-primary" onClick={() => navigate("/quiz")}>
          Start React Exam
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
