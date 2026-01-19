'use client';

import { X, Check } from 'lucide-react';
import styles from './SortModal.module.css';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' },
];

export default function SortModal({ isOpen, onClose, selectedSort, onSortChange }: SortModalProps) {
  if (!isOpen) return null;

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    onClose();
  };

  const handleClearSort = () => {
    onSortChange('');
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>SORT BY</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close sort">
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.sortItem} ${selectedSort === option.value ? styles.sortItemActive : ''}`}
              onClick={() => handleSortSelect(option.value)}
            >
              <span>{option.label}</span>
              {selectedSort === option.value && <Check size={20} />}
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClearSort}>
            CLEAR SORT
          </button>
        </div>
      </div>
    </>
  );
}
