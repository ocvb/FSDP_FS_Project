import images from '@/assets/Courses/Courses.jpg';
import styles from '@/routes/Courses/css/Courses.module.css';


export default function CourseBooking() {
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
        </div>
)};