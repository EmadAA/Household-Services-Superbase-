import { useEffect, useState } from "react";
import BannerImage from "../assets/images/banner.png";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import Navbar from "../Components/Navbar";
import ServiceSelector from "../Components/ServiceSelector";
import ServiceSlider from "../Components/ServiceSlider";

export default function Services() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <div>
      <Navbar />
      <HeaderBanner title="SERVICES" BannerImage={BannerImage} />

      {/* Service Gig  Card */}
      <ServiceSlider />

      {/* Show ServiceSelector ONLY if userRole === 'user' */}
      {userRole === "user" ? (
        <ServiceSelector />
      ) : (
        <p className="text-center  text-[30px] text-gray-500 my-10">
          Only customers can view available services.
        </p>
      )}

      <Footer />
    </div>
  );
}
