import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function AdminApplications() {

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/applications",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setApplications(response.data);

    } catch(error) {

      console.log(error);

      alert("Failed To Fetch Applications");
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/applications/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Status Updated");

      fetchApplications();

    } catch(error) {

      console.log(error);

      alert("Status Update Failed");
    }
  };

  return (

    <div>

      <Navbar />

      <div className="container py-4">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Recruiter Dashboard 👨‍💼
          </h1>

          <p className="text-muted">
            Manage candidate applications
          </p>

        </div>

        <div className="row g-4">

          {
            applications.map((application) => (

              <div
                className="col-lg-4 col-md-6 col-12"
                key={application.id}
              >

                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <div className="card-body p-4">

                    <h4 className="fw-bold">
                      {application.jobTitle}
                    </h4>

                    <h6 className="text-muted">
                      {application.company}
                    </h6>

                    <hr />

                    <p>
                      <strong>Email:</strong>
                      {" "}
                      {application.userEmail}
                    </p>

                    <p>
                      <strong>Status:</strong>
                    </p>

                    <span
                      className="badge bg-primary p-3"
                    >
                      {application.status}
                    </span>

                    <div className="d-grid gap-2 mt-4">

                      <button
                        className="btn btn-info"
                        onClick={() =>
                          updateStatus(
                            application.id,
                            "Viewed 👀"
                          )
                        }
                      >
                        Mark Viewed
                      </button>

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          updateStatus(
                            application.id,
                            "Shortlisted ⭐"
                          )
                        }
                      >
                        Shortlist
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          updateStatus(
                            application.id,
                            "Rejected ❌"
                          )
                        }
                      >
                        Reject
                      </button>

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

export default AdminApplications;