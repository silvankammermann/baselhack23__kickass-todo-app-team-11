import Image from "next/image";
import styles from "./page.module.css";
import TaskRow from "../components/TaskRow/TaskRow";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main__inner}>
        <TaskRow taskName="Learn tinders" />
      </div>
    </main>
  );
}
