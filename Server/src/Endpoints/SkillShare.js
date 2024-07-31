const express = require('express');
const router = express.Router();
const { SkillShares } = require('@models/index');
const { SkillshareSchema } = require('@schema/SkillshareSchema');
const { SkillshareValidation } = require('@validations/SkillshareValidation');

// GET route to fetch all skill shares
router.get('/', async (_, res) => {
    const skillShares = await SkillShares.findAll();
    res.status(200).json(skillShares);
});

// POST route to create a new skill share
router.post('/', SkillshareValidation, async (req, res) => {
    const skillShare = await SkillShares.create({
        ...req.validation,
    });
    res.status(201).json(skillShare);
});

module.exports = router;
