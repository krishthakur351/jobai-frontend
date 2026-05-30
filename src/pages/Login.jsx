import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );

      const payload = JSON.parse(
        atob(response.data.split(".")[1])
      );

      localStorage.setItem(
        "role",
        payload.role
      );

      localStorage.setItem(
        "email",
        payload.sub
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch(error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <div
        className="p-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          color: "white"
        }}
      >

        <h1 className="text-center fw-bold mb-3">
          JobAI
        </h1>

        <p className="text-center mb-4">
          AI Powered Recruitment Platform
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="form-control mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-4">

          Don't have an account?

          <Link
            to="/register"
            className="ms-2 text-info text-decoration-none fw-bold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;