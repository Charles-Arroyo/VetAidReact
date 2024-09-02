var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "VETAIDE";
const client = new MongoClient(url);
const db = client.db(dbName);
const multer = require('multer');
const { ObjectId } = require("mongodb");


app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

let users = [
  // Sample user
  {
    email: 'example@example.com',
    password: 'password123',
    company: 'Sample Company',
    location: 'New York',
    phone: '123-456-7890'
  }
];




//USERS

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    console.log("MongoDB connected");
    const results = await db.collection("USERS").find().limit(100).toArray();
    console.log("Query executed", results);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error in GET /users:", err);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

app.post("/users/create", async (req, res) => {
  try {
    const { email, company, password, location, phone } = req.body;

    const existingUser = await db.collection("USERS").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newUser = {
      email,
      company,
      password,
      location,
      phone,
    };

    const result = await db.collection("USERS").insertOne(newUser);
    console.log("New user created successfully");
    res.status(201).json({
      message: "User account created successfully",
      _id: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating new user:", err);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
});


app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const user = await db.collection("USERS").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        company: user.company,
        location: user.location,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "An error occurred while logging in the user" });
  }
});


// User Information - GET

//APPOINTMENTS
app.get("/appointments/:company", async (req, res) => {
  const company = decodeURIComponent(req.params.company);

  if (!company) {
    return res.status(400).json({ error: "Missing company parameter" });
  }

  try {
    await client.connect();
    console.log("MongoDB connected");
    const appointments = await db.collection("APPOINTMENTS").find({ company }).toArray();
    console.log(`Appointments fetched for company: ${company}`, appointments);
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error in GET /appointments/:company:", err);
    res.status(500).json({ error: "An error occurred while fetching appointments" });
  }
});


app.post("/appointments/create", async (req, res) => {
  try {
    const { title, start, end, reason, person, company, location, picture } = req.body;
  
    const newAppointment = {
      title,
      start,
      end,
      reason,
      person,
      company,
      location,
      picture
    };
    const result = await db.collection("APPOINTMENTS").insertOne(newAppointment);
    console.log("New appointment created successfully");
    res.status(201).json({
      message: "Appointment created successfully",
      _id: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating new appointment:", err);
    res.status(500).json({ error: "An error occurred while creating the appointment" });
  }
});




app.put("/updateAppointment/:id", async (req, res) => {
  const id = req.params.id;
  const { start, end } = req.body;

  // Ensure both start and end are provided
  if (!start || !end) {
    return res.status(400).json({
      message: "Missing start or end time",
    });
  }

  try {
    const result = await db.collection("APPOINTMENTS").updateOne(
      { _id: new ObjectId(id) },
      { $set: { start, end } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No appointment found with the provided ID" });
    }

    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({
      error: "An error occurred while updating the appointment",
      details: err.message,
    });
  }
});




app.delete("/appointment/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db
      .collection("APPOINTMENTS")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No appointment found with the provided ID" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({
      error: "An error occurred while deleting the appointment",
      details: err.message,
    });
  }
});



