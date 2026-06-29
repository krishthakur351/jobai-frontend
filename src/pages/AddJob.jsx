import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import api from "../api/axios";

await api.post("/api/jobs", { title, company, location, salary, description, skills });

function AddJob() {

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const handleAddJob = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://jobai-backend-swrv.onrender.com/api/jobs",
        {
          title,
          company,
          location,
          salary,
          description,
          skills
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Job Added Successfully");

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
      setSkills("");

    } catch (error) {

      console.log(error);

      alert("Failed To Add Job");
    }
  };

  return (

    <div>

      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow p-4">

              <h2 className="text-center mb-4">
                Add New Job
              </h2>

              <input
                type="text"
                placeholder="Job Title"
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Company"
                className="form-control mb-3"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <input
                type="text"
                placeholder="Location"
                className="form-control mb-3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                type="number"
                placeholder="Salary"
                className="form-control mb-3"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="form-control mb-3"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Skills"
                className="form-control mb-3"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <button
                className="btn btn-success w-100"
                onClick={handleAddJob}
              >
                Add Job
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddJob;