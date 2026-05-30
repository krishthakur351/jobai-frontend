import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const job = response.data;

      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setSalary(job.salary);
      setDescription(job.description);
      setSkills(job.skills);

    } catch(error) {

      console.log(error);

      alert("Failed To Fetch Job");
    }
  };

  const handleUpdate = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/jobs/${id}`,
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

      alert("Job Updated Successfully");

      navigate("/dashboard");

    } catch(error) {

      console.log(error);

      alert("Update Failed");
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
                Edit Job
              </h2>

              <input
                type="text"
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <button
                className="btn btn-warning w-100"
                onClick={handleUpdate}
              >
                Update Job
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditJob;