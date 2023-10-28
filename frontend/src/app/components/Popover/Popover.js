import styles from './Popover.module.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useState } from 'react';

export default function Popover({ trigger, children, ...props }) {
  const [open, setOpen] = useState(false);
  const openStyles = {
    transform: "translateY(0)",
  };
  const backgroundActive = {
    opacity: ".5",
  };

  const toggle = () => {
    setOpen(!open);
    console.log("toggle");
  };

  return (
    <div>
      <div 
        style={open ? backgroundActive : {}} 
        className={styles.background}
        onClick={toggle}
      ></div>
      <div onClick={toggle}>
        {trigger}
      </div>
      <div style={open ? openStyles : {}} className={styles.popover}>
        <CancelRoundedIcon
          className={styles.popover__close}
          onClick={toggle}
        />
        <div className={styles.popover__content}>
          {children}
        </div>
      </div>
    </div>
  );
}