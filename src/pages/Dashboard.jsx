import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

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

  } catch(error) {

    resumeSkills = [];
  }

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/jobs",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setJobs(response.data);

    } catch(error) {

      console.log(error);

      alert("Failed To Fetch Jobs");
    }
  };

  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/api/jobs/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Job Deleted");

      fetchJobs();

    } catch(error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  return (

    <div>

      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to right, #141e30, #243b55)"
        }}
      >

        {/* HERO SECTION */}

        <div
          className="text-center mb-5 text-white"
        >

          <h1
            className="fw-bold display-4"
          >
            Welcome To JobAI 🚀
          </h1>

          <p className="lead">
            AI Powered Smart Recruitment Platform
          </p>

          {
            Array.isArray(resumeSkills)
            && resumeSkills.length > 0 && (

              <div className="mt-3">

                <h5 className="text-success">
                  AI Recommended Jobs
                  Based On Your Resume 🚀
                </h5>

              </div>
            )
          }

          {/* STATS */}

          <div className="row mt-5">

            <div className="col-md-4 mb-3">

              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,0.15)",
                  backdropFilter:
                    "blur(10px)"
                }}
              >

                <h2 className="text-white">
                  {jobs.length}
                </h2>

                <p className="text-light">
                  Available Jobs
                </p>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,0.15)",
                  backdropFilter:
                    "blur(10px)"
                }}
              >

                <h2 className="text-white">
                  {resumeSkills.length}
                </h2>

                <p className="text-light">
                  AI Skills Detected
                </p>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,0.15)",
                  backdropFilter:
                    "blur(10px)"
                }}
              >

                <h2 className="text-white">
                  AI
                </h2>

                <p className="text-light">
                  Smart Recommendations
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH BAR */}

        <div className="row justify-content-center mb-5">

          <div className="col-lg-6 col-md-8 col-12">

            <input
              type="text"
              placeholder="Search by title, company or skills..."
              className="form-control form-control-lg shadow-sm"
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                borderRadius: "15px"
              }}
            />

          </div>

        </div>

        {/* JOB CARDS */}

        <div className="row g-4">

          {
            jobs

              .filter((job) => {

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
                if(
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
              })

              .map((job) => (

                <div
                  className="col-xl-4 col-lg-6 col-md-6 col-12"
                  key={job.id}
                >

                  <div
                    className="card border-0 shadow-lg h-100"
                    style={{
                      borderRadius: "20px",
                      transition: "0.3s"
                    }}
                  >

                    <div className="card-body p-4 d-flex flex-column">

                      <div className="mb-3">

                        <span className="badge bg-primary mb-3">
                          Hiring
                        </span>

                        <h3 className="fw-bold">
                          {job.title}
                        </h3>

                        <h6 className="text-muted">
                          {job.company}
                        </h6>

                      </div>

                      <div className="mb-3">

                        <p>
                          📍 {job.location}
                        </p>

                        <p>
                          💰 ₹{job.salary}
                        </p>

                      </div>

                      <div className="mb-3">

                        <p className="text-muted">
                          {job.description}
                        </p>

                      </div>

                      <div className="mb-4">

                        <strong>
                          Skills:
                        </strong>

                        <p>
                          {job.skills}
                        </p>

                      </div>

                      {/* BUTTONS */}

                      <div className="mt-auto">

                        {
                          role === "ADMIN" ? (

                            <div className="d-flex flex-column flex-sm-row gap-2">

                              <button
                                className="btn btn-warning w-100"
                                onClick={() =>
                                  navigate(`/edit-job/${job.id}`)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-danger w-100"
                                onClick={() =>
                                  handleDelete(job.id)
                                }
                              >
                                Delete
                              </button>

                            </div>

                          ) : (

                            <button
                              className="btn btn-success w-100"
                              onClick={async () => {

                                try {

                                  const token =
                                    localStorage.getItem("token");

                                  const email =
                                    localStorage.getItem("email");

                                  await axios.post(
                                    "http://localhost:8080/api/applications",
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

                                } catch(error) {

                                  console.log(error);

                                  alert("Application Failed");
                                }
                              }}
                            >
                              Apply Now
                            </button>

                          )
                        }

                      </div>

                    </div>

                  </div>

                </div>
              ))
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;