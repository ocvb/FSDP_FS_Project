import React from "react";

import mainStyles from "./css/Profile.module.css";
import styles from "./css/Events.module.css";

export default function Events() {
    return (
        <>
            <div className={mainStyles.header} style={{
                padding: "1rem",
                backgroundColor: "#F9F9F9",
                width: "100%",

            }}>
                <p>Events</p>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "1rem",
                width: "100%",
            }}>

            </div>
        </>
    );
}