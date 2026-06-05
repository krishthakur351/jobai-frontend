import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AppliedJobs.css";

/* Inline SVG icons (Heroicons style) */
const LocationIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const SalaryIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1v22M5 5h14M5 12h14M5 19h14" />
  </svg>
);

function AppliedJobs() {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const email =
        localStorage.getItem("email");

      const response = await axios.get(
        `http://localhost:8080/api/applications/${email}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setApplications(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Fetch Applications");
    }
  };

  return (
    <>
      <Navbar />
      <div className="AppliedJobs-container">
        <div className="AppliedJobs-header text-center mb-5">
          <h1 className="AppliedJobs-title fw-bold">My Applications 📄</h1>
          <p className="AppliedJobs-subtitle text-muted">Track your job application status</p>
        </div>
        <div className="AppliedJobs-grid">
          {applications.length > 0 ? (
            applications.map((application, idx) => (
              <div className="AppliedJob-col" key={application.id}>
                <div className={`AppliedJob-card variant-${idx % 4}`}>
                  <div className="AppliedJob-card-body">
                    <h3 className="AppliedJob-title fw-bold">{application.jobTitle}</h3>
                    <h5 className="AppliedJob-company text-muted">{application.company}</h5>

                    {/* Location */}
                    <div className="AppliedJob-location mt-3 flex items-center gap-2">
                      <LocationIcon />
                      <span>{application.location || 'Remote'}</span>
                    </div>
                    {/* Salary */}
                    <div className="AppliedJob-salary mt-2 flex items-center gap-2">
                      <SalaryIcon />
                      <span>{application.salary ? `$${application.salary}` : 'Negotiable'}</span>
                    </div>

                    <h6>Application Status</h6>
                    <span className={`AppliedJob-status ${application.status.toLowerCase()}`}>{application.status}</span>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div className="text-center">
              <h4>No Applications Yet</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AppliedJobs;