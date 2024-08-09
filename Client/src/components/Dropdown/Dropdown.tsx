import { forwardRef, memo, useEffect, useState } from 'react';

import styles from './css/Dropdown.module.css';

interface DropdownProps {
    subitems?: {
        href?: string;
        name?: string;
        icon?: React.ReactNode;
        action?: () => void;
    }[];
    dropdown?: boolean;
    onMouseLeave?: React.MouseEventHandler;
    onMouseDown?: React.MouseEventHandler;
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
            ref: React.ForwardedRef<HTMLDivElement>
        ) => {
            const anchorStyle = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '0.5rem',
            };
            const [adjustedStyle, setAdjustedStyle] = useState(style);
            useEffect(() => {
                const checkOverflow = () => {
                    if (ref?.current) {
                        const rect = ref.current.getBoundingClientRect();
                        const isOverflowing =
                            rect.bottom > window.innerHeight ||
                            rect.right > window.innerWidth;

                        if (isOverflowing) {
                            setAdjustedStyle((prevStyle) => ({
                                ...prevStyle,
                                top:
                                    rect.bottom > window.innerHeight
                                        ? 'auto'
                                        : prevStyle.top,
                                bottom:
                                    rect.bottom > window.innerHeight
                                        ? 0
                                        : 'auto',
                                left:
                                    rect.right > window.innerWidth
                                        ? 'auto'
                                        : prevStyle.left,
                                right:
                                    rect.right > window.innerWidth ? 0 : 'auto',
                            }));
                        }
                    }
                };

                checkOverflow();
            }, [dropdown, style, ref]);

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
                            ...adjustedStyle,
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
        }
    )
);

export default Dropdown;
