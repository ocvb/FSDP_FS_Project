import { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";


import styles from "./css/Navbar.module.css";

import Dropdown from "../Dropdown/Dropdown.module";


export const navigation = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  {
    name: "Courses", href: "/courses", submenu: [
      { name: "Web Development", href: "/web-dev" }, // menu items test
      { name: "Data Science", href: "/data-science" },
      { name: "Machine Learning", href: "/machine-learning" },
      { name: "Artificial Intelligence", href: "/artificial-intelligence" },
    ]
  },
  { name: "Rewards", href: "/rewards", },
  { name: "Skill-share", href: "/skill-share" },
  { name: "FAQ", href: "/faq" },
  { name: "Account", href: "/account" },
];

export default function navbar(props) {
  const [dropdown, setDropdown] = useState(null);

  const hoveredRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (hoveredRef.current && !hoveredRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const onMouseEnter = (index) => {
    setDropdown(index);
  };

  const onMouseLeave = () => {
    setDropdown(null);
  }

  return (
    <>
      <AppBar position="fixed" className={styles.navbar} >
        <Toolbar className={styles.toolbar}>
          <div style={{ flexGrow: 1 }}>
            <a href={navigation[0].href}>
              <img src={props.imgUrl} width={"45px"} />
            </a>
          </div>
          {navigation.map((item, index) => (
            <div className={styles.buttonWrapper} key={index}>
              <Button
                color="inherit"
                key={index}
                href={item.href}
                aria-expanded={dropdown === index ? "true" : "false"}
                onMouseOver={() => onMouseEnter(index)}
                onMouseDown={onMouseLeave}
                sx={{
                  minWidth: "fit-content",
                }}
              >
                {item.name}
              </Button>
              {dropdown === index && <Dropdown subitems={item.submenu} dropdown={dropdown} ref={hoveredRef} />}
            </div>
          ))}
          <div style={{ flexGrow: 1 }}></div>
        </Toolbar>
      </AppBar>
    </>
  );
}
