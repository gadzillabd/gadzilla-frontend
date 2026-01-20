'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, CircleUser, Heart, ShoppingBag, Menu, X, Plus, Minus } from 'lucide-react';
import styles from './Header.module.css';

const navigation = [
  { 
    name: 'GADGETS', 
    href: '/gadgets',
    path: '/gadgets',
    subcategories: [
      { name: 'New In', href: '/gadgets?filter=new' },
      { name: 'Audio', href: '/gadgets?type=audio' },
      { name: 'Wearables', href: '/gadgets?type=wearables' },
      { name: 'Smart Home', href: '/gadgets?type=smart-home' },
      { name: 'Gaming', href: '/gadgets?type=gaming' },
      { name: 'Cameras', href: '/gadgets?type=cameras' },
      { name: 'Drones', href: '/gadgets?type=drones' },
    ]
  },
  { 
    name: 'ACCESSORIES', 
    href: '/accessories',
    path: '/accessories',
    subcategories: [
      { name: 'New In', href: '/accessories?filter=new' },
      { name: 'Cases & Covers', href: '/accessories?type=cases' },
      { name: 'Chargers', href: '/accessories?type=chargers' },
      { name: 'Cables', href: '/accessories?type=cables' },
      { name: 'Stands & Mounts', href: '/accessories?type=stands' },
      { name: 'Screen Protectors', href: '/accessories?type=screen-protectors' },
      { name: 'Bags & Sleeves', href: '/accessories?type=bags' },
    ]
  },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build current URL for comparison
  const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

  // Find active navigation item based on current path
  const activeNavItem = navigation.find((item) => pathname?.startsWith(item.path));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when search popup or mobile menu is open
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
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
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  
  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <>
      {/* Main Header */}
      <header className={`${styles.header} ${isHidden ? styles.hidden : ''} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.container}>
          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>GADZILLA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className={styles.navItem}
              >
                <Link 
                  href={item.href} 
                  className={`${styles.navLink} ${pathname?.startsWith(item.path) ? styles.navLinkActive : ''}`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop Only */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for items and brands"
              className={styles.searchInput}
            />
            <button className={styles.searchBtn} aria-label="Search">
              <Search size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Search Icon - Mobile Only */}
            <button
              className={`${styles.actionBtn} ${styles.searchToggle}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            <Link href="/account" className={styles.actionBtn} aria-label="Account">
              <CircleUser size={22} />
            </Link>
            <Link href="/wishlist" className={styles.actionBtn} aria-label="Wishlist">
              <Heart size={22} />
            </Link>
            <Link href="/cart" className={styles.actionBtn} aria-label="Cart">
              <ShoppingBag size={22} />
              <span className={styles.cartBadge}>*</span>
            </Link>
          </div>
        </div>

        {/* Submenu - Shows based on current page */}
        {activeNavItem && (
          <div className={styles.submenuBar}>
            <div className={styles.submenuContainer}>
              {activeNavItem.subcategories.map((sub) => (
                <Link 
                  key={sub.name} 
                  href={sub.href} 
                  className={`${styles.submenuLink} ${currentUrl === sub.href ? styles.submenuLinkActive : ''}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Popup */}
      {isSearchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchPopup}>
            <button
              className={styles.searchCloseBtn}
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={24} />
            </button>
            <div className={styles.searchPopupInput}>
              <input
                type="text"
                placeholder="Search for items and brands"
                autoFocus
              />
              <button className={styles.searchPopupBtn} aria-label="Search">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* Menu Panel */}
        <div className={styles.mobileMenuPanel}>
          {/* Menu Content */}
          <div className={styles.mobileMenuContent}>
            {navigation.map((category) => (
              <div key={category.name} className={styles.mobileMenuCategory}>
                <button
                  className={styles.mobileMenuCategoryHeader}
                  onClick={() => toggleCategory(category.name)}
                  aria-expanded={expandedCategory === category.name}
                >
                  <span className={styles.mobileMenuCategoryText}>{category.name}</span>
                  {expandedCategory === category.name ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
                {expandedCategory === category.name && (
                  <div className={styles.mobileMenuSubcategories}>
                    <Link
                      href={category.href}
                      className={styles.mobileMenuSubcategoryLink}
                      onClick={closeMenu}
                    >
                      View All {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={styles.mobileMenuSubcategoryLink}
                        onClick={closeMenu}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Close Button - positioned outside menu panel */}
        <button
          className={styles.mobileMenuClose}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
}
