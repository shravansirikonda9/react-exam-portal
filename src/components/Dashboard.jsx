import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="card">
        <h2>Welcome Back!</h2>
        <p>
          You have 1 pending assessment. You will have 60 seconds to complete
          it.
        </p>

        <button className="btn btn-primary" onClick={() => navigate("/quiz")}>
          Start React Exam
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
