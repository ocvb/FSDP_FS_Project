import react, { forwardRef } from "react";

import { Button } from "@mui/material";

const CustomButton = forwardRef(({ className, onClick, type, sx, text, onMouseDown }, ref) => {
    return (
        <Button ref={ref} sx={{
            ...sx,
            // "&:hover": {
            //     backgroundColor: "black",
            //     color: "white",
            // },
            '&:focus': {
                outline: 'none',
            },
        }} className={className} onClick={onClick} type={type} onMouseDown={onMouseDown}>
            {text}
        </Button>
    );
});

export default CustomButton;