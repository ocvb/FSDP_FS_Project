import React, { useState, useEffect } from "react";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    // Fetch facilities data from your API
    fetch("/api/facilities")
      .then((response) => response.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Facilities</h1>
      {facilities.length > 0 ? (
        <ul>
          {facilities.map((facility) => (
            <li key={facility.id}>{facility.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading facilities...</p>
      )}
    </div>
  );
}
