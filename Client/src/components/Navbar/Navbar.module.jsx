/* eslint-disable react-hooks/rules-of-hooks */
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
  { name: "Skill-share", href: "/skill-share" },
  { name: "Rewards", href: "/rewards", },
  { name: "Support", href: "/support" },
  { name: "Account", href: "/account" },
];

export default function navbar(props) {
  const [dropdown, setDropdown] = useState(false);
  const [getIndex, setIndex] = useState(0);
  const hoveredRef = useRef(null);
  const hoverButton = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (hoveredRef.current.style.display == "block" && !hoverButton.current.contains(event.target) && !hoveredRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener('mouseover', handler);
    return () => {
      document.removeEventListener('mouseover', handler);
    }

  }, []);

  const onMouseEnter = (index) => {
    setIndex(index);
    setDropdown(true);
  };

  const handlerDropdownOnMouseLeave = () => {
    setDropdown(false);
  }

  return (
    <>
      <AppBar position="fixed" className={styles.navbar} sx={{
        boxShadow: '0px 2px 3px -1px rgba(0,0,0,0.09), 0px 4px 3px 0px rgba(0,0,0,0.05)',
      }} >
        <Toolbar className={styles.toolbar} style={{
          padding: "0 2rem",
        }}>
          <div style={{ flexGrow: 1 }}>
            <a href={navigation[0].href} style={{
              display: "flex",
              alignItems: "center",
            }}>
              <img src={props.imgUrl} width={"45px"} />
            </a>
          </div>
          {navigation.map((item, index) => (
            <div className={styles.buttonWrapper} key={index}>
              <Button
                color="inherit"
                key={index}
                href={item.href}
                aria-expanded={getIndex === index ? "true" : "false"}
                onMouseEnter={() => onMouseEnter(index)}
                ref={hoverButton}
                sx={{
                  minWidth: "fit-content",
                }}
              >
                {item.name}
              </Button>
              {getIndex === index && <Dropdown subitems={item.submenu} dropdown={dropdown} ref={hoveredRef} onMouseLeave={handlerDropdownOnMouseLeave} />}
            </div>
          ))}
          <div style={{ flexGrow: 1 }}></div>
        </Toolbar>
      </AppBar>
    </>
  );
}
