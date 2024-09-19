interface NextFixturesCardProps {
  competition: string;
  date: string;
  time: string;
  day: string;
  fixture: string;
  active: boolean;
}

export const NextFixturesCard: React.FC<NextFixturesCardProps> = ({
  competition,
  date,
  time,
  fixture,
  day,
  active,
}) => {
  return (
    <div
      className={
        `h-[80vh] justify-end border-2 border-l-0 border-white basis-[20%] flex flex-col font-pop p-4 pb-8 ` +
        (active ? ` bg-mainRed border-l-2` : null)
      }>
      <h3 className="font-main mb-auto text-3xl text-right ">{competition}</h3>
      <p>{date}</p>
      <p>{time}</p>
      <h4 className=" font-main text-6xl">{day}</h4>
      <p>{fixture}</p>
    </div>
  );
};
