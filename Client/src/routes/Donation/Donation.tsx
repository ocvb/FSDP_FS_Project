import { useState } from 'react';
import css from './Donation.module.css';

const Donation = () => {
    const [email, setEmail] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [placeholder, setPlaceholder] = useState(true);

    const handleCreditCardChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        setCreditCard(formattedValue);
    };

    const handleFocus = (e) => {
        e.target.setAttribute('placeholder', '');
    };

    const handleBlur = (e) => {
        if (!e.target.value) {
            e.target.setAttribute('placeholder', e.target.name);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:3001/api/donation/payment',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        creditCard,
                        expiryDate,
                        cvv,
                    }),
                }
            );

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
            } else {
                throw new Error('Failed to submit payment details');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='music_10_199'>
            <div className='music_10_200'>
                <div className='music_i10_200_54_247'>
                    <span className='music_i10_200_49_6'>Home</span>
                    <div className='music_i10_200_60_60'></div>
                    <span className='music_i10_200_49_7'>Events</span>
                    <div className='music_i10_200_60_106'></div>
                    <span className='music_i10_200_49_8'>Courses</span>
                    <div className='music_i10_200_137_187'></div>
                    <span className='music_i10_200_137_122'>Rewards</span>
                    <div className='music_i10_200_155_411'></div>
                    <span className='music_i10_200_155_412'>FAQ</span>
                </div>
                <div className='music_i10_200_184_1008'></div>
                <img
                    className='music_i10_200_197_1315'
                    src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45116890428/d3de/bb36/3e79/8a262267604b260d8fe70236f2691efd.png'
                    alt='Image description'
                />
                <img
                    className='music_i10_200_54_91'
                    src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45116888389/e34d/3947/ded0/c8360cd8c098f1cc47fc0fe071b9580f.png'
                    alt='Image description'
                />
            </div>
            <img
                className='music_10_217'
                src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45119918141/bf0c/aab4/a8aa/a91d35b47a709eb9524ecfdb9c0003bb.png'
                alt='Background'
            />
            <div className='music_10_218'>
                <form className='music_10_219' onSubmit={handleSubmit}>
                    <span className='music_10_220'>Payment details</span>
                    <span className='music_10_226'>Email Address</span>
                    <div className='music_10_221'>
                        <input
                            type='email'
                            className='music_10_238'
                            name='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder='user@email.com'
                        />
                    </div>
                    <span className='music_10_227'>Credit Card Number</span>
                    <div className='music_10_222'>
                        <input
                            type='text'
                            className='music_10_240'
                            name='Credit Card Number'
                            value={creditCard}
                            onChange={handleCreditCardChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder='XXXX XXXX XXXX XXXX'
                        />
                    </div>
                    <div className='flexContainer_12_music_10_219'>
                        <span className='music_10_228'>Expiry Date</span>
                        <span className='music_10_236'>CVV</span>
                    </div>
                    <div className='flexContainer_11_music_10_219'>
                        <div className='music_10_224'>
                            <input
                                type='text'
                                className='music_10_245'
                                name='Expiry Date'
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder='MM/YY'
                            />
                        </div>
                        <div className='music_10_225'>
                            <input
                                type='text'
                                className='music_10_246'
                                name='CVV'
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder='XXX'
                            />
                        </div>
                    </div>
                    <div className='flexContainer_13_music_10_219'>
                        <span className='music_10_229'>Subtotal</span>
                        <span className='music_10_230'>$50</span>
                    </div>
                    <div className='flexContainer_14_music_10_219'>
                        <span className='music_10_233'>Platform Fee</span>
                        <span className='music_10_231'>$4</span>
                    </div>
                    <div className='music_10_237'></div>
                    <div className='flexContainer_15_music_10_219'>
                        <span className='music_10_234'>Total Amount</span>
                        <span className='music_10_232'>$54</span>
                    </div>
                    <button className='music_10_223' type='submit'>
                        <span className='music_10_235'>Make Payment</span>
                    </button>
                </form>
            </div>
            <div className='music_10_247'>
                <div className='music_i10_247_184_8523'>
                    <div className='music_i10_247_184_5064'>
                        <img
                            className='music_i10_247_189_1113'
                            src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45118974675/b1a1/3f1d/c024/5e0a70830505477c6327e60a64f3aebd.png'
                            alt='Logo'
                        />
                        <div className='music_i10_247_189_454'>
                            <span className='music_i10_247_189_454_213_1463'>
                                People’s
                                <br />
                                Project
                            </span>
                        </div>
                    </div>
                    <div className='music_i10_247_184_8886'>
                        <div className='music_i10_247_184_6415'>
                            <span className='music_i10_247_184_6416'>
                                People’s Project
                            </span>
                            <div className='music_i10_247_184_7739'>
                                <span className='music_i10_247_184_6417'>
                                    About Us
                                </span>
                                <span className='music_i10_247_184_6418'>
                                    Careers
                                </span>
                                <span className='music_i10_247_184_6420'>
                                    Teams
                                </span>
                                <span className='music_i10_247_184_6419'>
                                    FAQs
                                </span>
                                <span className='music_i10_247_184_6421'>
                                    Contact Us
                                </span>
                            </div>
                        </div>
                        <img
                            className='music_i10_247_189_457'
                            src='https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/45118978849/d3a3/d7a6/b929/337139660607735cb6c22bb66c9a5191.png'
                            alt='Footer Image'
                        />
                    </div>
                </div>
                <span className='music_i10_247_184_8704'>
                    © 2021 All Rights Reserved
                </span>
            </div>
        </div>
    );
};

export default Donation;
