import GigCard from "../Components/GigCard";

export default function ServiceSlider() {
  const title = "Household Services";
  const subtitle = "Our Services";
  
  return (
    <div className="text-center mt-10 mb-10">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-1 bg-teal-600"></div>
        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider mx-2">
          {title}
        </span>
        <div className="w-16 h-1 bg-teal-600"></div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
        {subtitle}
      </h2>
      <div className="max-w-[1350px] mx-auto text-center">
        <GigCard />
      </div>
    </div>
  );
}