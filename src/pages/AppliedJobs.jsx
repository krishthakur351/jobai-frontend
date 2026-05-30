import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

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

    } catch(error) {

      console.log(error);

      alert("Failed To Fetch Applications");
    }
  };

  return (

    <div>

      <Navbar />

      <div className="container py-4">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            My Applications 📄
          </h1>

          <p className="text-muted">
            Track your job application status
          </p>

        </div>

        <div className="row g-4">

          {
            applications.length > 0 ? (

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

                      <h3 className="fw-bold">
                        {application.jobTitle}
                      </h3>

                      <h5 className="text-muted">
                        {application.company}
                      </h5>

                      <div className="mt-4">

                        <h6>
                          Application Status
                        </h6>

                        <span
                          className="badge bg-success p-3"
                        >
                          {application.status}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>
              ))

            ) : (

              <div className="text-center">

                <h4>
                  No Applications Yet
                </h4>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default AppliedJobs;