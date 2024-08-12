const express = require('express');
const router = express.Router();
const { SkillShares, UserSkillshareResponse, Users } = require('@models/index');
const { SkillshareValidation } = require('@validations/SkillshareValidation');
const {
    SkillshareViewValidation,
} = require('@validations/SkillshareViewValidation');
const { TokenAuthentication } = require('@src/Middlewares/TokenAuthentication');

// GET route to fetch all skill shares
router.get('/', async (_, res) => {
    try {
        const skillShares = await SkillShares.findAll();

        const updatedResponses = await Promise.all(
            skillShares.map(async (skillShare) => {
                const total = await UserSkillshareResponse.count({
                    where: { skillshareId: skillShare.id },
                });

                return {
                    ...skillShare.toJSON(),
                    numberOfResponded: total,
                };
            })
        );

        return res.status(200).json(updatedResponses);
    } catch (error) {
        console.error('Error fetching skill shares:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to create a new skill share
router.post('/', SkillshareValidation, async (req, res) => {
    const skillShare = await SkillShares.create({
        ...req.validation,
    });
    res.status(201).json(skillShare);
});

router.get('/:skillshareId', async (req, res) => {
    try {
        const { skillshareId } = req.params;
        const skillShare = await SkillShares.findByPk(skillshareId);

        if (!skillShare) {
            return res.status(404).json({
                message: 'Skillshare not found',
            });
        }

        const updatedResponses = {
            ...skillShare.toJSON(),
            numberOfResponded: await UserSkillshareResponse.count({
                where: { skillshareId },
            }),
        };
        console.log(updatedResponses);

        return res.status(200).json(updatedResponses);
    } catch (error) {
        console.error('Error fetching skill shares:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Skillshare Users Response
router.get('/:skillshareId/replies', async (req, res) => {
    const { skillshareId } = req.params;
    const userResponses = await UserSkillshareResponse.findAll({
        where: {
            skillshareId,
        },
    });

    if (!userResponses) {
        return res.status(404).json({
            message: 'No responses found',
        });
    }

    const updatedResponses = await Promise.all(
        userResponses.map(async (response) => {
            const RespondentUserCheck = await Users.findOne({
                where: { id: response.userId },
            });
            return {
                ...response.toJSON(),
                respondentUsername: RespondentUserCheck.username,
            };
        })
    );

    return res.status(200).json(updatedResponses);
});

router.post(
    '/:skillshareId/reply',
    SkillshareViewValidation,
    TokenAuthentication,
    async (req, res) => {
        const { userId, response } = req.body;
        const { skillshareId } = req.params;
        const skillShare = await SkillShares.findByPk(skillshareId);
        console.log(
            `User ${userId} is replying to skillshare ${skillshareId} with content ${response}`
        );

        if (!skillShare) {
            return res.status(404).json({
                message: 'Skillshare not found',
            });
        }

        const r = await UserSkillshareResponse.create({
            userId,
            skillshareId,
            response,
        });

        return res.status(201).json(r);
    }
);

module.exports = router;
