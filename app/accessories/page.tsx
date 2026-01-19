'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import FilterModal from '@/components/FilterModal';
import SortModal from '@/components/SortModal';
import { products } from '@/lib/data';
import styles from '../products/products.module.css';

// Mapping of query parameters to subcategory names
const subcategoryMap: Record<string, string> = {
  'new': 'New In',
  'cases': 'Cases & Covers',
  'chargers': 'Chargers',
  'cables': 'Cables',
  'stands': 'Stands & Mounts',
  'screen-protectors': 'Screen Protectors',
  'bags': 'Bags & Sleeves',
};

export default function AccessoriesPage() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  // Get active subcategory from URL params
  const filterParam = searchParams.get('filter');
  const typeParam = searchParams.get('type');
  const activeSubcategory = filterParam ? subcategoryMap[filterParam] : typeParam ? subcategoryMap[typeParam] : null;

  // Filter products for accessories category
  const accessoryProducts = products.filter(
    (product) => product.category === 'accessories'
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          {activeSubcategory ? (
            <>
              <Link href="/accessories">Accessories</Link>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.breadcrumbCurrent}>{activeSubcategory}</span>
            </>
          ) : (
            <span className={styles.breadcrumbCurrent}>Accessories</span>
          )}
        </nav>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Accessories</h1>
          <p className={styles.description}>
            Elevate your tech experience with our premium accessories collection. From protective cases to powerful chargers, find everything you need to complement your devices.
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.fullWidthLayout}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button 
                className={styles.toolbarBtn}
                onClick={() => setIsSortOpen(true)}
              >
                <ArrowUpDown size={16} />
                <span>Sort</span>
              </button>
              <button 
                className={styles.toolbarBtn}
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal size={16} />
                <span>Filter</span>
              </button>
            </div>
            <div className={styles.toolbarRight}>
              {accessoryProducts.length} accessories found
            </div>
          </div>

          {/* Products Grid */}
          <div className={styles.grid}>
            {accessoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className={styles.loadMore}>
            <button className={styles.loadMoreBtn}>
              Load More Products
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        itemCount={accessoryProducts.length}
      />

      {/* Sort Modal */}
      <SortModal
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
    </div>
  );
}
