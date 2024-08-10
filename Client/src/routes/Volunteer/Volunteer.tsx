import { useState } from 'react';
import './Volunteer.module.css';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:3001/api/volunteer/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({ name: '', number: '', email: '' }); // Clear form
            } else {
                alert('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form');
        }
    };

    return (
        <div className='music_120_77'>
            {/* bg img */}
            <img
                className='music_125_96'
                src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45116901770/5823/b995/80b0/4b88f9c238dbfe89635ca4bd48457c3c.png'
                alt='Image description'
            />
            <div className='stacked-bars-container'>
                <span className='stacked-bar'>
                    Connect with people to forge multi-racial harmony and social
                    cohesion, and inculcate a sense of belonging among
                    Singaporeans
                </span>
                <span className='stacked-bar'>
                    Promote neighbourliness and community bonding
                </span>
                <span className='stacked-bar'>
                    Connect the Community
                    <br />
                    * Organise activities to promote community interaction.
                    <br />
                    * Improve community safety and security
                    <br />* Help explain government initiatives
                </span>
                <span className='stacked-bar'>
                    Bond the People
                    <br />
                    * Promote family bonding and values
                    <br />* Promote multi-racial understanding
                </span>
                <span className='stacked-bar'>
                    Help instill a sense of social responsibility among
                    Singaporeans
                </span>
            </div>
            <div className='music_211_1402'>
                <span className='music_211_1403'>Volunteer Here!</span>
                <form onSubmit={handleSubmit}>
                    <div className='music_211_1410'>
                        <span className='music_211_1411'>
                            Name
                            <br />
                        </span>
                        <input
                            className='music_211_1412'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='music_211_1407'>
                        <span className='music_211_1408'>Number</span>
                        <input
                            className='music_211_1409'
                            type='text'
                            name='number'
                            value={formData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='music_211_1404'>
                        <span className='music_211_1405'>Email Address</span>
                        <input
                            className='music_211_1406'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='music_646_1825'>
                        <button className='music_211_1415' type='submit'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Volunteer;
