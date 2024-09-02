import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

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
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setFormData({
          email: "",
          password: "",
        });
      } else {
        alert(data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {user ? (
        <div>
          <h2 style={{ textAlign: "center", color: "#61DAFB" }}>
            User Information
          </h2>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              background: "#f0f4f8",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              padding: "20px",
            }}
          >
            <li style={{ marginBottom: "15px" }}>
              <strong>Email:</strong> {user.email}
            </li>
            <li style={{ marginBottom: "15px" }}>
              <strong>Company:</strong> {user.company}
            </li>
            <li style={{ marginBottom: "15px" }}>
              <strong>Location:</strong> {user.location}
            </li>
            <li style={{ marginBottom: "15px" }}>
              <strong>Phone:</strong> {user.phone}
            </li>
          </ul>
          <button
            onClick={handleLogout}
            style={{
              padding: "15px",
              width: "100%",
              background: "#61DAFB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textTransform: "uppercase",
              marginBottom: "100px", // Adjusts margin below the login button
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <div>
          <h2
            style={{
              textAlign: "center",
              color: "#61DAFB",
              fontSize: "2.2rem",
              marginBottom: "20px",
            }}
          >
            Login
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
            <button
              type="submit"
              style={{
                padding: "15px",
                width: "100%",
                background: "#61DAFB",
                color: "Black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                marginBottom: "100px",
              }}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
