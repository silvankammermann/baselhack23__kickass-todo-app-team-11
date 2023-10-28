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
      <div>
        <button>LEFT</button>
        <button>RIGHT</button>
      </div>
    </>
  );
};

export default TinderSwiper;
