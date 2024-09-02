import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

function Meeting() {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    reason: "",
    person: "",
    company: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8081/appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          title: "",
          start: "",
          end: "",
          reason: "",
          person: "",
          company: "",
          location: "",
        });
      } else {
        alert(data.error || "An error occurred while creating the user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user");
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    color: "#61DAFB",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#61DAFB",
  };

  const notLoggedInMessageStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#f44336",
    marginTop: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    marginBottom: "15rem",
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={notLoggedInMessageStyle}>
          Only Registered Users Can Create Meetings
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <>
        <h2 style={headingStyle}>Create Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Start:</label>
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>End:</label>
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Reason:</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Person:</label>
            <input
              type="text"
              name="person"
              value={formData.person}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px", width: "100%" }}>
            Create Meeting
          </button>
        </form>
      </>
    </div>
  );
}

export default Meeting;
