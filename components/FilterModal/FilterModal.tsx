'use client';

import { useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import styles from './FilterModal.module.css';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

const filterCategories = [
  'Category',
  'Product Type',
  'Size',
  'Brand',
  'Style',
  'Colour',
  'Price Range',
];

export default function FilterModal({ isOpen, onClose, itemCount }: FilterModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>FILTER</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filter">
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {filterCategories.map((category) => (
            <button key={category} className={styles.filterItem}>
              <span>{category}</span>
              <ChevronRight size={20} />
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.clearBtn}>CLEAR ALL</button>
          <button className={styles.viewBtn}>VIEW ITEMS</button>
        </div>
      </div>
    </>
  );
}
