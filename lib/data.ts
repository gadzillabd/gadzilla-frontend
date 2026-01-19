import { Product } from '@/components/ProductCard';

export const products: Product[] = [];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};

export const getHotDeals = (): Product[] => {
  return products.filter((p) => p.badge === 'sale');
};
