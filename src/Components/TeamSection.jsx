
import CustomSlider from "../Components/CustomSlider";
import TeamMemberCard from "../Components/TeamMemberCard";
import AdilImg from "../assets/images/Adil.png";
import JW from "../assets/images/jw.jpeg";
import KJH from "../assets/images/kjh.png";
import Mukter from "../assets/images/mukter.jpg";
import FISImg from "../assets/images/shuvon.png";

export default function TeamSection({
  title = "Meet Our Team",
  subtitle = "We have an expert team",
}) {
  const teamMembers = [
    {
      name: "Kaji Jahid Hasan",
      role: "Supervisor",
      image: KJH,
      socialLinks: { facebook: "#", linkedin: "#", instagram: "#", github: "#" },
    },
    {
      name: "Emad Uddin Adil",
      role: "Frontend Developer",
      image: AdilImg,
      socialLinks: {
        facebook: "https://www.facebook.com/emad.adil.509",
        linkedin: "https://www.linkedin.com/in/emad-uddin-adil-430851214/",
        instagram: "https://www.instagram.com/adilemaduddin/",
        github: "https://github.com/EmadAA",
      },
    },
    {
      name: "Farhan Israk Shuvon",
      role: "Backend Developer",
      image: FISImg,
      socialLinks: {
        facebook: "https://www.facebook.com/farhanisrak.shuvon",
        linkedin: "https://www.linkedin.com/in/farhan-israk-shuvon-630540287/",
        instagram: "https://www.instagram.com/farhanshuvon",
        github: "https://github.com/FarhanShuvon",
      },
    },
    {
      name: "Mukter Hussen",
      role: "Designer",
      image: Mukter,
      socialLinks: {
        facebook: "https://www.facebook.com/mukterhussen.roki",
        linkedin: "https://www.linkedin.com/",
        instagram: "https://www.instagram.com/mukter_71",
        github: "https://github.com/muk63",
      },
    },
    {
      name: "Testing",
      role: "Test Role",
      image: JW,
      socialLinks: {
        facebook: "#",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 sm:w-16 h-1 bg-teal-600"></div>
            <span className="text-sm sm:text-md font-semibold text-teal-600 uppercase tracking-wider mx-2">
              {title}
            </span>
            <div className="w-10 sm:w-16 h-1 bg-teal-600"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug sm:leading-tight">
            {subtitle}
          </h2>
        </div>

        {/* Custom Slider */}
        <CustomSlider autoplay={true} autoplaySpeed={3000}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </CustomSlider>
      </div>
    </section>
  );
}
