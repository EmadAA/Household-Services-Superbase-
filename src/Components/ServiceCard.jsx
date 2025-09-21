
import Img from "../assets/images/image.png";

export default function ClassCleaningService() {

    

  const services = [
    {
      title: "Medical Facilities",
      desc: "House cleaning services start from only $25/hr",
    },
    {
      title: "Spring Cleaning",
      desc: "Office cleaning services start from only $25/hr",
    },
    {
      title: "Home Cleaning",
      desc: "Professional home cleaning services",
    },
    {
      title: "Office Cleaning",
      desc: "Expert cleaning for your workspace",
    },
  ];
  return (
    
      services.map((service, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <img
            src={Img}
            alt={service.title}
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.desc}</p>
        </div>
      ))
    
  );
}
