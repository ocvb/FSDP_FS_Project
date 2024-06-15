import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

import styles from "./css/Dropdown.module.css";

const Dropdown = memo(forwardRef(({ subitems = [], dropdown, onMouseLeave }, ref) => {

    return (
        <div
            className={styles.dropdown}
            ref={ref}
            onMouseLeave={onMouseLeave}
            style={{
                display: dropdown ? "block" : "none",
                position: "absolute",
            }}>
            <div className={styles.dropdownContent}>
                {subitems.map((item, index) => (
                    <a key={index} className={styles.menuItem} href={item.href} onClick={item.action} >{item.name}  </a>
                ))}
            </div>
        </div>
    );
}));

Dropdown.displayName = "Dropdown";

Dropdown.propTypes = {
    subitems: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        name: PropTypes.string,
    })),
    dropdown: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
};

export default Dropdown;