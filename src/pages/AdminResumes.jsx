import { useEffect, useState } from "react";
import axios from "axios";

function AdminResumes() {

    const [resumes, setResumes] =
        useState([]);

    useEffect(() => {

        axios
            .get(
                "http://localhost:8080/api/resume/all"
            )
            .then((res) => {

                setResumes(res.data);

            });

    }, []);

    return (

        <div className="container mt-5">

            <h2>
                Resume Dashboard
            </h2>

            <table className="table">

                <thead>

                    <tr>

                        <th>Email</th>

                        <th>Skills</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        resumes.map((resume) => (

                            <tr key={resume.id}>

                                <td>
                                    {resume.email}
                                </td>

                                <td>
                                    {resume.skills}
                                </td>

                                <td>
                                    {resume.status}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default AdminResumes;