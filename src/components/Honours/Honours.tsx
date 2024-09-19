import { HonoursCard } from './HonoursCard';
import ligue1 from '@/../../public/ligue1Pic.jpg';
import caf from '@/../../public/caf.jpg';
import div2 from '@/../../public/div2.jpeg';
import coup from '@/../../public/coup.jpg';
export const Honours = () => {
  return (
    <div className="h-screen ml-[10vw]">
      <h3 className="font-main text-3xl p-6 pb-0 mt-6">Our honours</h3>
      <div className="w-full flex flex-row p-6 flex-wrap">
        <HonoursCard name="Ligue Algerienne" number={8} imgSrc={ligue1} />
        <HonoursCard name="Ligue Division 2" number={4} imgSrc={div2} />
        <HonoursCard name="Coupe D'algerie" number={7} imgSrc={coup} />
        <HonoursCard name="Supercoupe d'Algérie" number={2} imgSrc={ligue1} />
        <HonoursCard
          name="Coupe de la Confideration CAF"
          number={1}
          imgSrc={caf}
        />
      </div>
    </div>
  );
};
