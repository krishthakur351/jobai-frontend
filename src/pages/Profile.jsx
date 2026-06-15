import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Profile() {

  const [applications, setApplications] =
    useState([]);

  const [skills, setSkills] =
    useState([]);

  const email =
    localStorage.getItem("email");

  useEffect(() => {

    fetchApplications();

    fetchSkills();

  }, []);

  const fetchApplications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        `https://jobai-backend-swrv.onrender.com/api/applications/${email}`,
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
    }
  };

  const fetchSkills = async () => {

    try {

      const token =
        localStorage.getItem("token");
      const response = await axios.get(
        `https://jobai-backend-swrv.onrender.com/api/resume/skills/${email}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setSkills(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const shortlisted =
    applications.filter(
      (app) =>
        app.status?.includes("Shortlisted")
    ).length;

  return (

    <div>

      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "25px"
              }}
            >

              <div className="card-body p-5">

                <div className="text-center">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                    width="120"
                    className="mb-3"
                  />

                  <h2 className="fw-bold">
                    {email}
                  </h2>

                  <p className="text-muted">
                    AI Powered Job Seeker 🚀
                  </p>

                </div>

                <hr className="my-4" />

                <div className="row text-center">

                  <div className="col-md-4 mb-3">

                    <div className="p-4 bg-light rounded">

                      <h2>
                        {applications.length}
                      </h2>

                      <p>
                        Applications
                      </p>

                    </div>

                  </div>

                  <div className="col-md-4 mb-3">

                    <div className="p-4 bg-light rounded">

                      <h2>
                        {shortlisted}
                      </h2>

                      <p>
                        Shortlisted
                      </p>

                    </div>

                  </div>

                  <div className="col-md-4 mb-3">

                    <div className="p-4 bg-light rounded">

                      <h2>
                        {skills.length}
                      </h2>

                      <p>
                        Skills Detected
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-5">

                  <h4 className="fw-bold mb-3">
                    AI Detected Skills
                  </h4>

                  <div className="d-flex flex-wrap gap-2">

                    {
                      skills.length > 0 ? (

                        skills.map((skill, index) => (

                          <span
                            key={index}
                            className="badge bg-success p-3"
                          >
                            {skill}
                          </span>
                        ))

                      ) : (

                        <p className="text-muted">
                          Upload Resume To Detect Skills
                        </p>
                      )
                    }

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;