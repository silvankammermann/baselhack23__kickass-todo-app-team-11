"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircularProgress, Typography, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';


export default function Settings() {
  const [userData, setUserData] = useState({});
  const [characteristics, setCharacteristics] = useState([]);

  const fetchCharacteristics = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-characteristics");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCharacteristics(data);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-user");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCharacteristics();
  }, []);

  const isActive = (tempChar) => {
    return userData?.characteristics.includes(tempChar);
  };

  return (
    <>
      <h1 className="colorWhite centeredText">Profile</h1>

      {userData.username && characteristics.length > 0 ? (
        <>
          <div style={{ textAlign: "center" }}>
            <Image
              width={100}
              height={100}
              src="/images/sloth-profile.svg"
              alt="Profile Image"
            />
          </div>

          <TextField
            id="outlined-read-only-input"
            label="Name"
            defaultValue={userData.username}
            InputProps={{
              readOnly: true,
            }}
          />

          <Grid container spacing={4}>
            {characteristics.map((characteristic, index) => (
              <Grid item key={index} xs={4}>
                <Image
                  width={400}
                  height={400}
                  src={`/images/${characteristic}${isActive(characteristic) ? "_active" : ""
                    }.png`}
                  alt="Icon"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
