import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "user") {
      navigate("/");
      return;
    }

    const fetchIssues = async () => {
      try {
        const res = await API.get("/issues/my");
        setIssues(res.data);
      } catch (error) {
        alert("Failed to fetch issues");
      }
    };

    fetchIssues();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>User Dashboard</h2>

        <div className="user-actions">
          <Link to="/report">
            <button className="report-btn">Report Issue</button>
          </Link>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <h3 className="section-title">My Issues</h3>

      {issues.length === 0 ? (
        <p className="empty-text">No issues reported yet.</p>
      ) : (
        <div className="issue-grid">
          {issues.map((issue) => (
            <div className="issue-card" key={issue._id}>
              <h4>{issue.title}</h4>
              <p><b>Category:</b> {issue.category}</p>
              <p><b>Priority:</b> {issue.priority}</p>
              <span className={`status ${issue.status.replace(" ", "-")}`}>
                {issue.status}
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
