const express = require("express");
const router = express.Router();
const { Support } = require("@models/index");

// Retrieve all support requests
router.get("/", async (req, res) => {
  try {
    const supports = await Support.findAll();
    res.status(200).json(supports);
  } catch (error) {
    console.error("Error retrieving support requests:", error);
    res
      .status(500)
      .json({ message: "Error retrieving support requests", error });
  }
});

// Create new support request
router.post('/', async (req, res) => {
    const { location, urgency, description } = req.body;
    console.log('Incoming Request Body:', req.body);
  
    if (!location || !urgency || !description) {
      console.log('Missing required fields:', req.body);
      res.status(400).json({ message: "Please provide all the required fields" });
      return;
    }
  
    try {
      const support = await Support.create({ location, urgency, description });
      res.status(201).json({ message: "Support request created successfully", support });
    } catch (error) {
      console.error('Error creating support request:', error);
      res.status(400).json({ message: "Error creating support request", error });
    }
  });
  

// Update support request
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { location, urgency, description } = req.body;

  if (location == null || urgency == null || description == null) {
    res.status(400).json({ message: "Please provide all the required fields" });
    return;
  }

  try {
      const support = await Support.upsert({
        id,
        location: location,
        urgercy: urgency,
        description: description,
      }, {
        where: {
          id: id
        }
      })
    // const support = await Support.findByPk(id);
    // if (support) {
    //   support.location = location;
    //   support.urgency = urgency;
    //   support.description = description;
    //   await support.save();
      res
        .status(200)
        .json({ message: "Support request updated successfully", support });
  } catch (error) {
    console.error("Error updating support request:", error);
    res.status(500).json({ message: "Error updating support request", error });
  }
});

// Delete support request
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const support = await Support.findByPk(id);
    if (support) {
      await support.destroy();
      res.status(200).json({ message: "Support request deleted successfully" });
    } else {
      res.status(404).json({ message: "Support request not found" });
    }
  } catch (error) {
    console.error("Error deleting support request:", error);
    res.status(500).json({ message: "Error deleting support request", error });
  }
});

module.exports = router;
