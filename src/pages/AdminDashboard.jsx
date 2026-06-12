import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/resume/all"
            );

            setResumes(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (email, status) => {

        try {

            await axios.put(
                `http://localhost:8080/api/resume/status/${email}?status=${status}`
            );

            fetchResumes();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            <h1>Recruiter Dashboard</h1>

            <table border="1">

                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Skills</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        resumes.map((resume) => (

                            <tr key={resume.id}>

                                <td>{resume.email}</td>

                                <td>{resume.skills}</td>

                                <td>{resume.status}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                resume.email,
                                                "Shortlisted"
                                            )
                                        }
                                    >
                                        Shortlist
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                resume.email,
                                                "Rejected"
                                            )
                                        }
                                    >
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default AdminDashboard;