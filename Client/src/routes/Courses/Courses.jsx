import { Container } from "@mui/material";
import images from "@/assets/Courses/Courses.jpg";
import styles from "./css/Courses.module.css";

export default function Courses() {

    return (
        <div styles="position: relative;">
            <div className={styles.header}>
                <img src={images} className={styles.img}></img>
                <div className={styles.header_details}>
                    <h1>Courses</h1>
                    <p className={styles.p}>Ever wanted to learn a new skill or pick up a new hobby?</p>
                    <p className={styles.p}>Then apply for one of our many courses to upgrade yourself!</p>
                </div>
            </div>
        </div>
    );
}