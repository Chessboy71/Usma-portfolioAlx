import { Hero } from '@/components/Hero';
import { News } from '@/components/News/News';
import { NextFixtures } from '@/components/NextFixtures/NextFixtures';
import { ToasterProvider } from '../../../providers/toast-provider';
import { Separator } from '@/components/ui/separator';
import { Honours } from '@/components/Honours/Honours';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-mainBlack overflow-x-hidden">
      <ToasterProvider />
      <NavBar />
      <Hero />
      <News />
      {/* <ProductSection /> */}
      <Separator className="w-[90vw] ml-auto opacity-50" />
      <NextFixtures />
      <Separator className="w-[90vw] ml-auto opacity-50" />
      <Honours />
      <ToasterProvider />
      <Footer />
    </div>
  );
}
