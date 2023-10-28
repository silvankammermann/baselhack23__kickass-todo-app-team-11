import Image from "next/image";
import styles from "./page.module.css";
import TinderSwiper from "../components/TinderSwiper/TinderSwiper";

export default function Tinder() {
  return (
    <>
      <TinderSwiper taskId="123" taskName="Do the laundry" />
    </>
  );
}
