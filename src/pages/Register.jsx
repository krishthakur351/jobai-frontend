import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://jobai-backend-swrv.onrender.com/api/users/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/");

    } catch(error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4 shadow">

            <h2 className="text-center mb-4">
              JobAI Register
            </h2>

            <input
              type="text"
              placeholder="Enter Name"
              className="form-control mb-3"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Enter Email"
              className="form-control mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="form-control mb-3"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-success w-100"
              onClick={handleRegister}
            >
              Register
            </button>

            <p className="mt-3 text-center">

              Already have an account?

              <Link to="/">
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;