import { Container, Button } from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from './css/Courses.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Courses() {
    const [courses, setCourses] = useState([
        {
            id: 1, // Assuming you have an ID field
            title: 'Health & Wellness',
            path: 'HealthWellness',
            description:
                'With our expert beauty tips, not only will you look good, you will feel good as well!',
        },
        {
            id: 2,
            title: 'Lifestyle & Leisure',
            path: 'LifeLongLeisure',
            description:
                'Embrace the Arts, craft your own leather cardholder, cook up a storm with our celebrity chefs and Trainers or unleash your creativity and find the star in you.',
        },
        {
            id: 3,
            title: 'Sports & Fitness',
            path: 'SportsFitness',
            description:
                'Conquer air, water, and land while staying up to date with the latest in sports!',
        },
        {
            id: 4,
            title: 'Education & Enrichment',
            path: 'EducationEnrichment',
            description:
                "Pique your child's interest with our range of hands-on science courses or improve pronunciation and reading with our phonics courses.",
        },
        {
            id: 5,
            title: 'Lifelong Learning',
            path: 'LifelongLearning',
            description:
                'In the age of evolving technology, you should evolve as well and learn skills that can keep you up with the times.',
        },
        // Add more courses as needed
    ]);

    useEffect(() => {
        async function fetchCourses() {
            const response = await axios.get(
                'http://localhost:3001/api/courses'
            );
            setCourses(response.data);
        }
        fetchCourses();
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt='Courses' />
                <div className={styles.header_details}>
                    <h1>Courses</h1>
                    <br />
                    <p className={styles.p}>
                        Ever wanted to learn a new skill or pick up a new hobby?
                    </p>
                    <p className={styles.p}>
                        Then apply for one of our many courses to upgrade
                        yourself!
                    </p>
                </div>
            </div>
            <Container
                maxWidth={false}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <div className={styles.tile}>
                    <h2 className={styles.h2}>
                        These are the categories of courses we offer.
                    </h2>
                    <br />
                    <div className={styles.row}>
                        {courses.map((course, index) => (
                            <div className={styles.col} key={index}>
                                <div className={styles.courseTile}>
                                    <h3 className={styles.h3}>
                                        {course.title}
                                    </h3>
                                    <p className={styles.p}>
                                        {course.description}
                                    </p>
                                    <Link to={`/courses/${course.path}`}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={styles.Button}
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
