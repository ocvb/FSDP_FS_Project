import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// components
import Footer from '@components/Footer/Footer';
import CustomButton from '@components/Button/CustomButton';

import enquiryIMG from '@/assets/Support/enquiries.png';
import styles from './css/Support.module.css';

interface FormData {
    location: string;
    urgency: string;
    description: string;
}

const EnquiriesPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        location: '',
        urgency: '',
        description: '',
    });

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            await axios.post('http://localhost:3001/api/enquiries', formData);
            setFormData({ location: '', urgency: '', description: '' });
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div>
            <div className={styles['enquiry-form-container']}>
                <div className={styles['form-section']}>
                    <h2>Is there something you want to inform us about?</h2>
                    <p>(i.e. incidents, repairs, feedback etc.)</p>
                    <form
                        onSubmit={handleSubmit}
                        className={styles['enquiry-form']}
                    >
                        <label>
                            Location
                            <input
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Enter location...'
                                className={styles.input}
                            />
                        </label>
                        <label>
                            Urgency
                            <select
                                name='urgency'
                                value={formData.urgency}
                                onChange={handleChange}
                                className={styles.dropdown}
                            >
                                <option value=''>
                                    Select urgency level...
                                </option>
                                <option value='None'>
                                    None (message, feedback etc.)
                                </option>
                                <option value='Low'>
                                    Low (people are not too affected)
                                </option>
                                <option value='Medium'>
                                    Medium (people are moderately affected)
                                </option>
                                <option value='High'>
                                    High (people are severely affected)
                                </option>
                            </select>
                        </label>
                        <label>
                            Description
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Enter details...'
                                className={styles.textarea}
                            ></textarea>
                        </label>
                        <CustomButton
                            type='submit'
                            text='Submit'
                            className={styles.button}
                        />
                    </form>
                </div>
                <div className={styles['image-container']}>
                    <img src={enquiryIMG} alt='Community Image' />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EnquiriesPage;
