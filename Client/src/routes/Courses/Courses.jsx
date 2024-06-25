import { Container } from "@mui/material";
import images from "@/assets/Courses/Courses.jpg";
import styles from "./css/Courses.module.css";
import { useState, useEffect } from "react"; // If you plan to fetch data or manage state

export default function Courses({ events }) {
    // Sample data for tiles. Replace this with props, state, or API call as needed.
    const [courses, setCourses] = useState([
        { title: "Course 1", description: "Description for course 1" },
        { title: "Course 2", description: "Description for course 2" },
        { title: "Course 3", description: "Description for course 3" },
        { title: "Course 4", description: "Description for course 4" },
        { title: "Course 5", description: "Description for course 5" },
        // Add more courses as needed
    ]);

    useEffect(() => {
        // Fetch course data here if not passed as props
        // Example:
        // fetch('/api/courses')
        //   .then(response => response.json())
        //   .then(data => setCourses(data));
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt="Courses" />
                <div className={styles.header_details}>
                    <h1>Courses</h1>
                    <br />
                    <p className={styles.p}>Ever wanted to learn a new skill or pick up a new hobby?</p>
                    <p className={styles.p}>Then apply for one of our many courses to upgrade yourself!</p>
                </div>
            </div>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}>
                <div className={styles.tile}>
                    <h2 className={styles.h2}>These are the courses we offer.</h2>
                    <div className={styles.row}>
                        {courses.map((course, index) => (
                            <div className={styles.col} key={index}>
                                <div className={styles.courseTile}>
                                    <h3 className={styles.h3}>{course.title}</h3>
                                    <p className={styles.p}>{course.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
