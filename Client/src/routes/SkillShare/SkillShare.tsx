import { Box, TextField, FormControl, FormGroup, Link } from '@mui/material';
import Button from '@components/Button/CustomButton';

import css from './SkillShare.module.css';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UseAuth } from '@contexts/Auth';
import { SkillShareDataResponse } from '@api/ApiType';

export default function SkillShare() {
    const { data: SkillshareData, refetch: refetchSkillshare } = useQuery({
        queryKey: ['skillshare'],
        queryFn: async () => {
            return (await axios.get<SkillShareDataResponse[]>('/skillshare'))
                .data;
        },
    });

    const maxDescriptionLength = 200;
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState(false);
    const { fetchAuth } = UseAuth();

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

                    {displayForm &&
                        (fetchAuth.isAuthenticated ? (
                            <SkillshareForm
                                refetchSkillshare={refetchSkillshare}
                            />
                        ) : (
                            <Button
                                type='button'
                                text='Sign in to post a request'
                                sx={{
                                    padding: '0.3rem 1.2rem',
                                    backgroundColor: '#5cb794',
                                    color: 'white',
                                    borderRadius: '4rem',
                                    '&:hover': {
                                        backgroundColor: '#52a987',
                                    },
                                }}
                                onClick={() => navigate('/account')}
                            />
                        ))}
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
                        Math.round(SkillshareData.length / 3),
                        Math.round(SkillshareData.length * 2)
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
                                                <Link
                                                    component={'a'}
                                                    href=''
                                                    onClick={() => {
                                                        navigate(
                                                            `/skill-share/${item.id}`
                                                        );
                                                    }}
                                                    underline='hover'
                                                >
                                                    Read more
                                                </Link>
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

interface SkillshareFormProp {
    refetchSkillshare: () => Promise<QueryObserverResult>;
}

function SkillshareForm(props: SkillshareFormProp) {
    const { fetchAuth } = UseAuth();
    const { refetchSkillshare } = props;

    interface MessageState {
        message?: string;
        error?: string;
    }

    const [message, setMessage] = useState<MessageState>({
        message: '',
        error: '',
    });

    const postSkillshare = async (data) => {
        const response = await axios.post(
            'http://localhost:3001/api/skillshare',
            data
        );
        return response;
    };

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
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);

                const formSubmittedData = {
                    title: formData.get('title'),
                    postedBy: formData.get('postedBy'),
                    description: formData.get('description'),
                    category: formData.get('category'),
                };

                postSkillshare(formSubmittedData)
                    .then((res) => {
                        console.log(res);
                        refetchSkillshare().catch(() => {
                            return;
                        });
                        setMessage(() => ({
                            message: 'Your request has been posted!',
                        }));
                    })
                    .catch((err: AxiosError<SkillShareDataResponse>) => {
                        setMessage(() => ({
                            error:
                                err.response?.data.message ??
                                'Please try again..',
                        }));
                    });
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
                        name='postedBy'
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
                        value={fetchAuth.User.username}
                    />
                </div>
                <div style={{ fontSize: '1.1rem' }}>
                    request to help with{' '}
                    <TextField
                        type='text'
                        name='title'
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
                        name='description'
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
                        name='category'
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
                        <option value='Cooking'>Cooking</option>
                        <option value='Baking'>Baking</option>
                        <option value='Gardening'>Gardening</option>
                        <option value='Coding'>Coding</option>
                        <option value='IT'>IT</option>
                        <option value='Art'>Art</option>
                        <option value='Music'>Music</option>
                    </TextField>
                    {'.'}
                </div>
                <p
                    style={{
                        textAlign: 'center',
                        color: message.message?.length ? 'green' : 'red',
                    }}
                >
                    {message.message ?? message.error}
                </p>
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
