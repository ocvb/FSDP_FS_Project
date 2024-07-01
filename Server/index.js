require("dotenv").config();
require('module-alias/register');

const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const { db } = require("@models");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  }),
);


const startAPI = require("@endpoints/Api");
app.use('/api', startAPI);


// Add your API endpoints here
const userAPI = require("@endpoints/Account");
const eventAPI = require("@endpoints/Events");
const adminAPI = require("@endpoints/Admin");

app.use('/api/user', userAPI);
app.use('/api/events', eventAPI);
app.use('/api/admin', adminAPI);




// Don't touch beyond this line
app.get("/", (req, res) => {
  res.send("You have reached the server. Please use the client to view the website.");
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

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
const { db } = require("./model");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);

const startAPI = require("./api/Api");
app.use("/api", startAPI);

// Add your API endpoints here
const userAPI = require("./api/Account");
const eventAPI = require("./api/Events");
const facilitiesAPI = require("./api/Facilities");
const eventsSearchAPI = require("./api/EventsSearch");

app.use("/api/user", userAPI);
app.use("/api/events", eventAPI);
app.use("/api/facilities", facilitiesAPI);
app.use("/api/eventsSearch", eventsSearchAPI);

// Don't touch beyond this line
app.get("/", (req, res) => {
  res.send(
    "You have reached the server. Please use the client to view the website."
  );
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
