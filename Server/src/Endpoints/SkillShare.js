const express = require('express');
const router = express.Router();
const { SkillShares } = require('@models/index');
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

router.post('/:id', async (req, res) => {
    console.log(req.params);
    const skillShare = await SkillShares.findByPk(req.params.id);
    if (!skillShare) {
        return res.status(404).json({ message: 'Skill share not found' });
    }
    res.status(200).json(skillShare);
});

module.exports = router;
