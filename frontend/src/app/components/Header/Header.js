import styles from "./Header.module.css";
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header({title}) {
  return (
    <header className={styles.header}>
      <div className={styles.icons}>
        <SettingsIcon className="fcolor--purple" />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}