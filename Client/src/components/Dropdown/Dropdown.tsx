import { forwardRef, memo } from 'react';

import styles from './css/Dropdown.module.css';

interface DropdownProps {
    subitems?: {
        href?: string;
        name?: string;
        icon?: any;
        action?: any;
    }[];
    dropdown?: boolean;
    onMouseLeave?: any;
    onMouseDown?: any;
    style?: object;
    allowHover?: boolean;
}

const Dropdown = memo(
    forwardRef(
        (
            {
                subitems = [],
                dropdown,
                onMouseLeave,
                onMouseDown,
                style,
                allowHover,
            }: DropdownProps,
            ref,
        ) => {
            const anchorStyle = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '0.5rem',
            };

            return (
                <>
                    {!allowHover && dropdown && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                pointerEvents: 'auto',
                                zIndex: 2,
                                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={onMouseLeave}
                        ></div>
                    )}

                    <div
                        className={styles.dropdown}
                        ref={ref}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        style={{
                            display: dropdown ? 'block' : 'none',
                            position: 'absolute',
                            zIndex: 3,
                            fontSize: '1rem',
                            ...style,
                        }}
                    >
                        <div className={styles.dropdownContent}>
                            {subitems.map((item, index) => (
                                <a
                                    key={index}
                                    className={styles.menuItem}
                                    href={item.href}
                                    onMouseDown={item.action}
                                    style={anchorStyle}
                                >
                                    {item.icon} {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            );
        },
    ),
);

export default Dropdown;
