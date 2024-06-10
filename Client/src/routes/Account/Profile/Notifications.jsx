import React from "react";

import mainStyles from "./css/Profile.module.css";
import styles from "./css/Notifications.module.css";

export default function Notifications() {
    return (
        <>
            <div className={mainStyles.header} style={{
                padding: "1rem",
                backgroundColor: "#F9F9F9",
                width: "100%",

            }}>
                <p>Notifications</p>
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