import React, { useState } from "react";

import { InputAdornment, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordVisibility({ password, handlePassword, sx }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField type={showPassword ? "text" : "password"} value={password} onChange={handlePassword} InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }} sx={{
            ...sx,
            'input': {
                padding: "0.5rem",
                "&:focus": {
                    outline: "none",
                },
            },
        }}></TextField>
    );
}