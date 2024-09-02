import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    password: "",
    location: "",
    phone: "",
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
      const response = await fetch("http://localhost:8081/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          email: "",
          company: "",
          password: "",
          location: "",
          phone: "",
        });
      } else {
        alert(data.error || "An error occurred while creating the user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#61DAFB",
          fontSize: "2.2rem",
          marginBottom: "20px",
        }}
      >
        Signup
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#61DAFB",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "2px solid #61DAFB",
              fontSize: "1.1rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#61DAFB",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Company:
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "2px solid #61DAFB",
              fontSize: "1.1rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#61DAFB",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "2px solid #61DAFB",
              fontSize: "1.1rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#61DAFB",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "2px solid #61DAFB",
              fontSize: "1.1rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#61DAFB",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Phone:
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "2px solid #61DAFB",
              fontSize: "1.1rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "15px",
            width: "100%",
            background: "#61DAFB",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textTransform: "uppercase",
            marginBottom: "100px",
          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
