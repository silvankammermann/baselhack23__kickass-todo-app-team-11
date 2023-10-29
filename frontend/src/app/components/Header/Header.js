import styles from "./Header.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import Popover from "@/app/components/Popover/Popover";
import Settings from "@/app/components/Settings/Settings";

export default function Header({ title }) {
  const pbDimenstions = 30;

  return (
    <>
      <header className={styles.header}>
        <Popover
          trigger={
            <div className={styles.profile}>
              <Image
                className={styles.profile__img}
                src="/images/sloth-profile.svg"
                width={pbDimenstions}
                height={pbDimenstions}
                alt="Profile Pic"
              />
              <SettingsIcon className="fcolor--purple" />
            </div>
          }
        >
          <Settings />
        </Popover>

        {title.length > 0 ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <Image
            className={styles.logo}
            width={130}
            height={100}
            src="/images/kickass-logo.svg"
            style={{
              height: "auto",
            }}
            alt="Logo"
          />
        )}
      </header>
    </>
  );
}
