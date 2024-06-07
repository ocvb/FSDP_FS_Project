import react from "react";

import { Button } from "@mui/material";

import Button from "./Button.module.css";

export default function Button(props) {
    return (
        <Button className={props.className} onClick={props.onClick}>
            {props.text}
        </Button>
    );
}