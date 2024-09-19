import { NextFixturesCard } from './NextFixturesCard';

export const NextFixtures = () => {
  return (
    <div className="h-screen ml-[10vw]">
      <h3 className="font-main text-3xl p-6 pb-0 mt-6">
        Join us on the upcoming matches
      </h3>
      <div className="w-full flex flex-row p-6 ">
        <NextFixturesCard
          competition="Confideration Cup"
          date="22 Sep 2024"
          day="22 Sep"
          time="19H00"
          fixture="USMA - Stade Tunisien"
          active={true}
        />
        <NextFixturesCard
          competition="Ligue Algerienne"
          date="27 SEP 2024"
          day="27 Sep"
          time="19H00"
          fixture="USMA - NC Magra"
          active={false}
        />
        <NextFixturesCard
          competition="Confideration Cup"
          date="22 Sep 2024"
          day="22 Sep"
          time="19H00"
          fixture="USMA - Stade Tunisien"
          active={false}
        />
        <NextFixturesCard
          competition="Confideration Cup"
          date="22 Sep 2024"
          day="22 Sep"
          time="19H00"
          fixture="USMA - Stade Tunisien"
          active={false}
        />
        <NextFixturesCard
          competition="Confideration Cup"
          date="22 Sep 2024"
          day="22 Sep"
          time="19H00"
          fixture="USMA - Stade Tunisien"
          active={false}
        />
      </div>
    </div>
  );
};
