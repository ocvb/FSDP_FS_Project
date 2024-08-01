import { SkillShareDataResponse } from '@api/ApiType';
import { callAPI } from '@api/EndpointsQueries';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export default function SkillShareView() {
    const location = useLocation();
    const getId = location.pathname.split('/')[2];

    const { data: SkillshareData } = useQuery({
        queryKey: ['skillshare'],
        queryFn: async () => {
            const res = await callAPI.post<SkillShareDataResponse>(
                `/skillshare/${getId}`
            );
            return res.data;
        },
    });

    console.log(SkillshareData);

    return (
        <Box>
            <Box>
                <Box>
                    <Box>{SkillshareData?.title}</Box>
                    <Box>{SkillshareData?.description}</Box>
                </Box>

                <Box>
                    <Box>
                        <Box>Hosted by: {SkillshareData?.category}</Box>
                        <Box>Location: {SkillshareData?.postedBy}</Box>
                        <Box>Date: {SkillshareData?.numberOfResponded}</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
