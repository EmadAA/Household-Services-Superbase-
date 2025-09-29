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
      <section className="relative min-h-[80vh]  flex items-center bg-gradient-to-br from-gray-800 to-gray-500 overflow-hidden">
        {/* Floating Icons */}
        <FloatingIcons />

{/* Header TOp */}
        <div className="max-w-[1400px] mx-auto px-5 grid md:grid-cols-2 gap-16 items-center z-10">
          <div className="text-white text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 rounded-full text-white text-sm font-medium mb-5">
              100% SATISFACTION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-teal-400">Cleaning</span> & <br /> Hygiene
              Solutions
            </h1>
            <p className="text-gray-300 mb-10 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              dicta?
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
              <a
                href="#"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition"
              >
                GET PRICING →
              </a>
              <button className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xl hover:scale-110 transition">
                ▶
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden flex items-center justify-center">
              <img
                src={HeroImage}
                alt="hero"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
 
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-full"></div>
      </section>


      {/* Services Cards */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Best In Class Cleaning Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <ClassCleaningService />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
  <PriceContact />

      {/* Team Section Slider */}
      <section className="py-16 bg-teal-50">
        <TeamSection />
      </section>

      {/* Footer */}
      
        <Footer />
      
    </div>
  );
};

export default HomePage;