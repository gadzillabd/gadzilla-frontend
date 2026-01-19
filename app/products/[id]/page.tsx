'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Minus, Plus, Truck, RotateCcw, Shield, Star, ChevronLeft } from 'lucide-react';
import { getProductById, products } from '@/lib/data';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/ProductCard';
import styles from './product.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product not found</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
  ];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Back Button (Mobile) */}
        <Link href="/products" className={styles.backBtn}>
          <ChevronLeft size={20} />
          <span>Back</span>
        </Link>

        <div className={styles.productLayout}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image src={img} alt="" fill className={styles.thumbImg} />
                </button>
              ))}
            </div>
            <div className={styles.mainImage}>
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className={styles.productImage}
                priority
              />
              {product.badge && (
                <Badge variant={product.badge} className={styles.badge}>
                  {product.badge === 'sale' ? `-${discount}%` : product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.name}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? '#FFC107' : 'none'}
                    stroke={i < 4 ? '#FFC107' : '#D1D5DB'}
                  />
                ))}
              </div>
              <span className={styles.reviews}>(128 reviews)</span>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="sale">-{discount}%</Badge>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span className={styles.sizeLabel}>Size</span>
                <button className={styles.sizeGuide}>Size Guide</button>
              </div>
              <div className={styles.sizes}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantityControl}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Button size="lg" fullWidth>
                <ShoppingBag size={20} />
                Add to Cart
              </Button>
              <button className={styles.wishlistBtn}>
                <Heart size={24} />
              </button>
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <Truck size={20} />
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className={styles.feature}>
                <RotateCcw size={20} />
                <div>
                  <strong>Easy Returns</strong>
                  <p>30 days return policy</p>
                </div>
              </div>
              <div className={styles.feature}>
                <Shield size={20} />
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure checkout</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.description}>
              <h3>Description</h3>
              <p>
                Experience premium quality with this cutting-edge tech product. Built with
                high-quality components, this item combines innovation with functionality for everyday
                use. Perfect for tech enthusiasts and professionals alike.
              </p>
              <ul>
                <li>Premium quality components</li>
                <li>Advanced features</li>
                <li>Durable construction</li>
                <li>Easy to set up and use</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>You might also like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
