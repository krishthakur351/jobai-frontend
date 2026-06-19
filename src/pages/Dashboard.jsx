import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  // SAFE RESUME SKILLS
  const storedSkills =
    localStorage.getItem("resumeSkills");

  let resumeSkills = [];

  try {

    const parsedSkills =
      storedSkills
        ? JSON.parse(storedSkills)
        : [];

    resumeSkills =
      Array.isArray(parsedSkills)
        ? parsedSkills
        : [];

  } catch (error) {

    resumeSkills = [];
  }


  const calculateMatch = (jobSkills) => {

    if (
      !resumeSkills ||
      resumeSkills.length === 0
    ) {
      return 0;
    }

    const skillsArray =
      jobSkills
        .toLowerCase()
        .split(",");

    let matched = 0;

    resumeSkills.forEach((skill) => {

      if (
        skillsArray.some(
          (js) =>
            js.trim()
              .includes(
                skill.toLowerCase()
              )
        )
      ) {
        matched++;
      }
    });

    return Math.round(
      (matched /
        resumeSkills.length) * 100
    );
  };
  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
  "https://jobai-backend-swrv.onrender.com/api/jobs",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      setJobs(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Fetch Jobs");
    }
  };

  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem("token");
      await axios.delete(
        `https://jobai-backend-swrv.onrender.com/api/jobs/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Job Deleted");

      fetchJobs();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  // Filter jobs by search + AI skills
  const filteredJobs = jobs.filter((job) => {

    const searchText =
      search.toLowerCase();

    // SEARCH FILTER
    const matchesSearch = (

      job.title?.toLowerCase()
        .includes(searchText) ||

      job.company?.toLowerCase()
        .includes(searchText) ||

      job.skills?.toLowerCase()
        .includes(searchText)
    );

    // AI FILTER
    if (
      Array.isArray(resumeSkills)
      && resumeSkills.length > 0
    ) {

      const jobSkills =
        job.skills?.toLowerCase() || "";

      const matched =
        resumeSkills.some((skill) =>
          jobSkills.includes(
            skill.toLowerCase()
          )
        );

      return matchesSearch && matched;
    }

    return matchesSearch;
  });

  return (

    <div className="Dashboard-page">

      <Navbar />

      {/* ── HERO SECTION ──────────────────────────── */}

      <section className="Dashboard-hero">

        <h1 className="Dashboard-hero-title">
          Welcome To JobAI{" "}
          <span className="Dashboard-emoji">🚀</span>
        </h1>

        <p className="Dashboard-hero-subtitle">
          AI Powered Smart Recruitment Platform
        </p>

        {
          Array.isArray(resumeSkills)
          && resumeSkills.length > 0 && (

            <div className="Dashboard-ai-badge">
              <span>🤖</span>
              AI Recommended Jobs Based On Your Resume
            </div>
          )
        }

        {/* ── STATS ──────────────────────────────── */}

        <div className="Dashboard-stats">

          <div className="Dashboard-stat-card">
            <h2 className="Dashboard-stat-value">
              {jobs.length}
            </h2>
            <p className="Dashboard-stat-label">
              Available Jobs
            </p>
          </div>

          <div className="Dashboard-stat-card">
            <h2 className="Dashboard-stat-value">
              {resumeSkills.length}
            </h2>
            <p className="Dashboard-stat-label">
              AI Skills Detected
            </p>
          </div>

          <div className="Dashboard-stat-card">
            <h2 className="Dashboard-stat-value">
              AI
            </h2>
            <p className="Dashboard-stat-label">
              Smart Recommendations
            </p>
          </div>

        </div>

      </section>

      {/* ── SEARCH BAR ────────────────────────────── */}

      <div className="Dashboard-search-section">
        <div className="Dashboard-search-wrapper">

          <span className="Dashboard-search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by title, company or skills..."
            className="Dashboard-search-input"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>
      </div>

      {/* ── JOB CARDS ─────────────────────────────── */}

      <div className="Dashboard-content">

        <div className="Dashboard-jobs-grid">

          {
            filteredJobs.length === 0 ? (

              <div className="Dashboard-empty">
                <div className="Dashboard-empty-icon">
                  📭
                </div>
                <h3 className="Dashboard-empty-title">
                  No jobs found
                </h3>
                <p className="Dashboard-empty-text">
                  Try adjusting your search or check back later.
                </p>
              </div>

            ) : (

              filteredJobs.map((job, index) => (

                <div
                  className="Dashboard-job-card"
                  key={job.id}
                  style={{
                    animationDelay: `${index * 0.06}s`
                  }}
                >

                  <div className="Dashboard-card-body">

                    {/* Badge */}
                    <span className="Dashboard-badge-hiring">
                      <span>●</span> Hiring
                    </span>

                    {/* Title + Company */}
                    <h3 className="Dashboard-job-title">
                      {job.title}
                    </h3>

                    <p className="Dashboard-job-company">
                      {job.company}
                    </p>

                    {/* Meta: Location & Salary */}
                    <div className="Dashboard-job-meta">

                      <span className="Dashboard-meta-item">
                        <span className="Dashboard-meta-icon">📍</span>
                        {job.location}
                      </span>

                      <span className="Dashboard-meta-item">
                        <span className="Dashboard-meta-icon">💰</span>
                        ₹{job.salary}
                      </span>

                    </div>

                    {/* Description */}
                    <p className="Dashboard-job-desc">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="Dashboard-skills-section">

                      <p className="Dashboard-skills-label">
                        Skills Required
                      </p>

                      <div className="Dashboard-skills-list">
                        {
                          job.skills?.split(",").map((skill, i) => (
                            <span
                              className="Dashboard-skill-tag"
                              key={i}
                            >
                              {skill.trim()}
                            </span>
                          ))
                        }
                      </div>

                      {/* AI Match Badge */}
                      {
                        resumeSkills.length > 0 && (

                          <div>

                            {
                              calculateMatch(
                                job.skills
                              ) >= 70 ? (

                                <span className="Dashboard-match-badge Dashboard-match-high">
                                  🔥 {calculateMatch(job.skills)}% Match
                                </span>

                              ) : (

                                <span className="Dashboard-match-badge Dashboard-match-low">
                                  {calculateMatch(job.skills)}% Match
                                </span>

                              )
                            }

                          </div>
                        )
                      }

                    </div>

                    {/* BUTTONS */}

                    <div className="Dashboard-card-actions">

                      {
                        role === "ADMIN" ? (

                          <div className="Dashboard-admin-actions">

                            <button
                              className="Dashboard-btn Dashboard-btn-edit"
                              onClick={() =>
                                navigate(`/edit-job/${job.id}`)
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              className="Dashboard-btn Dashboard-btn-delete"
                              onClick={() =>
                                handleDelete(job.id)
                              }
                            >
                              🗑️ Delete
                            </button>

                          </div>

                        ) : (

                          <button
                            className="Dashboard-btn Dashboard-btn-apply"
                            onClick={async () => {

                              try {

                                const token =
                                  localStorage.getItem("token");

                                const email =
                                  localStorage.getItem("email");

                                await axios.post(
                                  "https://jobai-backend-swrv.onrender.com/api/applications",
                                  {
                                    userEmail: email,
                                    jobTitle: job.title,
                                    company: job.company
                                  },
                                  {
                                    headers: {
                                      Authorization:
                                        `Bearer ${token}`
                                    }
                                  }
                                );

                                alert(
                                  "Application Submitted Successfully 🚀"
                                );

                              } catch (error) {

                                console.log(error);

                                alert("Application Failed");
                              }
                            }}
                          >
                            Apply Now →
                          </button>

                        )
                      }

                    </div>

                  </div>

                </div>
              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;