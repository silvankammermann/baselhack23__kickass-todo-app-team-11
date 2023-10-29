"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircularProgress, Typography, Grid } from "@mui/material";
import Input from "../Forms/Input";
import fetchUserData from "@/app/components/Api/UserApi";

export default function Settings() {
  const [userData, setUserData] = useState({
      "username": "john_doe",
      "characteristics": ["extrovert", "night", "sportive", "musical", "calm"]
  });
  const [characteristics, setCharacteristics] = useState([
      "extrovert",
      "night",
      "social",
      "sportive",
      "perfectionist",
      "musical",
      "humorous",
      "calm",
      "ambivalent",
  ]);

  const fetchCharacteristics = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-characteristics`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCharacteristics(data);
    } catch (error) {
      console.error("Error fetching characteristics:", error);
    }
  };

  const isActive = (tempChar) => {
    return userData?.characteristics.includes(tempChar);
  };

  useEffect(() => {
    fetchUserData().then((r) => setUserData(r));
    fetchCharacteristics()
  }, []);

  return (
    <>
      <h1 className="colorWhite centeredText">Profile</h1>

      {userData.username && characteristics.length > 0 ? (
        <>
          <div className="centeredText" style={{marginBottom: '2rem'}}>
            <Image
              width={100}
              height={100}
              src={userData.score >= 5 ? '/images/Kickass_profile-beaver.png' : '/images/Kickass_profile-sloth.png'}
              alt="Profile Image"
            />
          </div>

          <Input
            style={{marginBottom: '2rem'}}
            value={userData.username}
          />

          <Grid container spacing={4}>
            {characteristics.map((characteristic, index) => (
              <Grid item key={index} xs={4}>
                <Image
                  width={400}
                  height={400}
                  src={`/images/${characteristic}${
                    isActive(characteristic) ? "_active" : ""
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
