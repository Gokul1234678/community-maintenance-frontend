import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./ReportIssue.css";

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/issues", {
        title,
        description,
        category,
        priority,
      });

      alert("Issue reported successfully");
      navigate("/user");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to report issue");
    }
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <h2>Report New Issue</h2>

        <form className="report-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category (Road, Water, Electricity...)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button type="submit" className="submit-btn">
            Submit Issue
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/user")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ReportIssue;
