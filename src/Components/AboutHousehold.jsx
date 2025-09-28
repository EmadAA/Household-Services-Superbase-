import { GiAutoRepair, GiVacuumCleaner } from "react-icons/gi";
import { HiArrowNarrowRight, HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

import AdilImg from "../assets/images/Adil.png";
import Carpenter from "../assets/images/carpenter.webp";
import Cleaning from "../assets/images/Cleaning.webp";
import Electrician from "../assets/images/electrician.webp";
import Repairing from "../assets/images/repairing.webp";

export default function AboutHousehold() {
  return (
    <div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Images */}
          {/* Left Side - Images */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Top Left */}
            <div className="relative">
              <img
                src={Cleaning}
                alt="Cleaning service"
                className="rounded-lg shadow-lg border-4 border-teal-600"
              />
            </div>

            {/* Top Right */}
            <div className="relative">
              <img
                src={Repairing}
                alt="Repairing service"
                className="rounded-lg shadow-lg border-4 border-teal-600"
              />
            </div>

            {/* Bottom Left */}
            <div className="relative">
              <img
                src={Carpenter}
                alt="Extra Carpenter service"
                className="rounded-lg shadow-lg border-4 border-teal-600"
              />
            </div>

            {/* Bottom Right */}
            <div className="relative">
              <img
                src={Electrician}
                alt="Extra Repairing service"
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
                Our<span className="text-teal-600"> Household </span> Services
                <br /> <span className="text-teal-600">Agency</span> For Your
                City
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8 text-md md:text-base">
              From deep cleaning to appliance repair, we provide top-notch
              services to keep your home comfortable and worry-free. Our expert
              team ensures quality and reliability at every step.
            </p>

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col">
                <div className="flex items-center mb-3">
                  <GiVacuumCleaner className="w-8 h-8 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Cleaning
                  </h3>
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Give Your Home a Fresh Start
                </p>
                <p className="text-md text-gray-600">
                  Professional home cleaning to keep your space fresh, spotless,
                  and healthy. Our trusted team ensures every corner shines.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center mb-3">
                  <GiAutoRepair className="w-8 h-8 text-teal-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Repairing
                  </h3>
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Fixing Problems, Restoring Comfort
                </p>
                <p className="text-md text-gray-600">
                  Quick and reliable repair for plumbing, electrical, and
                  appliances. We fix problems fast to restore comfort to your
                  home.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
              <Link
                to="/services"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full flex items-center transition duration-300 transform hover:scale-105"
              >
                <span>Book Service</span>
                <HiArrowNarrowRight className="w-5 h-5 ml-2" />
              </Link>

              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full border-2 border-teal-600 overflow-hidden">
                  <img
                    src={AdilImg}
                    alt="Emad Uddin Adil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">Emad Uddin Adil</p>
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
  );
}
