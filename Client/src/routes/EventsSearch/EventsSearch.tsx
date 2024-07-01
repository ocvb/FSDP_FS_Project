import React, { useState, useEffect } from "react";

import styles from "./css/EventsSearch.module.css";

export default function EventsSearch() {
  const [searchedEvents, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events-search")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <p className={styles.header2}>3 Results Found</p>
        <div className={styles.row}>
          <p className={styles.p}>placeholder</p>
        </div>
        <div className={styles.row}>
          <p className={styles.p}>placeholder</p>
        </div>
        <div className={styles.row}>
          <p className={styles.p}>placeholder</p>
        </div>
    </div>
  );
}
