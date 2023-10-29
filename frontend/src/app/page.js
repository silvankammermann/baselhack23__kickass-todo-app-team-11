"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import TinderSwiper from "@/app/components/TinderSwiper/TinderSwiper";

import defaultTasks from "./testdata/tasks.js";

export default function Home() {
  const [tasks, setTasks] = useState(defaultTasks);

  return (
    <>
      <TinderSwiper tasks={tasks} />
    </>
  );
}
