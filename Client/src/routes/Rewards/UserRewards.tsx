import React, { useEffect, useState } from 'react';
import axios from 'axios';
import headerImage from '@/assets/Rewards/rewards-header.jpg';
import RewardDetailsModal from './Modal/RewardDetails';
import style from './css/UserRewards.module.css';
import CustomButton from '@components/Button/CustomButton';
import Footer from '@components/Footer/Footer';
import { fetchRewards, fetchPopularRewards } from '@api/EndpointsQueries';
import { RewardsDataResponse } from '@api/ApiType';

const UserRewards: React.FC = () => {
    const [rewards, setRewards] = useState<RewardsDataResponse[]>([]);
    const [popularRewards, setPopularRewards] = useState<RewardsDataResponse[]>(
        []
    );
    const [selectedReward, setSelectedReward] =
        useState<RewardsDataResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const categories = [
        'Health & Lifestyle',
        'Food',
        'Education',
        'Entertainment',
        'Shopping',
        'Leisure',
    ];

    useEffect(() => {
        fetchRewardsData();
        fetchPopularRewardsData();
    }, [selectedCategory]);

    const fetchRewardsData = async () => {
        try {
            const rewardsData = await fetchRewards();
            if (selectedCategory) {
                const filteredRewards = rewardsData.filter(
                    (reward) => reward.category === selectedCategory
                );
                setRewards(filteredRewards);
            } else {
                setRewards(rewardsData);
            }
        } catch (error) {
            console.error('Error fetching rewards:', error);
            setRewards([]);
        }
    };

    const fetchPopularRewardsData = async () => {
        try {
            const popularRewardsData = await fetchPopularRewards();
            setPopularRewards(popularRewardsData);
        } catch (error) {
            console.error('Error fetching popular rewards:', error);
            setPopularRewards([]);
        }
    };

    const handleRewardClick = (reward: RewardsDataResponse) => {
        setSelectedReward(reward);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReward(null);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <header className={style.header}>
                <img
                    src={headerImage}
                    className={style.headerImage}
                    alt='Header'
                />
                <div className={style.headerText}>
                    <h1>Rewards</h1>
                    <p>
                        Earn more points to redeem rewards by
                        participating/volunteering!
                    </p>
                </div>
            </header>
            <div className={style.categories}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <section className={style.popularRewards}>
                <h2>Popular</h2>
                <p>Claim them while stocks last!</p>
                <div className={style.rewardsGrid}>
                    {popularRewards.length > 0 ? (
                        popularRewards.map((reward) => (
                            <div
                                key={reward.id}
                                className={style.rewardItem}
                                onClick={() => handleRewardClick(reward)}
                            >
                                <img src={reward.imageUrl} alt={reward.title} />
                                <p>{reward.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>No popular rewards available</p>
                    )}
                </div>
            </section>
            <section className={style.allRewards}>
                <h2>All Rewards</h2>
                <div className={style.rewardsGrid}>
                    {rewards.length > 0 ? (
                        rewards.map((reward) => (
                            <div
                                key={reward.id}
                                className={style.rewardItem}
                                onClick={() => handleRewardClick(reward)}
                            >
                                <img src={reward.imageUrl} alt={reward.title} />
                                <p>{reward.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>No rewards available</p>
                    )}
                </div>
            </section>
            <RewardDetailsModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                reward={selectedReward}
            />
            <Footer />
        </div>
    );
};

export default UserRewards;
