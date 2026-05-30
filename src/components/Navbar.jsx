import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

function Navbar() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const [darkMode, setDarkMode] =
    useState(false);

  // DARK MODE EFFECT
  useEffect(() => {

    if(darkMode) {

      document.body.style.background =
        "#121212";

      document.body.style.color =
        "white";

    } else {

      document.body.style.background =
        "white";

      document.body.style.color =
        "black";
    }

  }, [darkMode]);

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg"
      style={{
        background:
          "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}
    >

      <div className="container">

        {/* LOGO */}

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/dashboard"
        >
          JobAI 🚀
        </Link>

        {/* MOBILE TOGGLE */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

            <Link
              className="btn btn-outline-light"
              to="/dashboard"
            >
              Dashboard
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/profile"
            >
              Profile
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/applied-jobs"
            >
              Applied Jobs
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/resume-upload"
            >
              Resume AI
            </Link>

            <Link
              className="btn btn-outline-light"
              to="/chatbot"
            >
              AI Assistant
            </Link>

            {
              role === "ADMIN" && (

                <>
                  <Link
                    className="btn btn-warning"
                    to="/add-job"
                  >
                    Add Job
                  </Link>

                  <Link
                    className="btn btn-info"
                    to="/admin-applications"
                  >
                    Applications
                  </Link>
                </>
              )
            }

            {/* DARK MODE BUTTON */}

            <button
              className="btn btn-secondary"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {
                darkMode
                  ? "☀️ Light"
                  : "🌙 Dark"
              }
            </button>

            {/* LOGOUT */}

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;