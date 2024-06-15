import { forwardRef } from "react";

import { Button } from "@mui/material";

const CustomButton = forwardRef(({ className, onClick, type, sx, text, onMouseDown, onMouseLeave, onMouseEnter }, ref) => {
    return (
        <Button ref={ref} sx={{
            // "&:hover": {
            //     backgroundColor: "black",
            //     color: "white",
            // },
            '&:focus': {
                outline: 'none',
            },
            '&:hover': {
                outline: 'none',
            },
            ...sx,
        }} className={className} onClick={onClick} type={type} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {text}
        </Button>
    );
});



export default CustomButton;