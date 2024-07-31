const express = require("express");
const router = express.Router();
const { Facilities } = require("@models/index");
const { TokenAuthentication } = require("@middleware/TokenAuthentication");

router.get("/user", TokenAuthentication, async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        const facilitiesByUserId = await Facilities.findAll({
            where: { userId: userId },
            attributes: ["id", "title", "price"],
        });

        console.log(facilitiesByUserId);
        if (facilitiesByUserId.length > 0) {
            res.status(200).json(facilitiesByUserId);
        } else {
            res.status(404).json({ message: "No events found for this user" });
        }
    } else {
        const facilities = await Facilities.findAll();
        res.status(200).json(facilities);
    }
});

router.get("/", async (req, res) => {
    const facilities = await Facilities.findAll();
    res.status(200).json(facilities);
});

router.post("/api/facilities", async (req, res) => {
    const { title, description, price } = req.body;
    const facility = await Facilities.create({
        title,
        description,
        price,
    });
    res.json(facility);
});

// For the PUT request
router.put("/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    console.log(req.body);

    if (title == "" || description == "" || !(price >= 0)) {
        res.status(400).json({
            message: "Please provide all the required fields",
        });
        return;
    }

    try {
        const facility = await Facilities.upsert(
            {
                id,
                title,
                description,
                price,
            },
            {
                where: { id: id },
            }
        );

        if (facility) {
            res.status(200).json({ message: "Facility updated successfully" });
        } else {
            res.status(400).json({ message: "Facility update failed" });
        }
    } catch (err) {
        console.error("Error updating events", err.message);
        res.status(500).json({
            message: "Facility update failed",
            error: err.message,
        });
    }
});

// For the DELETE request
router.delete("/:id", TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    try {
        const facility = await Facilities.destroy({
            where: { id: id }, // Make sure to use the id from req.params
        });

        if (facility) {
            res.status(200).json({ message: "Facility deleted successfully" });
        } else {
            res.status(404).json({ message: "Facility not found" });
        }
    } catch (err) {
        console.error("Error deleting facilities");
        res.status(500).json({
            message: "Facility deletion failed",
            error: err.message,
        });
    }
});

module.exports = router;
