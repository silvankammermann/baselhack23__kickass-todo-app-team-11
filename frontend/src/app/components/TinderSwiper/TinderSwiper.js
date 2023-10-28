"use client";

import React, { useState } from "react";
import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";

const TinderSwiper = ({ taksId, taskName }) => {
  return (
    <>
      <div className={styles.cardStack}>
        <TinderCard key="1" className={styles.card}>
          <div className={styles.container}>
            <span className="h1">{taskName}</span>
          </div>
        </TinderCard>
        <TinderCard key="2" className={styles.card}>
          <div className={styles.container}>
            <span className="h1">{taskName}</span>
          </div>
        </TinderCard>
      </div>
      <div className={styles.decissionTriggers}>
        <button className="h2 circle bgRed colorWhite">Later</button>
        <button className="h2 circle bgGreen colorWhite">Yes!</button>
      </div>
    </>
  );
};

export default TinderSwiper;
