import React, { useEffect, useState } from "react";
import { Container, colors } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!facilities) {
          const response = await axios.get(
            "http://localhost:3001/api/facilities"
          );
          console.log("Data fetched successfully");
          setFacilities(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [facilities]);

  return (
    <>
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
    </>
  );
}
