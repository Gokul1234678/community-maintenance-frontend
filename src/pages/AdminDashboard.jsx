import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        if (!token || role !== "admin") {
            navigate("/");
            return;
        }

        fetchIssues();
    }, [navigate]);

    const fetchIssues = async () => {
        try {
            const res = await API.get("/issues");
            setIssues(res.data);
        } catch (error) {
            alert("Failed to fetch issues");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/issues/${id}`, { status });
            fetchIssues();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <div className="admin-actions">
                    <button onClick={logout}>Logout</button>
                </div>
            </div>

            {issues.length === 0 ? (
                <p className="admin-empty">No issues found.</p>
            ) : (
                <div className="admin-grid">
                    {issues.map((issue) => (
                        <div className="admin-card" key={issue._id}>
                            <h4>{issue.title}</h4>

                            <p><b>Description:</b> {issue.description}</p>
                            <p><b>Category:</b> {issue.category}</p>
                            <p><b>Priority:</b> {issue.priority}</p>

                            <span
                                className={`admin-status ${issue.status.replace(" ", "-")}`}
                            >
                                {issue.status}
                            </span>


                            <p>
                                <b>Reported By:</b>{" "}
                                {issue.createdBy?.name} ({issue.createdBy?.email})
                            </p>

                            <div className="admin-buttons">
                                <button
                                    className="progress-btn"
                                    onClick={() => updateStatus(issue._id, "In Progress")}
                                >
                                    In Progress
                                </button>
                                <button
                                    className="resolve-btn"
                                    onClick={() => updateStatus(issue._id, "Resolved")}
                                >
                                    Resolved
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
