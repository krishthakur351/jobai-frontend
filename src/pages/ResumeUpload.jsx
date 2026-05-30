import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const [skills, setSkills] =
    useState([]);

  const handleUpload = async () => {

    try {

      if(!file) {

        alert("Please Select Resume");

        return;
      }

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8080/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setSkills(response.data);

      localStorage.setItem(
        "resumeSkills",
        JSON.stringify(response.data)
      );

      alert("Resume Analyzed Successfully");

    } catch(error) {

      console.log(error);

      alert("Upload Failed");
    }
  };

  return (

    <div>

      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-6">

            <div
              className="card shadow-lg border-0 p-5"
              style={{
                borderRadius: "20px"
              }}
            >

              <h1 className="text-center mb-4">
                AI Resume Analyzer 🚀
              </h1>

              <input
                type="file"
                className="form-control mb-4"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

              <button
                className="btn btn-primary w-100"
                onClick={handleUpload}
              >
                Analyze Resume
              </button>

              {
                skills.length > 0 && (

                  <div className="mt-5">

                    <h4 className="mb-3">
                      Detected Skills
                    </h4>

                    <div className="d-flex flex-wrap gap-2">

                      {
                        skills.map((skill, index) => (

                          <span
                            key={index}
                            className="badge bg-success p-3"
                          >
                            {skill}
                          </span>
                        ))
                      }

                    </div>

                  </div>
                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeUpload;