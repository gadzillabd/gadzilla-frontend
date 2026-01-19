import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';
import Badge from '@/components/ui/Badge';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: 'sale' | 'new' | 'hot';
  category?: 'gadgets' | 'accessories' | 'audio' | 'wearables';
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <Badge variant={product.badge} className={styles.badge}>
              {product.badge === 'sale' ? `-${discount}%` : product.badge}
            </Badge>
          )}
          <div className={styles.actions}>
            <button className={styles.actionBtn} aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </Link>

      <div className={styles.content}>
        <span className={styles.brand}>{product.brand}</span>
        <Link href={`/products/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
