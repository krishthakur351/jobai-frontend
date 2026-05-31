import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {

    try {

      if(!file) {

        alert("Please Select Resume");

        return;
      }

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await axios.post(
          "http://localhost:8080/api/resume/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      setAnalysis(
        response.data
      );

    } catch(error) {

      console.log(error);

      alert(
        "Resume Analysis Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div>

      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

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
                  setFile(
                    e.target.files[0]
                  )
                }
              />

              <button
                className="btn btn-primary w-100"
                onClick={handleUpload}
              >
                Analyze Resume
              </button>

              {
                loading && (

                  <div className="text-center mt-4">

                    <h5>
                      AI is analyzing your resume...
                    </h5>

                  </div>
                )
              }

              {
                analysis && (

                  <div className="mt-5">

                    <h3>
                      Resume Analysis
                    </h3>

                    <div
                      className="border rounded p-4 bg-light"
                      style={{
                        whiteSpace:
                          "pre-wrap"
                      }}
                    >
                      {analysis}
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