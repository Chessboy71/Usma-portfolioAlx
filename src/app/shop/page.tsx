import ShopHero from './component/ShopHero';
// import { Products } from './component/Products';
import Featured from './component/Featured';
import ProductSection from './component/ProductSection';
import CategorySection from './component/CategorySection';

export default function Shop() {
  return (
    <div className="">
      <ShopHero />
      <Featured />
      {/* <Products /> */}
      <ProductSection />
      <CategorySection />
    </div>
  );
}
