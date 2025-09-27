import { HiHome } from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Img from "../assets/images/image.png";

export default function GigCard() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const gigDetails = [
    { title: "Home Cleaning", category: "Cleaning", desc: "Deep clean for your house" },
    { title: "Plumbing Repair", category: "Repair", desc: "Fix leaks and pipes" },
    { title: "Electrical Work", category: "Electric", desc: "Safe wiring & installation" },
    { title: "AC Service", category: "Appliance", desc: "Cooling system maintenance" },
    { title: "Pest Control", category: "Safety", desc: "Eliminate bugs and rodents" },
    { title: "Interior Painting", category: "Renovation", desc: "Fresh look for your walls" },
  ];

  return (
    <div className="mt-10">
      <div className="px-5">
        <Slider {...settings}>
          {gigDetails.map((gig, index) => (
            <div key={index} className="outline-none px-2 text-left">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={Img} alt={gig.title} className="w-full h-48 object-cover" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-teal-600 font-medium">{gig.category}</h3>
                    <h2 className="font-semibold">{gig.title}</h2>
                  </div>
                  <HiHome className="w-9 h-9 text-teal-600" />
                </div>
                <div className="p-3">
                  <p className="text-gray-600 text-sm leading-relaxed">{gig.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}