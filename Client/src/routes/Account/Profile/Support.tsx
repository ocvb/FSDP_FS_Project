import { SupportDataResponse } from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';
import { UseAuth } from '@contexts/Auth';
import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function SupportRequests() {
    const { fetchAuth } = UseAuth();
    const retrieveToken = localStorage.getItem('token');

    const {
        data: supportData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['support-requests'],
        queryFn: async () => {
            const response = await callAPI.post<SupportDataResponse[]>(
                '/user/support',
                {
                    userId: fetchAuth.User.id,
                },
                {
                    headers: { Authorization: `Bearer ${retrieveToken}` },
                }
            );
            return response.data;
        },
    });

    if (isLoading) {
        return <p>Loading support requests...</p>;
    }

    if (isError) {
        return <p>Error fetching support requests: {error.message}</p>;
    }

    if (supportData?.length === 0) {
        return <p>You haven't submitted any support requests yet.</p>;
    }

    return (
        <Stack alignItems={'start'}>
            <p style={{ fontSize: '1rem' }}>Your Support Requests</p>
            <Stack
                flexDirection={'column'}
                gap={'1rem'}
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    position: 'relative',
                }}
            >
                <Stack
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'start'}
                    sx={{
                        fontWeight: '600',
                    }}
                >
                    <Box>Request</Box>
                    <Box>Reply</Box>
                </Stack>

                {supportData?.map((item, index) => (
                    <Stack
                        key={index}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'start'}
                    >
                        <Box>{item.description}</Box>
                        <Box
                            sx={{
                                backgroundColor: item.reply
                                    ? 'rgba(0,255,128,0.2)'
                                    : 'rgba(255,102,102, 0.2)',
                                borderRadius: '0.5rem',
                                padding: '0.2rem 0.7rem',
                            }}
                        >
                            {item.reply || 'No reply yet'}
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}
