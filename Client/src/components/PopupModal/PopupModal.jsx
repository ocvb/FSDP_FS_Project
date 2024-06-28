
import { Modal, Box } from "@mui/material";

export default function PopupModal({ open, handleClose, children, sxBox }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box sx={{
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
            }} >
                {children}
            </Box>
        </Modal>
    );
}