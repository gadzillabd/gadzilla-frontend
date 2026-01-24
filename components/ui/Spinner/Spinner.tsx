import styles from './Spinner.module.css';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

export default function Spinner({
  size = 'md',
  color = '#ff4444',
  className = '',
}: SpinnerProps) {
  const classes = [
    styles.spinner,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={classes}
      style={{ '--spinner-color': color } as React.CSSProperties}
      aria-label="Loading..."
      role="status"
    >
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}