import ShopNav from './component/ShopNav';
import ShopFooter from './component/ShopFooter';

export default function shopLayout({ children }) {
  return (
    <div className="overflow-x-hidden bg-white">
      <ShopNav />
      {children}
      <ShopFooter />
    </div>
  );
}
