import styles from './SuccessVideo.module.css';

export default function SuccessVideo(src) {
  return (
    <video className={styles.video} autoPlay muted>
      <source src="/videos/success__productive-sloth.mp4" type="video/mp4" />
    </video>
  );
}