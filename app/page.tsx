import Hero from '@/components/Hero';
import BrandShowcase from '@/components/BrandShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import NotificationBanner from '@/components/NotificationBanner';

export default function HomePage() {
  return (
    <>
      <NotificationBanner />
      <Hero />
      <BrandShowcase />
      <FeaturedProducts />
    </>
  );
}
