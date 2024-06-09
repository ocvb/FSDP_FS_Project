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

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username, password } });
  if (user) {
    res.json({ status: "success", data: user });
  } else {
    res.json({ status: "failed" });
  }
});

app.get("/api/events", async (req, res) => {
  const events = await Events.findAll({ raw: true });
  const presetEvents = await Events.bulkCreate([
    {
      title: "Event 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
      location: "Location 1",
      date: new Date(),
      price: 0,
    },
    {
      title: "Event 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
      location: "Location 2",
      date: new Date(),
      price: 0,
    },
    {
      title: "Event 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Purus faucibus ornare suspendisse sed nisi lacus. Pulvinar pellentesque habitant morbi tristique. Congue eu consequat ac felis donec et odio pellentesque. Vitae et leo duis ut diam quam nulla porttitor. Est ullamcorper eget nulla facilisi etiam dignissim. Viverra nam libero justo laoreet sit amet cursus sit. Ullamcorper a lacus vestibulum sed arcu non odio. Odio euismod lacinia at quis risus sed vulputate.",
      location: "Location 3",
      date: new Date(),
      price: 0,
    },
  ]);
  //Load preset data
  // if (events[0] === undefined) {
  //   // call api
  //   presetEvents;
  // }

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
