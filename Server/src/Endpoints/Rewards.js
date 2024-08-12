const express = require('express');
const router = express.Router();
const { Rewards, UserRewards } = require('@models/index');
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
router.post('/', TokenAuthentication, async (req, res) => {
    const {
        title,
        description,
        points,
        claimed,
        popular,
        endDate,
        imageUrl,
        category,
    } = req.body;

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
            endDate: endDate || null,
            imageUrl: imageUrl || '',
            category: category || '',
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

router.post('/claim', TokenAuthentication, async (req, res) => {
    const { userId, rewardId } = req.body;
    if (!userId || !rewardId) {
        returnres.status(400).json({
            message: 'Please provide all the required fields',
        });
    }

    try {
        const reward = await Rewards.findByPk(rewardId);
        if (reward) {
            const claimed = await reward.update({ claimed: true });
            await UserRewards.create({ userId, rewardId });
            res.status(200).json({
                ...claimed,
                message: 'Reward claimed successfully',
            });
        } else {
            res.status(404).json({ message: 'Reward not found' });
        }
    } catch (error) {
        console.error('Error claiming reward:', error);
        res.status(500).json({ message: 'Error claiming reward', error });
    }
});

// Update a reward
router.put('/:id', TokenAuthentication, async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        points,
        claimed,
        popular,
        endDate,
        imageUrl,
        category,
    } = req.body;

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
                endDate: endDate || null,
                imageUrl: imageUrl || '',
                category: category || '',
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
