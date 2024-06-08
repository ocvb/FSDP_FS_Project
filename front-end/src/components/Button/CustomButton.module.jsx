import react from "react";

import { Button } from "@mui/material";

export default function CustomButton(props) {
    return (
        <Button sx={{
            display: "inline-flex",
            borderRadius: "50px",
            width: "fit-content",
            boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
            padding: "0.5rem 2rem",
        }} className={props.className} onClick={props.onClick}>
            {props.text}
        </Button>
    );
}