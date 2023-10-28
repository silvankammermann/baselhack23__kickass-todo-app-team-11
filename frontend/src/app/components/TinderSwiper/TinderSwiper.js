"use client";

import React, { useState } from "react";
import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";

const TinderSwiper = ({ taksId, taskName }) => {
  return (
    <>
      <TinderCard>
        <div className={styles.container}>
          <span className="h1">{taskName}</span>
        </div>
      </TinderCard>
      <div className={styles.decissionTriggers}>
        <button style={className = "h2 circle bgRed colorWhite" > Later</button>
      <button className="h2 circle bgGreen colorWhite">Yes!</button>
    </div >
    </>
  );
};

export default TinderSwiper;
