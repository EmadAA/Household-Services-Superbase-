import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/image.png";
import FloatingIcons from "../Components/FloatingIcons";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PriceContact from "../Components/PriceContact";
import ClassCleaningService from "../Components/ServiceCard";
import TeamSection from "../Components/TeamSection";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-gray-800 to-gray-500 overflow-hidden">
        {/* Floating Icons */}
        <FloatingIcons />

        {/* Header Top */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center z-10">
          {/* Left Content */}
          <div className="text-white text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-medium mb-5">
              100% SATISFACTION
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-snug sm:leading-tight">
              <span className="text-teal-400">Household </span>, Repair & <br />{" "}
              Maintenance Solutions
            </h1>
            <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
              Helping you take care of your home with dependable services,
              experienced professionals, and complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-center">
              <Link
                to="/services"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center transition duration-300 transform hover:scale-105"
              >
                <span>Get Pricing</span>
                <HiArrowNarrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg sm:text-xl hover:scale-110 transition">
                ▶
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden flex items-center justify-center">
              <img
                src={HeroImage}
                alt="hero"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-white rounded-t-full"></div>
      </section>

      {/* Services Cards */}
      <section className="py-12 sm:py-16 bg-teal-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">
            Best In Class Cleaning Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <ClassCleaningService />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PriceContact />

      {/* Team Section Slider */}
      <section className="py-12 sm:py-16 bg-teal-50 px-4 sm:px-6 lg:px-8">
        <TeamSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
