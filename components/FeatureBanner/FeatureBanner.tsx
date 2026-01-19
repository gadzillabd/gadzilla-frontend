import Link from 'next/link';
import styles from './FeatureBanner.module.css';

const features = [
  {
    title: 'New here?',
    subtitle: 'Get your first-timer discount',
    color: 'lime',
    href: '/signup',
  },
  {
    title: 'Download our app',
    subtitle: 'for exclusive discounts and the latest drops.',
    color: 'cyan',
    href: '/apps',
  },
  {
    title: 'Worldwide delivery',
    subtitle: '',
    color: 'pink',
    href: '/delivery',
  },
  {
    title: 'Easy returns',
    subtitle: '',
    color: 'green',
    href: '/returns',
  },
];

export default function FeatureBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className={`${styles.card} ${styles[feature.color]}`}
          >
            <h3 className={styles.title}>{feature.title}</h3>
            {feature.subtitle && (
              <p className={styles.subtitle}>{feature.subtitle}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
