import { Box, Container } from "@mui/material";
import images from "@/assets/Courses/Courses.jpg";
import styles from "./css/Courses.module.css";

export default function Courses() {
    return (
        <Box
            component={Container}
            maxWidth={true}>
            <Container>
                <div styles="position: relative;">
                    <div className={styles.header}>
                        <img src={images} className={styles.img}></img>
                        <div className={styles.header_details}>
                            <h1>Courses</h1>
                            <h2>Ever wanted to learn a new skill or pick up a new hobby?</h2>
                            <h3>Then apply for one of our many courses to upgrade yourself!</h3>
                        </div>
                    </div>
                </div>
            </Container>
        </Box>
    );
}