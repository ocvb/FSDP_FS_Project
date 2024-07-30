import { Container, Button } from '@mui/material';
import images from '@/assets/Courses/Courses.jpg';
import styles from '@/routes/Courses/css/Courses.module.css';

export default function LifeLongLearning() {
    return (
        <div style={{ position: 'relative' }}>
            <div className={styles.header}>
                <img src={images} className={styles.img} alt='Courses' />
                <div className={styles.header_details}>
                    <h1>Lifelong Learning</h1>
                    <br />
                    <p className={styles.p}>
                        These are the courses we have available for this category!
                    </p>
                </div>
            </div>
        </div>
    );
}
