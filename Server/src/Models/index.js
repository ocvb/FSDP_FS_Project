const db = require('@models/db');

const Users = require('@models/Users');
const Events = require('@models/Events');
const Facilities = require('@models/Facilities');
const SkillShares = require('@models/SkillShares');
const Courses = require('@models/Courses');
const Support = require('@models/Support');
const Donation = require('@models/Donation');
const Volunteer = require('@models/Volunteer');
const Rewards = require('@models/Rewards');
const UserEvents = require('@models/UserEvents');
const UserRewards = require('@models/UserRewards');
const UserSkillshareResponse = require('@models/UserSkillshareResponse');

// User to Events Relation
Users.belongsToMany(Events, { through: UserEvents, foreignKey: 'userId' });
Events.belongsToMany(Users, { through: UserEvents, foreignKey: 'eventId' });

// User to Rewards Relation
Users.belongsToMany(Rewards, { through: UserRewards, foreignKey: 'userId' });
Rewards.belongsToMany(Users, { through: UserRewards, foreignKey: 'rewardId' });

// User to SkillShares Relation
Users.belongsToMany(SkillShares, {
    through: UserSkillshareResponse,
    foreignKey: 'userId',
});

SkillShares.belongsToMany(Users, {
    through: UserSkillshareResponse,
    foreignKey: 'skillshareId',
});

// Function to remove the unique constraint
async function removeUniqueConstraint() {
    try {
        // Check if the unique constraint exists
        const [results] = await db.query(
            "SHOW INDEX FROM `user_skillshare_responses` WHERE Key_name = 'user_skillshare_responses_skillshareId_userId_unique'"
        );

        if (results.length > 0) {
            // Unique constraint exists, proceed to remove it
            await db.query(
                'ALTER TABLE `user_skillshare_responses` DROP INDEX `user_skillshare_responses_skillshareId_userId_unique`'
            );
            console.log('Unique constraint removed successfully');
        } else {
            console.log('Unique constraint does not exist');
        }
    } catch (error) {
        if (error.errno === '1091') return;

        console.error('Error removing unique constraint', error);
    }
}

module.exports = {
    Users,
    Events,
    UserEvents,
    UserRewards,
    UserSkillshareResponse,
    SkillShares,
    Facilities,
    Courses,
    Support,
    Donation,
    Rewards,
    Volunteer,
    db,
    removeUniqueConstraint,
};
