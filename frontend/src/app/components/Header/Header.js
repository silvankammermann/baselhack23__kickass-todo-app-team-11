import styles from "./Header.module.css";
import SettingsIcon from '@mui/icons-material/Settings';
import Image from "next/image";
import Link from "next/link";

export default function Header({ title }) {
  const pbDimenstions = 30

  return (
    <header className={styles.header}>
      <Link href="/settings">
        <div className={styles.profile}>
          <Image
            className={styles.profile__img}
            src="/images/sloth-profile.svg"
            width={pbDimenstions}
            height={pbDimenstions}
            alt="Profile Pic"
          />
          <SettingsIcon className="colorPurple" />
        </div>
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}