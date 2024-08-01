import { Modal, Box, Typography, Button } from '@mui/material';
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
}

const RewardDetailsModal: React.FC<RewardDetailsModalProps> = ({
    open,
    handleClose,
    reward,
}) => {
    if (!reward) return null;

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
                    onClick={handleClose}
                    className={styles.redeemButton}
                >
                    Redeem
                </Button>
            </Box>
        </Modal>
    );
};

export default RewardDetailsModal;
