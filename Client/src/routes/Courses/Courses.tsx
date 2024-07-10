import { Container, Button } from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from './css/Courses.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(
                    'http://localhost:3001/api/courses'
                );
                setCourses(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
                                        component={Link}
                                        to={course.link}
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
