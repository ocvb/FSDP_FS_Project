/* eslint-disable react/display-name */
import { ForwardedRef, forwardRef } from 'react';

import { Button } from '@mui/material';

interface CustomButtonProps {
    fullWidth?: boolean;
    className?: string;
    onClick?: (event:React.ChangeEvent | React.MouseEvent) => void;
    type: 'button' | 'submit' | 'reset';
    sx?: object;
    text?: string;
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    ref?: ForwardedRef<HTMLButtonElement>;
    href?: string;
}

const CustomButton = forwardRef(
    (
        {
            fullWidth,
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
            href,
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                fullWidth={fullWidth}
                sx={{
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
                onMouseLeave={onMouseLeave}
                href={href}
            >
                {text}
            </Button>
        );
    }
) as React.FC<CustomButtonProps>;

export default CustomButton;
