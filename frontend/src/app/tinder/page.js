"use client";

import Image from "next/image";
import styles from "./page.module.css";
import TinderSwiper from "../components/TinderSwiper/TinderSwiper";
import React, { useState } from "react";
import defaultTask from "@/app/testdata/tasks";

export default function Tinder() {
  const [tasks, setTasks] = useState(defaultTask);

  return (
    <>
      <TinderSwiper tasks={tasks} />
    </>
  );
}
