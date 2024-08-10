import {
    SkillShareDataResponse,
    SkillShareRepliesDataResponse,
} from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';
import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TinyMCE from '@components/TinyMCE/TinyMCE';
import CustomButton from '@components/Button/CustomButton';
import { UseAuth } from '@contexts/Auth';
import { AxiosError } from 'axios';

import parse from 'html-react-parser';

export default function SkillShareView() {
    const location = useLocation();
    const getId = location.pathname.split('/')[2];
    const { fetchAuth } = UseAuth();

    interface StatusMessageState {
        message?: string;
        error?: string;
    }

    const [statusMessage, setStatusMessage] = useState<StatusMessageState>({
        message: '',
        error: '',
    });

    const { data: SkillshareData } = useQuery({
        queryKey: ['skillshare'],
        queryFn: async () => {
            const res = await callAPI.get<SkillShareDataResponse>(
                `/skillshare/${getId}`
            );
            return res.data;
        },
    });

    const handlePostReply = () => {
        callAPI
            .post(
                `/skillshare/${getId}/reply`,
                {
                    userResponseContent: editorContent,
                    userId: fetchAuth.User.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${fetchAuth.AccessToken}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if (res.status === 201 || res.status === 200) {
                    setEditorContent('');
                    setStatusMessage(() => ({
                        message: 'Reply posted successfully',
                    }));
                }
            })
            .catch((err: AxiosError<SkillShareRepliesDataResponse>) => {
                setStatusMessage(() => ({
                    error:
                        err.response?.data.message == 'Invalid Token'
                            ? 'Please Login to post a reply'
                            : err.response?.data.message,
                }));
            });
    };

    const { data: SkillshareReplies, refetch: refetchReplies } = useQuery({
        queryKey: ['skillshareReplies'],
        queryFn: async () => {
            const res = await callAPI.get<SkillShareRepliesDataResponse[]>(
                `/skillshare/${getId}/replies`
            );
            return res.data;
        },
    });

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const handleSubmission = () => {
        if (editorContent === '') return;
        handlePostReply();
        refetchReplies().catch((err) => console.log(err));
    };

    return (
        <Stack
            gap={'5rem'}
            width={'1200px'}
            sx={{
                margin: '0 auto',
                marginTop: '5rem',
                marginBottom: '5rem',
            }}
        >
            <Stack alignItems={'start'} gap={'1rem'}>
                <Stack alignItems={'start'}>
                    <h2>{SkillshareData?.title}</h2>

                    <Stack
                        flexDirection={'row'}
                        gap={'1rem'}
                        sx={{
                            color: '#454545',
                        }}
                    >
                        <Box>
                            Date:{' '}
                            {SkillshareData?.createdAt
                                ? new Date(
                                      SkillshareData?.createdAt
                                  ).toDateString()
                                : ''}
                        </Box>
                        <Box>Catergory: {SkillshareData?.category}</Box>
                        {/* <Box>Posted By: {SkillshareData?.postedBy}</Box> */}
                        <Box>
                            Respondents: {SkillshareData?.numberOfResponded}
                        </Box>
                    </Stack>
                </Stack>
                <Box>{SkillshareData?.description}</Box>
            </Stack>

            <Stack>
                <Suspense fallback={<></>}>
                    <Stack alignItems={'start'} gap={'1rem'}>
                        <h3>
                            Reply to{' '}
                            <span
                                style={{
                                    // nice color to display name
                                    color: '#0e0e0e',
                                }}
                            >
                                {SkillshareData?.postedBy}
                            </span>
                        </h3>
                        <TinyMCE
                            value={editorContent}
                            handler={handleEditorChange}
                        />
                        <Stack
                            alignItems={'end'}
                            flexDirection={'column'}
                            sx={{
                                width: '100%',
                            }}
                        >
                            <CustomButton
                                type='button'
                                text={
                                    fetchAuth.isAuthenticated
                                        ? 'Post Reply'
                                        : 'Login to Post Reply'
                                }
                                disabled={
                                    fetchAuth.isAuthenticated != true ||
                                    editorContent === ''
                                        ? true
                                        : false
                                }
                                onClick={handleSubmission}
                                sx={{
                                    width: 'auto',
                                    padding: '0.5rem 1rem',
                                    fontSize: '1rem',
                                    // ligher red
                                    backgroundColor: '#0e0e0e',
                                    color: '#fff',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.26)',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                }}
                            />
                            {statusMessage.message && (
                                <Box
                                    sx={{
                                        color: 'green',
                                        textAlign: 'right',
                                    }}
                                >
                                    {statusMessage.message} <br />
                                    Refresh the page to see your reply
                                </Box>
                            )}
                            {statusMessage.error && (
                                <Box
                                    sx={{
                                        color: 'red',
                                        textAlign: 'right',
                                    }}
                                >
                                    {statusMessage.error}
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                </Suspense>
            </Stack>

            <Stack alignItems={'start'} gap={'1rem'}>
                <h3>Responses</h3>
                {SkillshareReplies?.map((respondent, index) => {
                    return (
                        <Stack
                            key={index}
                            gap={'1rem'}
                            sx={{
                                backgroundColor: '#f5f5f5',
                                padding: '1rem',
                                borderRadius: '5px',
                                width: '100%',
                            }}
                        >
                            <Box>{parse(respondent?.response)}</Box>
                            <Box
                                sx={{
                                    color: 'darkgray',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {respondent?.respondentUsername}
                            </Box>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
}
