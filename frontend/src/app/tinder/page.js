import Image from "next/image";
import styles from "./page.module.css";
import TinderSwiper from "../components/TinderSwiper/TinderSwiper";

export default function Home() {
  return <>
    <TinderSwiper taskName="This is a swipeable task" />
  </>
}
