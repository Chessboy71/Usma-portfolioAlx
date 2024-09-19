import { NavBar } from '@/components/NavBar';
import { Heading } from '@/components/ui/Heading';
import ShopHero from './component/ShopHero';
import { ProductSection } from '@/components/ProductSection/ProductSection';
import { Products } from './component/Products';

export default function Shop() {
  return (
    <div>
      <ShopHero />
      <Products />
    </div>
  );
}
