'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Spinner } from '@/components/ui';
import styles from './NavigationLoader.module.css';

export default function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    // Listen for route changes
    handleStart();
    
    // Set a timeout to hide loading after a brief moment
    // This ensures the user sees the loader for navigation feedback
    const timer = setTimeout(handleComplete, 300);

    return () => {
      clearTimeout(timer);
      handleComplete();
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className={styles.navigationLoader}>
      <div className={styles.loaderBar}>
        <div className={styles.loaderProgress}></div>
      </div>
    </div>
  );
}