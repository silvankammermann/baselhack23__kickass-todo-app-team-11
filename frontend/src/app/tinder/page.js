import Image from "next/image";
import styles from "./page.module.css";
import TinderSwiper from "../components/TinderSwiper/TinderSwiper";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main__inner}>
        <TinderSwiper taskName="This is a swipeable task" />
      </div>
    </main>
  );
}
