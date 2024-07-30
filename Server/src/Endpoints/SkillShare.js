const express = require('express');
const router = express.Router();
const { SkillShares } = require('@models/index');

router.get('/', async (req, res) => {
    const skillShares = await SkillShares.findAll();
    res.status(200).json(skillShares);
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, postedBy, category, numberOfResponded } =
        req.body;
    const skillShare = await SkillShares.create({
        title,
        description,
        postedBy,
        category,
        numberOfResponded,
    });
    res.status(201).json(skillShare);
});

module.exports = router;
