require("dotenv").config();

const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3001;
const path = require("path");
const app = express();
// const sql = require("./model");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// sql.sequelize.sync().then(() => {});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
