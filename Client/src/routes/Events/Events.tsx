import { Box, Container, colors } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';

import images from '@assets/Events/event-bg.jpg';

import styles from './css/Events.module.css';

// component
import CustomButton from '@components/Button/CustomButton';
import Footer from '@components/Footer/Footer';
import { useEffect, useState } from 'react';

interface EventDataResponse {
    title?: string;
    description?: string;
    location?: string;
    date?: string;
    price?: number;
    createdAt?: string;
    updatedAt?: string;
}

interface SearchConditionType {
    what?: string;
    where?: string;
    when?: string;
}
export default function Events() {
    const navigate = useNavigate();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [searchCondition, setSearchCondition] = useState({
        what: '',
        where: '',
        when: '',
    } as SearchConditionType);

    const {
        data: eventData,
        isFetching,
        isFetched,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const r = await axios.get<EventDataResponse[]>(
                'http://localhost:3001/api/events'
            );
            return r.data;
        },
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCondition({
            what:
                e.target.name == 'what' ? e.target.value : searchCondition.what,
            when:
                e.target.name == 'when' ? e.target.value : searchCondition.when,
            where:
                e.target.name == 'where'
                    ? e.target.value
                    : searchCondition.where,
        });
    };

    const handleSearch = () => {
        navigate('search', { state: searchCondition });
    };

    useEffect(() => {
        console.log(searchCondition);
    }, [searchCondition]);

    if ((eventData?.length ?? 0) < 0) {
        refetch()
            .then(() => {
                return;
            })
            .catch(() => {
                return "Couldn't fetch data";
            });
    } else {
        return (
            <>
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <div className={styles.header}>
                        <img src={images} className={styles.img}></img>
                        <Stack
                            spacing={2}
                            sx={{
                                position: 'relative',
                                zIndex: '3',
                                color: 'black',
                                background: 'rgb(255, 255, 255)',
                                width: '360px',
                                padding: '2rem 2rem',
                                borderRadius: '5px',
                                left: '20%',
                                top: '20%',
                            }}
                        >
                            <p className={styles.p}>Explore Events</p>
                            <TextField
                                label='What'
                                name='what'
                                // value={searchCondition.what}
                                onChange={handleSearchChange}
                            ></TextField>
                            <TextField
                                label='Where'
                                name='where'
                                onChange={handleSearchChange}
                            ></TextField>
                            <TextField
                                label='When'
                                name='when'
                                onChange={handleSearchChange}
                            ></TextField>
                            <div
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'end',
                                    width: '100%',
                                }}
                            >
                                <CustomButton
                                    type='submit'
                                    text='Search'
                                    onClick={handleSearch}
                                    sx={{
                                        // marginLeft: "auto",
                                        display: 'inline-flex',
                                        marginTop: '10px',
                                        borderRadius: '50px',
                                        width: 'fit-content',
                                        boxShadow:
                                            '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
                                        padding: '0.7rem 2rem',
                                        color: 'white',
                                        backgroundColor: 'rgb(213, 73, 74)',
                                        '&:hover': {
                                            backgroundColor: '#C54243',
                                        },
                                    }}
                                />
                            </div>
                        </Stack>
                    </div>
                    <Container
                        maxWidth={true}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                        }}
                    >
                        <div className={styles.header2}>
                            Up-Coming Events & Facilities
                        </div>
                        <p className={styles.p}>
                            {isError || eventData?.length === 0
                                ? 'There are currently no up-coming events.'
                                : null}
                        </p>
                        <div className={styles.row}>
                            <Carousel
                                autoPlay={false}
                                animation='slide'
                                indicatorIconButtonProps={{
                                    style: {
                                        padding: '5px', // 1
                                    },
                                }}
                                indicatorContainerProps={{
                                    style: {
                                        marginTop: '10px',
                                    },
                                }}
                                sx={{
                                    width: '100vw',
                                    height: '100%',
                                    minHeight: '200px',
                                }}
                            >
                                <div className={styles.carouselItems}>
                                    {!isError &&
                                        eventData
                                            ?.slice(0, 3)
                                            .map((item, index) => (
                                                <div
                                                    className={styles.carcol}
                                                    key={index}
                                                >
                                                    <div>
                                                        <h3
                                                            className={
                                                                styles.h3
                                                            }
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <p className={styles.p}>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <p
                                                        className={
                                                            styles.dateText
                                                        }
                                                    >
                                                        {item.date}
                                                    </p>
                                                </div>
                                            ))}
                                </div>
                                <div className={styles.carouselItems}>
                                    {eventData
                                        ?.slice(3, 6)
                                        .map((item, index) => (
                                            <div
                                                className={styles.carcol}
                                                key={index}
                                            >
                                                <div>
                                                    <h3 className={styles.h3}>
                                                        {item.title}
                                                    </h3>
                                                    <p className={styles.p}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <p className={styles.dateText}>
                                                    {item.date}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                                <div className={styles.carouselItems}>
                                    {eventData
                                        ?.slice(6, 9)
                                        .map((item, index) => (
                                            <div
                                                className={styles.carcol}
                                                key={index}
                                            >
                                                <div>
                                                    <h3 className={styles.h3}>
                                                        {item.title}
                                                    </h3>
                                                    <p className={styles.p}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <p className={styles.dateText}>
                                                    {item.date}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </Carousel>
                        </div>
                        <a href='#target-element'>
                            <CustomButton
                                type='button'
                                text='more Events →'
                                href='#events'
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: '50px',
                                    width: 'fit-content',
                                    boxShadow:
                                        '0px 2px 6px 0px rgba(0, 0, 0, 0.15)',
                                    padding: '0.5rem 2rem',
                                    color: 'black',
                                }}
                            />
                        </a>
                    </Container>

                    <Container
                        id='target-element'
                        maxWidth={false}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                        }}
                    >
                        <div className={styles.header2}>Events</div>
                        <Container
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: matches ? 'column' : 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '2rem',
                                gap: '1rem',
                            }}
                        >
                            <div className={styles.row}>
                                {eventData?.slice(0, 3).map((item, index) => (
                                    <div className={styles.col} key={index}>
                                        <div>
                                            <h3 className={styles.h3}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.p}>
                                                {item.description}
                                            </p>
                                        </div>
                                        <p className={styles.dateText}>
                                            {item.date}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </Container>

                    <Container
                        maxWidth={false}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                        }}
                    >
                        <Container
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: matches ? 'column' : 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '2rem',
                                gap: '1rem',
                            }}
                        >
                            <div className={styles.row}>
                                {eventData?.slice(0, 3).map((item, index) => (
                                    <div className={styles.col} key={index}>
                                        <div>
                                            <h3 className={styles.h3}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.p}>
                                                {item.description}
                                            </p>
                                        </div>
                                        <p className={styles.dateText}>
                                            {item.date}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </Container>
                </div>

                <Footer />
            </>
        );
    }
}
