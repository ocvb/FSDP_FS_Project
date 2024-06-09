import react from "react";

import { Button } from "@mui/material";

export default function CustomButton(props) {
    return (
        <Button sx={props.sx} className={props.className} onClick={props.onClick}>
            {props.text}
        </Button>
    );
}