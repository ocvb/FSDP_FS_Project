const express = require('express');
const router = express.Router();
const { SkillShares } = require('@models/index');

router.get('/', async (req, res) => {
    const skillShares = await SkillShares.findAll();
    res.status(200).json(skillShares);
});

module.exports = router;
