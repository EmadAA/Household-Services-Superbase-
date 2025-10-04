import { HiHome } from "react-icons/hi";
import AC_Service from "../assets/images/AC_Servicing.webp";
import Carpenter from "../assets/images/carpenter.webp";
import Cleaning from "../assets/images/Cleaning.webp";
import Electrician from "../assets/images/electrician.webp";
import Pest_Control from "../assets/images/pest_controll.webp";
import Repairing from "../assets/images/repairing.webp";
import CustomSlider from "./CustomSlider";
export default function GigCard() {
  const gigDetails = [
    {
      title: "Home Cleaning",
      category: "Cleaning",
      desc: "Deep clean for your house",
      img: Cleaning,
    },
    {
      title: "Plumbing Repair",
      category: "Repair",
      desc: "Fix leaks and pipes",
      img: Repairing,
    },
    {
      title: "Electrical Work",
      category: "Electric",
      desc: "Safe wiring & installation",
      img: Electrician,
    },
    {
      title: "AC Service",
      category: "Appliance",
      desc: "Cooling system maintenance",
      img: AC_Service,
    },
    {
      title: "Pest Control",
      category: "Safety",
      desc: "Eliminate bugs and rodents",
      img: Pest_Control,
    },
    {
      title: "Interior Painting",
      category: "Renovation",
      desc: "Fresh look for your walls",
      img: Carpenter,
    },
  ];

  return (
    <div className="mt-10 ">
      <div className="px-5 my-5">
        <CustomSlider autoplay={true} autoplaySpeed={3000}>
          {gigDetails.map((gig, index) => (
            <div key={index} className="outline-none text-left h-full">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img
                  src={gig.img}
                  alt={gig.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-teal-600 font-medium">
                      {gig.category}
                    </h3>
                    <h2 className="font-semibold">{gig.title}</h2>
                  </div>
                  <HiHome className="w-9 h-9 text-teal-600 flex-shrink-0" />
                </div>
                <div className="p-3 flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {gig.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
