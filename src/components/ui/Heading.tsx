interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="m-4 font-pop">
      <h2 className=" font-black text-2xl text-black ">{title}</h2>
      <p className="text-slate-600 text-sm font-semibold">{description}</p>
    </div>
  );
};
