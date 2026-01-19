'use client';

import { useState, Suspense } from 'react';
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
  'audio': 'Audio',
  'wearables': 'Wearables',
  'smart-home': 'Smart Home',
  'gaming': 'Gaming',
  'cameras': 'Cameras',
  'drones': 'Drones',
};

function GadgetsPageContent() {
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  // Get active subcategory from URL params
  const filterParam = searchParams.get('filter');
  const typeParam = searchParams.get('type');
  const activeSubcategory = filterParam ? subcategoryMap[filterParam] : typeParam ? subcategoryMap[typeParam] : null;

  // Filter products for gadgets category
  const gadgetProducts = products.filter(
    (product) => product.category === 'gadgets' || product.category === 'audio' || product.category === 'wearables'
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
              <Link href="/gadgets">Gadgets</Link>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.breadcrumbCurrent}>{activeSubcategory}</span>
            </>
          ) : (
            <span className={styles.breadcrumbCurrent}>Gadgets</span>
          )}
        </nav>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Gadgets</h1>
          <p className={styles.description}>
            Discover the latest in tech innovation with our curated gadgets collection. From audio gear to smart wearables, find the perfect device to enhance your digital lifestyle.
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
              {gadgetProducts.length} gadgets found
            </div>
          </div>

          {/* Products Grid */}
          <div className={styles.grid}>
            {gadgetProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        itemCount={gadgetProducts.length}
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

export default function GadgetsPage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className={styles.container}>Loading...</div></div>}>
      <GadgetsPageContent />
    </Suspense>
  );
}
