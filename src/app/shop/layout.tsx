import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

export default function shopLayout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
