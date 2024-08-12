import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

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
    const datasetFacilties = [
        { name: 'Badminton Court', code: 'BC', booked: 12 },
        { name: 'Table Tennis', code: 'TT', booked: 10 },
        { name: 'Tennis Court', code: 'TC', booked: 4 },
        { name: 'Squash Court', code: 'SC', booked: 20 },
        { name: 'BBQ Pit', code: 'BBQ', booked: 5 },
        { name: 'Basketball Court', code: 'BBC', booked: 8 },
        { name: 'Swimming Pool', code: 'SP', booked: 15 },
        { name: 'Gym', code: 'GYM', booked: 7 },
    ];

    const datasetCourse = [
        { name: 'Course 1', code: 'C1', signed: 61 },
        { name: 'Course 2', code: 'C2', signed: 22 },
        { name: 'Course 3', code: 'C3', signed: 71 },
        { name: 'Course 4', code: 'C4', signed: 51 },
        { name: 'Course 5', code: 'C5', signed: 28 },
        { name: 'Course 6', code: 'C6', signed: 53 },
        { name: 'Course 7', code: 'C7', signed: 33 },
        { name: 'Course 8', code: 'C8', signed: 42 },
    ];

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(450);

    // useEffect(() => {
    //     const handleResize = () => {
    //         // console.log(
    //         //     document.querySelector('.presentContent')?.clientWidth - 800
    //         // );
    //         const presentContentWidth =
    //             document.querySelector('.presentContent')?.clientWidth ?? 0;
    //         const newAvailableWidth =
    //             window.innerWidth - presentContentWidth + 500;
    //         if (newAvailableWidth > 0) {
    //             setWidth(newAvailableWidth + 2);
    //         } else if (newAvailableWidth < 100) {
    //             setWidth(newAvailableWidth - 2);
    //         }
    //     };
    //     window.addEventListener('resize', handleResize);

    //     // Cleanup event listener on component unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    interface ToggleYAxis {
        courses?: boolean;
        facilities?: boolean;
    }

    const [toggleYAxis, setToggleYAxis] = useState<ToggleYAxis>({
        courses: true,
        facilities: true,
    });

    return (
        <Stack
            flexDirection={'row'}
            justifyContent={'start'}
            gap={'2rem'}
            padding={'2rem'}
        >
            <Stack
                sx={{
                    padding: '2rem',
                    width: 'fit-content',
                    borderRadius: '1.6rem',
                    boxShadow:
                        'rgba(0, 0, 255, 0.1) 0px 10px 15px -3px, rgba(0, 0, 255, 0.05) 0px 4px 6px -2px',
                }}
            >
                <Stack
                    alignItems={'center'}
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        marginBottom: '1rem',
                    }}
                >
                    Courses
                </Stack>
                <Stack flexDirection={'row'}>
                    <Box
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            onClick={() =>
                                setToggleYAxis((prev) => ({
                                    ...prev,
                                    courses: !toggleYAxis.courses,
                                }))
                            }
                        >
                            Toggle Y Axis
                        </Button>
                    </Box>
                </Stack>
                <BarChart
                    width={width}
                    height={height}
                    dataset={datasetCourse}
                    sx={{
                        '& .MuiChartsAxis-directionY.MuiChartsAxis-left': {
                            display: toggleYAxis.courses ? 'none' : 'block',
                        },
                    }}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'code',
                            label: 'Courses',
                            valueFormatter: (value: string, context) =>
                                context.location == 'tick'
                                    ? value
                                    : `${datasetCourse.find((x) => x.code === value)?.name}`,
                        },
                    ]}
                    series={[
                        {
                            label: 'Signed Up',
                            dataKey: 'signed',
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
            </Stack>

            <Stack
                sx={{
                    padding: '2rem',
                    width: 'fit-content',
                    borderRadius: '1.6rem',
                    boxShadow:
                        'rgba(0, 0, 255, 0.1) 0px 10px 15px -3px, rgba(0, 0, 255, 0.05) 0px 4px 6px -2px',
                }}
            >
                <Stack
                    alignItems={'center'}
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        marginBottom: '1rem',
                    }}
                >
                    Facilities
                </Stack>
                <Stack flexDirection={'row'}>
                    <Box
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            onClick={() =>
                                setToggleYAxis((prev) => ({
                                    ...prev,
                                    facilities: !toggleYAxis.facilities,
                                }))
                            }
                        >
                            Toggle Y Axis
                        </Button>
                    </Box>
                </Stack>
                <BarChart
                    width={width}
                    height={height}
                    dataset={datasetFacilties}
                    sx={{
                        '& .MuiChartsAxis-directionY.MuiChartsAxis-left': {
                            display: toggleYAxis.facilities ? 'none' : 'block',
                        },
                    }}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'code',
                            label: 'Facilities',
                            valueFormatter: (value: string, context) =>
                                context.location == 'tick'
                                    ? value
                                    : `${datasetFacilties.find((x) => x.code === value)?.name}`,
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
            </Stack>
        </Stack>
    );
}
