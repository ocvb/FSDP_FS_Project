const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Set up SQLite database with Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

// Define the Course model
const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// Sync database and seed with initial data
sequelize.sync({ force: true }).then(async () => {
    console.log('Database & tables created!');

    await Course.bulkCreate([
        {
            title: 'Health & Wellness',
            description:
                'With our expert beauty tips, not only will you look good, you will feel good as well!',
        },
        {
            title: 'Lifestyle & Leisure',
            description:
                'Embrace the Arts, craft your own leather cardholder, cook up a storm with our celebrity chefs and Trainers or unleash your creativity and find the star in you.',
        },
        {
            title: 'Sports & Fitness',
            description:
                'Conquer air, water, and land while staying up to date with the latest in sports!',
        },
        {
            title: 'Education & Enrichment',
            description:
                "Pique your child's interest with our range of hands-on science courses or improve pronunciation and reading with our phonics courses.",
        },
        {
            title: 'Lifelong Learning',
            description:
                'In the age of evolving technology, you should evolve as well and learn skills that can keep you up with the times.',
        },
    ]);
    console.log('Sample courses created!');
});

// API Endpoints

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new course
app.post('/api/courses', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res
                .status(400)
                .json({ error: 'Title and description are required' });
        }
        const course = await Course.create({ title, description });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3001`);
});
