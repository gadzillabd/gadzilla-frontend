import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedProducts.module.css';

interface ProductCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

const productCategories: ProductCategory[] = [];

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Products</h2>
        <div className={styles.grid}>
          {productCategories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={styles.productWrapper}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={styles.categoryCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className={styles.categoryImage}
                  />
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
