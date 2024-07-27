import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton } from '@mui/material';

interface PopupModalProps {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
    sxBox?: object;
}

export default function PopupModal({
    open,
    handleClose,
    children,
    sxBox,
}: PopupModalProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
        >
            <>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '1px solid #a4a4a4',
                        boxShadow: 24,
                        outline: 'none',
                        py: 4,
                        px: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        ...sxBox,
                    }}
                >
                    <IconButton
                        type='button'
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            color: 'black',
                            cursor: 'pointer',
                        }}
                    >
                        <Close />
                    </IconButton>
                    {children}
                </Box>
            </>
        </Modal>
    );
}
