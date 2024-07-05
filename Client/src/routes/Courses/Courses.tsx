import { Container, Button } from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from './css/Courses.module.css';
import { useState, useEffect } from 'react';

export default function Courses() {
    const [courses, setCourses] = useState([
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
        // Add more courses as needed
    ]);

    useEffect(() => {}, []);

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
                    <br></br>
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
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={styles.Button}
                                    >
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
