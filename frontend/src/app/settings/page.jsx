"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {CircularProgress, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import styles from "./page.module.css";

export default function Settings() {
  const [userData, setUserData] = useState({
    "characteristics": ["Musical", "Extrovert", "Social", "Ambivalent", "Humorous"],
    "lastname": "Doe",
    "name": "John",
    "username": "john_doe"
  });

  const [characteristics, setCharacteristics] = useState([
    "Extrovert",
    "Night-Active",
    "Social",
    "Sportive",
    "Perfectionist",
    "Musical",
    "Humorous",
    "Calm",
    "Ambivalent",
  ]);

  const fetchCharacteristics = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-characteristics");
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCharacteristics(data); // This line sets the fetched data to the userData state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get-user");
      const data = await response.json();
      console.log(response);
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setUserData(data); // This line sets the fetched data to the userData state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // fetchUserData();
    // fetchCharacteristics);
  }, []);

  let isActive = function (tempChar) {
    console.log(tempChar);
    console.log(userData.characteristics);
    return userData.characteristics.includes(tempChar)
  }

  return (
    <>
      <h1 align="center">
        Profile
      </h1>

      {userData ? (
        <>
          <div align={'center'}>
            <Image width={100} height={100} src={"/assets/Kickass-Assets_character-sloth-profile.svg"}
                   alt={"Profile Image"}/>
          </div>

          <>Name: {userData.name}</>

          <Grid container spacing={4}>
            {characteristics.map((characteristic, index) => (
              <Grid item key={index} xs={4}>
                <div
                  className={`${styles.characteristic__box} ${
                    isActive(characteristic) ? styles.characteristic__box__active : ""
                  }`}
                >
                  <span className={styles.characteristic__box__text}>
                    {characteristic}
                  </span>
                </div>

              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <CircularProgress/>
      )}
    </>
  );
}
