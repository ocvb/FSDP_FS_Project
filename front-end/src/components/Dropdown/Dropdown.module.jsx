import React, { forwardRef } from "react";

import styles from "./css/Dropdown.module.css";


const Dropdown = forwardRef(({ subitems = [], dropdown }, ref) => {
    return (
        <div className={styles.dropdown} ref={ref} style={{
            display: dropdown ? "block" : "none",
            position: "absolute",
        }}>
            <div className={styles.dropdownContent}>
                {subitems.map((item, index) => (
                    <a key={index} className={styles.menuItem} href={item.href}>{item.name}</a>
                ))}
            </div>
        </div>
    );
});

export default Dropdown;