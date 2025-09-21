import { HiArrowNarrowRight, HiDownload, HiLightningBolt, HiSparkles } from 'react-icons/hi';
import AdilImg from "../assets/images/Adil.png";
import HeroImg from "../assets/images/image.png";

export default function AboutHousehold() {
  return (
    <div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Side - Images */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4">
              {/* Main Image with teal Border */}
              <div className="relative">
                <img
                  src={HeroImg}
                  alt="Cleaning sink"
                  className="rounded-lg shadow-lg border-4 border-teal-600"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center">
                  {/* ✅ Replaced SVG with React Icon */}
                  <HiDownload className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Secondary Image with teal Border */}
              <div className="relative">
                <img
                  src={HeroImg}
                  alt="Cleaner with supplies"
                  className="rounded-lg shadow-lg border-4 border-teal-600"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-16 h-1 bg-teal-600"></div>
                  <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider ml-2">
                    About Household
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Our<span className="text-teal-600"> Household </span> Services <br /> <span className="text-teal-600">Agency</span>{" "}
                  For Your City
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 text-sm md:text-base">
                When You Work Angeles House Cleaners Referral Agency Cleaning
                Breathe Easy Because Your Home Will Soon
              </p>

              {/* Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <HiLightningBolt className="w-8 h-8 text-teal-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Household
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <HiDownload className="w-8 h-8 text-teal-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Repairing Anything you need
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, officia.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center transition duration-300 transform hover:scale-105">
                  <span>Book Service</span>
                  {/* ✅ Replaced SVG with React Icon */}
                  <HiArrowNarrowRight className="w-5 h-5 ml-2" />
                </button>

                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-teal-600 overflow-hidden">
                    <img
                      src={AdilImg}
                      alt="Emad Uddin Adil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">
                      Emad Uddin Adil
                    </p>
                    <p className="text-sm text-teal-600">Founder</p>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <div className="flex items-center text-teal-600">
                <HiSparkles className="w-5 h-5 mr-2" />
                <p className="text-lg font-medium">
                  Give Your Home A Deep Clean for aesthetic.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
