import React, { useState } from 'react';

import { InputAdornment, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function PasswordVisibility({
    password,
    handlePassword,
    sx,
    variant,
    label,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            label={label}
            variant={variant ? variant : 'standard'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            edge='end'
                            sx={{
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{
                ...sx,
                input: {
                    padding: variant === 'outlined' ? '0.5rem' : '4px 0 5px',
                    '&:focus': {
                        outline: 'none',
                    },
                },
            }}
        />
    );
}
