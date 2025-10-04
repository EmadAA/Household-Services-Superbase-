import { HiArrowNarrowRight, HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import AdilImg from "../assets/images/Adil.png";
import MTS from "../assets/images/mosttrustedservice.png";

export default function MostTrustedService() {
  return (
    <section className="relative bg-gray-900 text-white py-16 sm:py-20 overflow-hidden">
      {/* ✨ Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* 🧭 Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* ✅ Left Side */}
          <div className="flex-1 w-full text-center lg:text-left">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <div className="w-12 sm:w-16 h-1 bg-teal-600"></div>
                <span className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-wider ml-2">
                  Excellent Services
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                Excellent <span className="text-teal-600">Household</span>{" "}
                Services
              </h1>
            </div>

            {/* 👥 Members Count */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="flex -space-x-2">
                <img
                  src={AdilImg}
                  alt="Member 1"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                />
                <img
                  src={AdilImg}
                  alt="Member 2"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                  +
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-teal-600 font-medium text-lg sm:text-xl">57+</p>
                <p className="text-sm sm:text-base">Members</p>
              </div>
            </div>

            {/* ✨ Icon */}
            <div className="flex justify-center lg:justify-start mb-8">
              <HiSparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          {/* ✅ Right Side */}
          <div className="flex-1 w-full">
            <div className="relative rounded-lg overflow-hidden border-4 border-teal-600 shadow-lg">
              <img
                src={MTS}
                alt="Cleaning service"
                className="w-full h-auto object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 sm:p-8">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Most Trusted Service
                  </h2>
                  <Link
                    to="/services"
                    className="mx-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-105 w-full sm:w-[180px]"
                  >
                    <span>Book Service</span>
                    <HiArrowNarrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
