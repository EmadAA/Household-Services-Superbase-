import BannerImage from "../assets/images/banner.png";
import AboutHousehold from "../Components/AboutHousehold";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import MostTrustedService from '../Components/MostTrustedService';
import Navbar from "../Components/Navbar";
import TeamSection from "../Components/TeamSection";

export default function About() {
  return (
    <div>
      <Navbar />
      <HeaderBanner title="ABOUT US" BannerImage={BannerImage} />
      <div className="min-h-screen bg-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* World Map Overlay */}
        <div className="absolute left-0 top-0 w-1/3 h-full opacity-5 z-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M100,10 C120,20 140,30 160,40 C180,50 190,70 190,90 C190,110 180,130 160,140 C140,150 120,160 100,170 C80,160 60,150 40,140 C20,130 10,110 10,90 C10,70 20,50 40,40 C60,30 80,20 100,10 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
        </div>

{/* About Household Services */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <AboutHousehold />
        </div>

        <div className="border-t border-gray-200"></div>
        <div className="w-full h-1 bg-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-600 to-transparent opacity-70"></div>
        </div>

        {/* Main Content Area */}
        <MostTrustedService />
        
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
}