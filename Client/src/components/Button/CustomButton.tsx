import { forwardRef } from 'react';

import { Button } from '@mui/material';

type CustomButtonProps = {
    className?: string;
    onClick?: any;
    type?: 'button' | 'submit' | 'reset' | 'text' | 'password';
    sx?: object;
    text: string;
    onMouseDown?: any;
    onMouseLeave?: any;
    onMouseEnter?: any;
    startIcon?: any;
    endIcon?: any;
};

const CustomButton = forwardRef(
    (
        {
            className,
            onClick,
            type,
            sx,
            text,
            onMouseDown,
            onMouseLeave,
            onMouseEnter,
            startIcon,
            endIcon,
        }: CustomButtonProps,
        ref
    ) => {
        return (
            <Button
                ref={ref}
                sx={{
                    // "&:hover": {
                    //     backgroundColor: "black",
                    //     color: "white",
                    // },
                    fontSize: '1.1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    textTransform: 'none',
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:hover': {
                        outline: 'none',
                    },
                    '& .MuiButton-startIcon': {
                        margin: 0,
                    },
                    ...sx,
                }}
                className={className}
                onClick={onClick}
                type={type}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                startIcon={startIcon}
                endIcon={endIcon}
                onMouseLeave={onMouseLeave}>
                {text}
            </Button>
        );
    }
);

export default CustomButton;
