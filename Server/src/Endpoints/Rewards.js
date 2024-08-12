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

// Redeem a reward
router.post('/redeem', async (req, res) => {
    const { userId, rewardId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const reward = await Reward.findByPk(rewardId);

        if (!user || !reward) {
            return res
                .status(404)
                .json({ message: 'User or reward not found' });
        }

        if (user.points < reward.points_required) {
            return res.status(400).json({ message: 'Not enough points' });
        }

        user.points -= reward.points_required;
        await user.save();

        const redeemedReward = await RedeemedReward.create({
            userId: user.id,
            rewardId: reward.id,
            claimed: false,
        });

        res.status(200).json({
            message: 'Reward redeemed successfully',
            redeemedReward,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error redeeming reward', error });
    }
});

// Get redeemed rewards for a user
router.get('/user/:userId/rewards', async (req, res) => {
    const { userId } = req.params;

    try {
        const redeemedRewards = await RedeemedReward.findAll({
            where: { userId },
            include: Reward,
        });
        res.status(200).json(redeemedRewards);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching redeemed rewards',
            error,
        });
    }
});

module.exports = router;
