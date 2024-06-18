const express = require("express");
const router = express.Router();
const { Events } = require("../model");

// Events APIs
router.get("/api/events", async (req, res) => {
  const events = await Events.findAll({ raw: true });
  res.json(events);
});

router.post("/api/events", async (req, res) => {
  const { title, description, location, date, price } = req.body;
  const formattedDate = new Date(date); // console.log(formattedDate.toLocaleString());
  const event = await Events.create({
    title,
    description,
    location,
    date: formattedDate,
    price,
  });
  res.json(event);
});

// update
router.put("/api/events", async (req, res) => {
  // ... your update logic here ...
});

// delete
router.delete("/api/events", async (req, res) => {
  // ... your delete logic here ...
});

module.exports = router;
