import Link from 'next/link';
import styles from './BrandShowcase.module.css';

interface FeatureCard {
  title: string;
  bgColor: string;
  href: string;
}

interface Brand {
  name: string;
  href: string;
}

const featureCards: FeatureCard[] = [
  {
    title: 'New here? Get your first-timer discount',
    bgColor: '#CCFF00',
    href: '/signup',
  },
  {
    title: 'Download our app for exclusive discounts and the latest drops.',
    bgColor: '#5CE1E6',
    href: '/app',
  },
  {
    title: 'Worldwide delivery',
    bgColor: '#FFB6C1',
    href: '/shipping',
  },
  {
    title: 'Easy returns',
    bgColor: '#00D26A',
    href: '/returns',
  },
];

const accessoriesBrands: Brand[] = [
  { name: 'ANKER', href: '/brands/anker' },
  { name: 'BELKIN', href: '/brands/belkin' },
  { name: 'SPIGEN', href: '/brands/spigen' },
  { name: 'UGREEN', href: '/brands/ugreen' },
];

const gadgetsBrands: Brand[] = [
  { name: 'APPLE', href: '/brands/apple' },
  { name: 'SAMSUNG', href: '/brands/samsung' },
  { name: 'SONY', href: '/brands/sony' },
  { name: 'XIAOMI', href: '/brands/xiaomi' },
];

export default function BrandShowcase() {
  return (
    <section className={styles.section}>
      {/* Feature Banner Cards - Full Width Rectangles */}
      <div className={styles.featureGrid}>
        {featureCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={styles.featureCard}
            style={{ backgroundColor: card.bgColor }}
          >
            <span className={styles.featureText}>{card.title}</span>
          </Link>
        ))}
      </div>

      {/* Top Accessories Brands Section */}
      <div className={styles.container}>
        <h2 className={styles.heading}>Top Accessories Brands</h2>
        <div className={styles.brandGrid}>
          {accessoriesBrands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className={styles.brandCard}
            >
              <span className={styles.brandName}>{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Gadgets Brands Section */}
      <div className={styles.container}>
        <h2 className={styles.heading}>Top Gadgets Brands</h2>
        <div className={styles.brandGrid}>
          {gadgetsBrands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className={styles.brandCard}
            >
              <span className={styles.brandName}>{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
