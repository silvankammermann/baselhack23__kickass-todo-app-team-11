import styles from './SuccessVideo.module.css';
import Button from '../Button/Button';
import Link from 'next/link';

export default function SuccessVideo({src}) {
  return (
    <>
      <video className={styles.video} autoPlay muted>
        <source src={src} type="video/mp4" />
      </video>
      <Link href="/" className={styles.button}>
        <Button icon="arrow" text="Next one" />
      </Link>
    </>
  );
}