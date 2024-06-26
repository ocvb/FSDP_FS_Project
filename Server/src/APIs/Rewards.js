const express = require("express");
const router = express.Router();
const { Rewards } = require("@models/index");
const { TokenAuthentication } = require("@middleware/TokenAuthentication");

// Retrieve all rewards
router.get("/", async (req, res) => {
  try {
    const rewards = await Rewards.findAll();
    res.status(200).json(rewards);
  } catch (error) {
    console.error("Error retrieving rewards:", error);
    res.status(500).json({ message: "Error retrieving rewards", error });
  }
});

// Create a new reward
router.post("/", async (req, res) => {
  const { title, description, points, claimed } = req.body;

  if (!title || !description || !points) {
    res.status(400).json({ message: "Please provide all the required fields" });
    return;
  }
  console.log(req.body)
  const reward = await Rewards.create({
    title: title,
    description: description,
    points: points,
    claimed: claimed || false,
  });
  try {
    if (reward) {
      return res.status(201).json({ message: "Reward created successfully", reward });
    }
  } catch (error) {

    return res.status(400).json({ message: "Error creating reward", error });
  }

});

// Update a reward
router.put("/:id", TokenAuthentication, async (req, res) => {
  const { id } = req.params;
  const { title, description, points, claimed } = req.body;

  if (!title || !description || !points) {
    res.status(400).json({ message: "Please provide all the required fields" });
    return;
  }
  console.log(req.body)
  try {

    const reward = await Rewards.upsert({
      id,
      title: title,
      description: description,
      points: points,
      claimed: claimed || false,
    }, {
      where: {
        id: id
      }
    })
    res.status(200).json({ message: "Reward updated successfully", reward });
    // const reward = await Rewards.findByPk(id);
    // if (reward) {
    //   reward.title = title;
    //   reward.description = description;
    //   reward.points = points;
    //   reward.claimed = claimed !== undefined ? claimed : reward.claimed;
    //   await reward.save();
    //   console.log(reward)
    // } else {
    //   res.status(404).json({ message: "Reward not found" });
    // }
  } catch (error) {
    console.error("Error updating reward:", error);
    res.status(500).json({ message: "Error updating reward", error });
  }
});

// Delete a reward
router.delete("/:id", TokenAuthentication, async (req, res) => {
  const { id } = req.params;
  try {
    const reward = await Rewards.findByPk(id);
    if (reward) {
      await reward.destroy();
      res.status(200).json({ message: "Reward deleted successfully" });
    } else {
      res.status(404).json({ message: "Reward not found" });
    }
  } catch (error) {
    console.error("Error deleting reward:", error);
    res.status(500).json({ message: "Error deleting reward", error });
  }
});

module.exports = router;
