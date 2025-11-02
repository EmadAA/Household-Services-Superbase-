
import cleaning from "../assets/images/Cleaning.webp";
import Electric from "../assets/images/electrician.webp";
import pestControl from "../assets/images/pest_controll.webp";
import plumber from "../assets/images/repairing.webp";

export default function ClassCleaningService() {

    

  const services = [
    {
      title: "Pest Control",
      desc: "Professional pest elimination for cockroaches, termites, mosquitoes, and rodents. Safe and effective treatments for a pest-free home.",
      img: pestControl,
    },
    {
      title: "Electric Appliance",
      desc: "Expert electrical services including wiring, repairs, installations, and appliance setup. Safe and reliable solutions.",
      img: Electric,
    },
    {
      title: "Plumbing Services",
      desc: "Skilled plumbing solutions for pipe repairs, installations, and maintenance. Quick and efficient service for your home.",
      img: plumber,
    },
    {
      title: "Cleaning Services",
      desc: "Professional deep cleaning for homes and offices. Carpet, sofa, and bathroom sanitization for spotless spaces.",
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
          <p className="text-gray-600 text-justify">{service.desc}</p>
        </div>
      ))
    
  );
}
