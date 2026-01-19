'use client';

import styles from './NotificationBanner.module.css';

export default function NotificationBanner() {
  // Repeat the text multiple times for seamless scrolling
  const text = 'SALE: LAST CHANCE';
  const repetitions = 10; // Enough repetitions for smooth infinite scroll

  return (
    <div className={styles.banner}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {Array.from({ length: repetitions }).map((_, index) => (
            <span key={index} className={styles.text}>
              {text}
            </span>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          {Array.from({ length: repetitions }).map((_, index) => (
            <span key={`duplicate-${index}`} className={styles.text}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
