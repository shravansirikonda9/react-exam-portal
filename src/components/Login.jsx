import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Please Enter Both Username and Password");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Student Portal</h2>
        <p>Please log in to access your exams.</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
