
import pestControl from "../assets/images/pest_controll.webp";
import Electric from "../assets/images/electrician.webp";
import plumber from "../assets/images/repairing.webp";
import cleaning from "../assets/images/Cleaning.webp";

export default function ClassCleaningService() {

    

  const services = [
    {
      title: "Pest Control",
      desc: "lorem100 ipsum dolor sit amet, consectetur adipiscing elit.",
      img: pestControl,
    },
    {
      title: "Electric Appliance",
      desc: "lorem100 ipsum dolor sit amet, consectetur adipiscing elit.",
      img: Electric,
    },
    {
      title: "Plumbing Services",
      desc: "lorem100 ipsum dolor sit amet, consectetur adipiscing elit.",
      img: plumber,
    },
    {
      title: "Cleaning Services",
      desc: "lorem100 ipsum dolor sit amet, consectetur adipiscing elit.",
      img: cleaning,
    },
  ];
  return (
    
      services.map((service, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <img
            src={service.img}
            alt={service.title}
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.desc}</p>
        </div>
      ))
    
  );
}
