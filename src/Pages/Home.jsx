import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/image.png";
import FloatingIcons from "../Components/FloatingIcons";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PriceContact from "../Components/PriceContact";
import ClassCleaningService from "../Components/ClassCleaningService";
import TeamSection from "../Components/TeamSection";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/*Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className=" relative min-h-[70vh] sm:min-h-[80vh] flex items-center bg-gradient-to-br from-gray-800 to-gray-600 overflow-hidden">
        {/* Floating Icons */}
        <FloatingIcons />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white my-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-full text-white text-xs sm:text-sm font-medium mb-5">
              100% SATISFACTION
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-snug sm:leading-tight">
              <span className="text-teal-400">Household</span>, Repair & <br />
              Maintenance Solutions
            </h1>
            <p className="text-gray-300 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Helping you take care of your home with dependable services,
              experienced professionals, and complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-center">
              <Link
                to="/services"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center transition duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <span>Get Pricing</span>
                <HiArrowNarrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <button
                aria-label="Play video"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg sm:text-xl hover:scale-110 transition flex items-center justify-center"
              >
                {/* just a link, nothing else */}
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  ▶
                </a>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden flex items-center justify-center shadow-lg">
              <img
                src={HeroImage}
                alt="hero"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* White curve bottom */}
        <div className="absolute bottom-0 left-0 w-full h-14 sm:h-16 md:h-20 bg-white rounded-t-full"></div>
      </section>

      {/* Services Cards */}
      <section className="py-12 sm:py-16 bg-teal-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10">
            Best In Household Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <ClassCleaningService />
          </div>
        </div>
      </section>

      {/*Pricing Section */}
      <section>
        <PriceContact />
      </section>

      {/*Team Section Slider */}
      <section className="py-12 sm:py-16 bg-teal-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <TeamSection />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
