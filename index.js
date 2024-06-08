require("dotenv").config();

const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3001;
const path = require("path");
const app = express();
const { db, Users, Events } = require("./model");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  }),
);
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/api/users", async (req, res) => {
  const users = await Users.findAll({ raw: true });
  res.json(users);
});

app.get("/api/events", async (req, res) => {
  const events = await Events.findAll({ raw: true });
  res.json(events);
});

app.post("/api/events", async (req, res) => {
  const { title, description, location, date, price } = req.body;
  const formattedDate = new Date(date);
  // console.log(formattedDate.toLocaleString());
  const event = await Events.create({
    title, description, location, date: formattedDate, price
  });
  res.json(event);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

db.sync()
  .then(() => {
    console.log("Database is ready");
  })
  .catch((error) => {
    console.error("Error:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
