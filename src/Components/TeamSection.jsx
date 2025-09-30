/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AdilImg from "../assets/images/Adil.png";
import JW from "../assets/images/jw.jpeg";
import KJH from "../assets/images/kjh.png";
import Mukter from "../assets/images/mukter.jpg";
import FISImg from "../assets/images/shuvon.png";
import TeamMemberCard from "../Components/TeamMemberCard";

const TeamSection = ({
  title = "Meet Our Team",
  subtitle = "We have an expert team",
  teamMembers = [
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
        linkedin:
          "https://www.linkedin.com/in/emad-uddin-adil-430851214/",
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
        linkedin:
          "https://www.linkedin.com/in/farhan-israk-shuvon-630540287/",
        instagram:
          "https://www.instagram.com/farhanshuvon?igsh=MWRnaHlqcmNyOXc2aQ==",
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
        instagram:
          "https://www.instagram.com/mukter_71?igsh=MXIwOXBqb3E1djVheg==",
        github: "https://github.com/muk63",
      },
    },
    {
      name: "Testing",
      role: "Test",
      image: JW,
      socialLinks: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        instagram: "https://www.instagram.com/",
        github: "https://www.github.com/",
      },
    },
  ],
  sectionId = "team",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive slidesToShow
  const slidesToShow =
    window.innerWidth >= 1280
      ? 4
      : window.innerWidth >= 1024
      ? 3
      : window.innerWidth >= 640
      ? 2
      : 1;

  const maxIndex = teamMembers.length - slidesToShow;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay every 3 sec
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  return (
    <section
      id={sectionId}
      className="py-12 sm:py-16 bg-gray-50 relative overflow-hidden"
    >
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

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  (100 / slidesToShow) * currentIndex
                }%)`,
                width: `${(teamMembers.length * 100) / slidesToShow}%`,
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="px-2 sm:px-3"
                  style={{ width: `${100 / teamMembers.length}%` }}
                >
                  <TeamMemberCard {...member} />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-teal-600 hover:text-white transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 sm:-right-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-teal-600 hover:text-white transition"
          >
            <FaChevronRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-teal-600" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
