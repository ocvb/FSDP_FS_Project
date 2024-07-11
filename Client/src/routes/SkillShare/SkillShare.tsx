import {
    Box,
    TextField,
    FormLabel,
    FormControl,
    FormGroup,
} from '@mui/material';
import Button from '@components/Button/CustomButton';

import css from './SkillShare.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SkillShareDataResponse {
    title: string;
    description: string;
    category: string;
    postedBy: string;
    numberOfResponded: number;
}

export default function SkillShare() {
    const { data: SkillshareData } = useQuery({
        queryKey: ['skillshare'],
        queryFn: async () => {
            const r = await axios.get<SkillShareDataResponse[]>(
                'http://localhost:3001/api/skillshare'
            );
            return r.data;
        },
    });
    const maxDescriptionLength = 200;
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState(false);

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
                        <span style={{ color: '#5cb794' }}>learn</span> or{' '}
                        <span style={{ color: '#5cb794' }}>teach</span> or{' '}
                        <span style={{ color: '#5cb794' }}>share</span> with
                        others. <br /> Let us know how we can help you!
                    </h2>
                    <Button
                        type='button'
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
                        onClick={() => setDisplayForm(!displayForm)}
                    />

                    {displayForm && <SkillshareForm />}
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
                    gap={'2rem'}
                    width={'auto'}
                    margin={'0 auto'}
                >
                    {SkillshareData?.slice(
                        Math.round(SkillshareData?.length / 3),
                        Math.round(SkillshareData?.length * 2)
                    ).map((_, rowIndex) => {
                        return (
                            <div className={css.row} key={rowIndex}>
                                {SkillshareData?.slice(
                                    rowIndex * 3,
                                    rowIndex * 3 + 3
                                ).map((item, index) => {
                                    return (
                                        <div className={css.col} key={index}>
                                            <p>
                                                {item.numberOfResponded}{' '}
                                                requested help
                                            </p>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {item.title}
                                                </p>
                                                <p>
                                                    {item.description
                                                        .slice(
                                                            0,
                                                            maxDescriptionLength
                                                        )
                                                        .trim() + '...'}
                                                </p>
                                                <Button
                                                    type='button'
                                                    text='View post...'
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    Posted by {item.postedBy}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    Category: {item.category}
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

function SkillshareForm() {
    return (
        <FormControl
            component='form'
            className={css.skillshareForm}
            sx={{
                flexDirection: 'column',

                gap: '0.5rem',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <FormGroup
                sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    gap: '0.5rem',
                    padding: '2rem',
                    maxWidth: '700px',
                }}
            >
                <div>
                    Hi! My name is{' '}
                    <TextField
                        type='text'
                        placeholder='Name'
                        variant='standard'
                        size='small'
                        autoComplete='off'
                        sx={{
                            width: '100px',
                            '.MuiInput-input ': {
                                paddingTop: '0',
                            },
                        }}
                    />
                </div>
                <div style={{ fontSize: '1.1rem' }}>
                    request to help with{' '}
                    <TextField
                        type='text'
                        placeholder='How to make a cake?'
                        variant='standard'
                        size='small'
                        autoComplete='off'
                        sx={{
                            width: 'auto',
                        }}
                    />
                </div>
                <div>
                    and give a brief description{' '}
                    <TextField
                        type='text'
                        multiline
                        maxRows={2}
                        placeholder='How can we help?'
                        variant='standard'
                        size='small'
                        autoComplete='off'
                    />
                </div>
                <div>
                    in which category{' '}
                    <TextField
                        type='text'
                        placeholder='Category'
                        variant='standard'
                        size='small'
                        autoComplete='off'
                        select
                        SelectProps={{
                            native: true,
                        }}
                        sx={{
                            '& .MuiNativeSelect-standard:focus': {
                                backgroundColor: 'white',
                            },
                        }}
                    >
                        <option value='cooking'>Cooking</option>
                        <option value='baking'>Baking</option>
                        <option value='gardening'>Gardening</option>
                        <option value='coding'>Coding</option>
                        <option value='it'>IT</option>
                        <option value='art'>Art</option>
                        <option value='music'>Music</option>
                    </TextField>
                    {'.'}
                </div>
            </FormGroup>

            <Button
                type='submit'
                text='Submit'
                fullWidth={false}
                sx={{
                    padding: '0.3rem 1.2rem',
                    backgroundColor: '#5cb794',
                    color: 'white',
                    borderRadius: '4rem',
                    width: '120px',
                    '&:hover': {
                        backgroundColor: '#52a987',
                    },
                }}
            />
        </FormControl>
    );
}
