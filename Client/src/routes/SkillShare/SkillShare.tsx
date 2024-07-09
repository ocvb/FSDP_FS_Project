import { Box, colors, Container } from '@mui/material';
import Button from '@components/Button/CustomButton';

import css from './SkillShare.module.css';

export default function SkillShare() {
    const data = [
        {
            title: 'Spanish Tutor Needed for Beginner Lessons',
            description:
                'I am a beginner Spanish learner looking for a patient and experienced tutor to help me improve my language skills.',
            postedBy: 'Alson',
            category: 'Language',
            numberOfRequests: 0,
        },
        {
            title: 'Looking for a Piano Teacher',
            description:
                'I am looking for a piano teacher to help me improve my piano skills. I am a beginner and would like to learn how to play classical music.',
            postedBy: 'John',
            category: 'Music',
            numberOfRequests: 6,
        },
        {
            title: 'Need Help with Math Homework',
            description:
                'I am a high school student looking for a tutor to help me with my math homework. I am struggling with algebra and need someone to explain the concepts to me.',
            postedBy: 'Sarah',
            category: 'Math',
            numberOfRequests: 3,
        },
        {
            title: 'Spanish Tutor Needed for Beginner Lessons',
            description:
                'I am a beginner Spanish learner looking for a patient and experienced tutor to help me improve my language skills.',
            postedBy: 'Alson',
            category: 'Language',
            numberOfRequests: 1,
        },
        {
            title: 'Spanish Tutor Needed for Beginner Lessons',
            description:
                'I am a beginner Spanish learner looking for a patient and experienced tutor to help me improve my language skills.',
            postedBy: 'Alson',
            category: 'Language',
            numberOfRequests: 1,
        },
        {
            title: 'Spanish Tutor Needed for Beginner Lessons',
            description:
                'I am a beginner Spanish learner looking for a patient and experienced tutor to help me improve my language skills.',
            postedBy: 'Alson',
            category: 'Language',
            numberOfRequests: 1,
        },
        {
            title: 'Need Help with Math Homework',
            description:
                'I am a high school student looking for a tutor to help me with my math homework. I am struggling with algebra and need someone to explain the concepts to me.',
            postedBy: 'Sarah',
            category: 'Math',
            numberOfRequests: 3,
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5rem',
                width: '100%',
                marginTop: '2rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3rem',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.1rem',
                    }}
                >
                    <h1 style={{ fontSize: '3rem' }}>
                        Thousands of creative classes!
                    </h1>
                    <p style={{ fontSize: '1.2rem', width: '100%' }}>
                        Explore new skills, deepen existing passions, and get
                        lost in creativity.
                    </p>
                    <p style={{ fontSize: '1.2rem', width: '100%' }}>
                        What you find just might surprise and inspire you.
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.3rem' }}>
                        We are here to help to{' '}
                        <span style={{ color: '#5cb794' }}>learn</span> or to{' '}
                        <span style={{ color: '#5cb794' }}>teach</span> or to{' '}
                        <span style={{ color: '#5cb794' }}>share</span> with
                        others. <br /> Let us know how we can help you!
                    </h2>
                    <Button
                        text='Request skillsets'
                        sx={{
                            padding: '0.3rem 1.2rem',
                            backgroundColor: '#5cb794',
                            color: 'white',
                            borderRadius: '4rem',
                            '&:hover': {
                                backgroundColor: '#52a987',
                            },
                        }}
                    />
                </div>
            </Box>

            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={'1.2rem'}
                width={'100%'}
                padding={'1rem'}
            >
                <h2 style={{ fontSize: '1.7rem', fontWeight: '500' }}>
                    Latest requests
                </h2>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'3rem'}
                    width={'auto'}
                    margin={'0 auto'}
                >
                    {data
                        .slice(
                            Math.round(data.length / 3),
                            Math.round(data.length * 2)
                        )
                        .map((_, rowIndex) => {
                            return (
                                <div className={css.row} key={rowIndex}>
                                    {data
                                        .slice(rowIndex * 3, rowIndex * 3 + 3)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    className={css.col}
                                                    key={index}
                                                >
                                                    <p>
                                                        {item.numberOfRequests}{' '}
                                                        requested help
                                                    </p>
                                                    <div>
                                                        <p
                                                            style={{
                                                                fontWeight:
                                                                    '500',
                                                                fontSize:
                                                                    '1.2rem',
                                                            }}
                                                        >
                                                            {item.title}
                                                        </p>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                        <Button text='View post...' />
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    '1rem',
                                                            }}
                                                        >
                                                            Posted by{' '}
                                                            {item.postedBy}
                                                        </p>
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    '1rem',
                                                            }}
                                                        >
                                                            Category:{' '}
                                                            {item.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                </Box>
            </Box>
        </Box>
    );
}
