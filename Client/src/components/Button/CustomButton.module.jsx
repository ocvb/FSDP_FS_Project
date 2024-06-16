import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const CustomButton = forwardRef(({ className, onClick, type, sx, text, onMouseDown, onMouseLeave, onMouseEnter, startIcon, endIcon }, ref) => {
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
        }} className={className} onClick={onClick} type={type} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter} startIcon={startIcon} endIcon={endIcon} onMouseLeave={onMouseLeave}>
            {text}
        </Button>
    );
});

CustomButton.displayName = 'CustomButton';

CustomButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    sx: PropTypes.object,
    text: PropTypes.string,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    startIcon: PropTypes.element,
};

export default CustomButton;