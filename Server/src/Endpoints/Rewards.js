const express = require('express');
const router = express.Router();
const { Rewards } = require('@models/index');
const { TokenAuthentication } = require('@middleware/TokenAuthentication');

// Retrieve all rewards
router.get('/', async (req, res) => {
    try {
        const rewards = await Rewards.findAll();
        res.status(200).json(rewards);
    } catch (error) {
        console.error('Error retrieving rewards:', error);
        res.status(500).json({ message: 'Error retrieving rewards', error });
    }
});

// Retrieve popular rewards
router.get('/popular', async (req, res) => {
    try {
        const popularRewards = await Rewards.findAll({
            where: { popular: true },
        });
        res.status(200).json(popularRewards);
    } catch (error) {
        console.error('Error retrieving popular rewards:', error);
        res.status(500).json({
            message: 'Error retrieving popular rewards',
            error,
        });
    }
});

// Retrieve rewards by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const rewards = await Rewards.findAll({ where: { category } });
        res.status(200).json(rewards);
    } catch (error) {
        console.error('Error retrieving rewards by category:', error);
        res.status(500).json({
            message: 'Error retrieving rewards by category',
            error,
        });
    }
});

// Create a new reward
router.post('/', async (req, res) => {
    const { title, description, points, claimed, popular } = req.body;

    if (!title || !description || !points) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    try {
        const reward = await Rewards.create({
            title,
            description,
            points,
            claimed: claimed || false,
            popular: popular || false,
        });
        if (reward) {
            return res
                .status(201)
                .json({ message: 'Reward created successfully', reward });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: 'Error creating reward', error });
    }
});

// Update a reward
router.put('/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const { title, description, points, claimed, popular } = req.body;

    // Log the data received by the server
    console.log('Data received by the server:', {
        title,
        description,
        points,
        claimed,
        popular,
    });

    if (!title || !description || !points) {
        res.status(400).json({
            message: 'Please provide all the required fields',
        });
        return;
    }

    try {
        const reward = await Rewards.upsert(
            {
                id,
                title,
                description,
                points,
                claimed: claimed || false,
                popular: popular || false,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.status(200).json({
            message: 'Reward updated successfully',
            reward,
        });
    } catch (error) {
        console.error('Error updating reward:', error);
        res.status(500).json({ message: 'Error updating reward', error });
    }
});

// Delete a reward
router.delete('/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    try {
        const reward = await Rewards.findByPk(id);
        if (reward) {
            await reward.destroy();
            res.status(200).json({ message: 'Reward deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reward not found' });
        }
    } catch (error) {
        console.error('Error deleting reward:', error);
        res.status(500).json({ message: 'Error deleting reward', error });
    }
});

module.exports = router;
