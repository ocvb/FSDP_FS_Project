import { CircularProgress } from '@mui/material';



export default function Loading() {
    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '5px',
                backgroundColor: 'white',
            }}>
                <CircularProgress />
            </div>
        </div>
    )
}