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
router.put("/api/events/:id", async (req, res) => {
    const eventId = req.params.id;
    const { title, description, location, date, price } = req.body;
  
    try {
      // Find the event to update
      const event = await Events.findByPk(eventId);
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Update event properties with new values (if provided)
      event.title = title || event.title;
      event.description = description || event.description;
      // ... update other properties similarly
  
      // Save the updated event
      await event.save();
  
      // Send response with updated event data
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

// delete
router.delete("/api/events/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    // Find the event to delete
    const event = await Events.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the event
    await event.destroy();

    // Send successful deletion response
    res.status(204).send(); // Or you can send a success message with 200 code
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
