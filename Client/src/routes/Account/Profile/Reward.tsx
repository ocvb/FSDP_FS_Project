import { RewardsDataResponse } from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';
import { UseAuth } from '@contexts/Auth';
import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function Rewards() {
    const { fetchAuth } = UseAuth();
    const retrieveToken = localStorage.getItem('token');

    const { data: userData } = useQuery({
        queryKey: ['rewards'],
        queryFn: async () => {
            const response = await callAPI.post<RewardsDataResponse[]>(
                '/user/rewards',
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

    return (
        <Stack alignItems={'start'}>
            <p style={{ fontSize: '1rem' }}>Rewards you have redeemed</p>
            <Stack
                flexDirection={'column'}
                gap={'1rem'}
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    position: 'relative',
                    // margin: '0 auto',
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
                    <Box>Reward</Box>
                    <Box>Status</Box>
                </Stack>

                {userData?.map((item, index) => {
                    return (
                        <Stack
                            key={index}
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                            alignItems={'start'}
                        >
                            <Box>{item.title}</Box>
                            <Box
                                sx={{
                                    backgroundColor:
                                        item.claimed == 1
                                            ? 'rgba(0,255,128,0.2)'
                                            : 'rgba(255,102,102, 0.2)',
                                    borderRadius: '0.5rem',
                                    padding: '0.2rem 0.7rem',
                                }}
                            >
                                {item.claimed == 1 ? 'Claimed' : 'Unclaimed'}
                            </Box>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
}
