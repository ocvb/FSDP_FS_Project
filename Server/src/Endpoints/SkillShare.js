const express = require('express');
const router = express.Router();
const { SkillShares } = require('@models/index');
const { SkillshareSchema } = require('@schema/SkillshareSchema');

// GET route to fetch all skill shares
router.get('/', async (req, res) => {
    const skillShares = await SkillShares.findAll();
    res.status(200).json(skillShares);
});

// POST route to create a new skill share
router.post('/', async (req, res) => {
    SkillshareSchema.validate(req.body)
        .then(async (data) => {
            const skillShare = await SkillShares.create({
                ...data,
            });
            res.status(201).json(skillShare);
        })
        .catch((err) => {
            return res.status(400).json({ message: err.errors[0] });
        });
});

module.exports = router;
