import { HiArrowNarrowRight, HiSparkles } from 'react-icons/hi';
import AdilImg from "../assets/images/Adil.png";
import HeroImg from "../assets/images/image.png";


export default function MostTrustedService() {
  return (
    <div>
        <div className="relative bg-gray-900 text-white py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="#fff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Side - Content */}
              <div className="flex-1">
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="w-16 h-1 bg-teal-600"></div>
                    <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider ml-2">Excellent Services</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Excellent <span className="text-teal-600">Household</span> Services
                  </h1>
                </div>

                {/* Members Count */}
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-2">
                    <img src={AdilImg} alt="Member 1" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src={AdilImg} alt="Member 2" className="w-10 h-10 rounded-full border-2 border-white" />
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg font-bold">
                      +
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-teal-600 font-medium text-lg">57+</p>
                    <p className="text-lg">Members</p>
                  </div>
                </div>

                {/* Decorative Arrow */}
                <div className="flex justify-center mb-8">
                  {/* ✅ Replaced SVG with React Icon */}
                  <HiSparkles className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Right Side - Video and Logos */}
              <div className="flex-1">
                {/* Video Container */}
                <div className="relative mb-8 rounded-lg overflow-hidden border-4 border-teal-600">
                  <img 
                    src={HeroImg} 
                    alt="Cleaning service" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                   
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold mb-4">Most Trusted service</h2>
                      <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center transition duration-300 transform hover:scale-105">
                        <a href="/contact"><span>Book Service</span></a>
                        
                        <HiArrowNarrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                 
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
