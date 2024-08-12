import { Modal, Box, Typography, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { redeemReward } from '@api/EndpointsQueries'; // Import the redeem API function
import styles from '../css/RewardDetails.module.css';

interface Reward {
    id: number;
    title: string;
    description: string;
    points: number;
    claimed: boolean;
    popular: boolean;
    endDate?: string;
    imageUrl?: string;
    category?: string;
}

interface RewardDetailsModalProps {
    open: boolean;
    handleClose: () => void;
    reward: Reward | null;
    userId: number; // Add userId to the props to identify the current user
    onRedeemSuccess?: () => void; // Optional callback to trigger when redeeming is successful
}

const RewardDetailsModal: React.FC<RewardDetailsModalProps> = ({
    open,
    handleClose,
    reward,
    userId,
    onRedeemSuccess,
}) => {
    if (!reward) return null;

    const mutation = useMutation(
        () => redeemReward(userId, reward.id), // Mutate by calling the redeem function
        {
            onSuccess: () => {
                if (onRedeemSuccess) onRedeemSuccess(); // Trigger callback if provided
                handleClose(); // Close the modal
                alert('Reward redeemed successfully!');
            },
            onError: (error: any) => {
                console.error('Error redeeming reward:', error);
                alert(
                    'There was an error redeeming the reward. Please try again.'
                );
            },
        }
    );

    const handleRedeemClick = () => {
        mutation.mutate(); // Trigger the redeem mutation
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalBox}>
                <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className={styles.rewardImage}
                />
                <Typography variant='h6'>{reward.title}</Typography>
                <Typography variant='body1'>{reward.description}</Typography>
                <Typography variant='body2'>
                    Points required: {reward.points}
                </Typography>
                <Typography variant='body2'>
                    Ends:{' '}
                    {reward.endDate
                        ? new Date(reward.endDate).toLocaleDateString()
                        : 'N/A'}
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleRedeemClick} // Handle redeem click
                    className={styles.redeemButton}
                    disabled={reward.claimed} // Disable if already claimed
                >
                    {reward.claimed ? 'Already Redeemed' : 'Redeem'}
                </Button>
            </Box>
        </Modal>
    );
};

export default RewardDetailsModal;
