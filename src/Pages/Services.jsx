import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BannerImage from "../assets/images/banner.png";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import Navbar from "../Components/Navbar";
import ServiceSelector from "../Components/ServiceSelector";
import ServiceSlider from "../Components/ServiceSlider";

export default function Services() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [searchPreSelection, setSearchPreSelection] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Handle pre-selection from search
  useEffect(() => {
    if (location.state?.autoOpen) {
      const { selectedCategory, selectedService } = location.state;
      
      setSearchPreSelection({
        category: selectedCategory,
        service: selectedService,
      });

      // Scroll to service selector after a short delay
      setTimeout(() => {
        const element = document.getElementById("service-selector");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);

      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <HeaderBanner title="SERVICES" BannerImage={BannerImage} />

      {/* Service Gig Card */}
      <ServiceSlider />

      {/* Show ServiceSelector ONLY if userRole === 'user' */}
      <div id="service-selector">
        {userRole === "user" ? (
          <ServiceSelector searchPreSelection={searchPreSelection} />
        ) : (
          <p className="text-center text-[30px] text-gray-500 my-10">
            Only customers can view available services.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}