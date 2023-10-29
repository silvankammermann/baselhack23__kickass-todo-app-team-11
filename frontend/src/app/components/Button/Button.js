import styles from './Button.module.css';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';


export default function Button({text, action, icon, ...props}) {
  return (
    <button onClick={action} className={styles.button} {...props}>
      {text}
      {icon === "check" && <CheckRoundedIcon className={styles.icon} />}
      {icon === "arrow" && <EastRoundedIcon className={styles.icon} />}
    </button>
  )
}