import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

export default function Analytics() {
    // Sample data
    /*
    Data popularity format:
    name: Badminton Court, booked: 12
    name: Table Tennis, booked: 10
    name: Tennis Court, booked: 4
    name: Squash Court, booked: 20
    name: BBQ Pit, booked: 5
    
    */
    const dataset = [
        { name: 'Badminton Court', code: 'BC', booked: 12 },
        { name: 'Table Tennis', code: 'TT', booked: 10 },
        { name: 'Tennis Court', code: 'TC', booked: 4 },
        { name: 'Squash Court', code: 'SC', booked: 20 },
        { name: 'BBQ Pit', code: 'BBQ', booked: 5 },
        { name: 'Basketball Court', code: 'BBC', booked: 8 },
        { name: 'Swimming Pool', code: 'SP', booked: 15 },
        { name: 'Gym', code: 'GYM', booked: 7 },
    ];
    return (
        <>
            <Box
                sx={{
                    padding: '2rem',
                    width: 'fit-content',
                    borderRadius: '10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <BarChart
                    width={500}
                    height={300}
                    dataset={dataset}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'code',
                            label: 'Facilities',
                            valueFormatter: (value: string, context) =>
                                context.location == 'tick'
                                    ? value
                                    : `${dataset.find((x) => x.code === value)?.name}`,
                        },
                    ]}
                    series={[
                        {
                            label: 'Booked',
                            dataKey: 'booked',
                            valueFormatter: (value) => `${value}`,
                        },
                    ]}
                    colors={[
                        // color: slight dark blue
                        ' #394CFF',
                    ]}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: '2rem',
                    width: 'fit-content',
                    borderRadius: '10px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }}
            >
                <BarChart
                    width={500}
                    height={300}
                    dataset={dataset}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'code',
                            label: 'Facilities',
                            valueFormatter: (value: string, context) =>
                                context.location == 'tick'
                                    ? value
                                    : `${dataset.find((x) => x.code === value)?.name}`,
                        },
                    ]}
                    series={[
                        {
                            label: 'Booked',
                            dataKey: 'booked',
                            valueFormatter: (value) => `${value}`,
                        },
                    ]}
                    colors={[
                        // color: slight dark blue
                        ' #394CFF',
                    ]}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </Box>
        </>
    );
}
