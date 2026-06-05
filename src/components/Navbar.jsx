import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const role =
    localStorage.getItem("role");

  const [darkMode, setDarkMode] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  // SCROLL DETECTION — compact navbar on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // DARK MODE EFFECT
  useEffect(() => {

    if(darkMode) {

      document.body.style.background =
        "#0a0a0f";

      document.body.style.color =
        "#e2e8f0";

    } else {

      document.body.style.background =
        "#ffffff";

      document.body.style.color =
        "#1e293b";
    }

  }, [darkMode]);

  // LOCK BODY SCROLL WHEN DRAWER IS OPEN
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // CLOSE DRAWER ON ROUTE CHANGE
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // LOGOUT
  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  const isActive = (path) => {
    return location.pathname === path
      ? "Navbar-link Navbar-link-active"
      : "Navbar-link";
  };

  // Build wrapper class names
  const wrapperClasses = [
    "Navbar-wrapper",
    darkMode ? "Navbar-dark-mode" : "Navbar-light-mode",
    scrolled ? "Navbar-scrolled" : ""
  ].filter(Boolean).join(" ");

  const drawerClasses = [
    "Navbar-drawer",
    darkMode ? "Navbar-dark-mode" : "Navbar-light-mode",
    isOpen ? "Navbar-open" : ""
  ].filter(Boolean).join(" ");

  return (

    <nav className={wrapperClasses}>

      <div className="Navbar-container">

        {/* LOGO */}

        <Link
          className="Navbar-brand"
          to="/dashboard"
          onClick={() => setIsOpen(false)}
        >
          JobAI 🚀
        </Link>

        {/* NAV ITEMS FOR DESKTOP */}

        <div className="Navbar-menu">

          <Link
            className={isActive("/dashboard")}
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className={isActive("/profile")}
            to="/profile"
          >
            Profile
          </Link>

          <Link
            className={isActive("/applied-jobs")}
            to="/applied-jobs"
          >
            Applied Jobs
          </Link>

          <Link
            className={isActive("/resume-upload")}
            to="/resume-upload"
          >
            Resume AI
          </Link>

          <Link
            className={isActive("/chatbot")}
            to="/chatbot"
          >
            AI Assistant
          </Link>

        </div>

        {/* ACTIONS PANEL FOR DESKTOP */}

        <div className="Navbar-actions">

          {
            role === "ADMIN" && (

              <>
                <Link
                  className="Navbar-btn Navbar-btn-warning"
                  to="/add-job"
                >
                  ＋ Add Job
                </Link>

                <Link
                  className="Navbar-btn Navbar-btn-info"
                  to="/admin-applications"
                >
                  Applications
                </Link>
              </>
            )
          }

          {/* DARK MODE BUTTON */}

          <button
            className="Navbar-btn-toggle"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            aria-label="Toggle Dark Mode"
          >
            {
              darkMode
                ? "☀️"
                : "🌙"
            }
          </button>

          {/* LOGOUT */}

          <button
            className="Navbar-btn Navbar-btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* MOBILE HAMBURGER TOGGLE */}

        <button
          className={`Navbar-hamburger ${isOpen ? "Navbar-open" : ""}`}
          onClick={() =>
            setIsOpen(!isOpen)
          }
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
        >
          <span className="Navbar-hamburger-bar"></span>
          <span className="Navbar-hamburger-bar"></span>
          <span className="Navbar-hamburger-bar"></span>
        </button>

      </div>

      {/* MOBILE DRAWER MENU */}

      <div className={drawerClasses}>

        <div className="Navbar-drawer-links">

          <Link
            className={isActive("/dashboard")}
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            className={isActive("/profile")}
            to="/profile"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>

          <Link
            className={isActive("/applied-jobs")}
            to="/applied-jobs"
            onClick={() => setIsOpen(false)}
          >
            Applied Jobs
          </Link>

          <Link
            className={isActive("/resume-upload")}
            to="/resume-upload"
            onClick={() => setIsOpen(false)}
          >
            Resume AI
          </Link>

          <Link
            className={isActive("/chatbot")}
            to="/chatbot"
            onClick={() => setIsOpen(false)}
          >
            AI Assistant
          </Link>

        </div>

        <div className="Navbar-drawer-actions">

          {
            role === "ADMIN" && (

              <>
                <Link
                  className="Navbar-btn Navbar-btn-warning"
                  to="/add-job"
                  onClick={() => setIsOpen(false)}
                >
                  ＋ Add Job
                </Link>

                <Link
                  className="Navbar-btn Navbar-btn-info"
                  to="/admin-applications"
                  onClick={() => setIsOpen(false)}
                >
                  Applications
                </Link>
              </>
            )
          }

          {/* DARK MODE BUTTON MOBILE */}

          <button
            className="Navbar-btn-toggle"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {
              darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"
            }
          </button>

          {/* LOGOUT MOBILE */}

          <button
            className="Navbar-btn Navbar-btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;