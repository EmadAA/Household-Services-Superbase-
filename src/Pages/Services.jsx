import BannerImage from "../assets/images/banner.png";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import Navbar from "../Components/Navbar";
import ServiceSelector from "../Components/ServiceSelector";
import ServiceSlider from "../Components/ServiceSlider";

export default function Services() {
 
  return (
    <div>
         <Navbar />
      <HeaderBanner title="SERVICES" BannerImage={BannerImage} />
      {/* Service Gig  Card */}
      <ServiceSlider />
      {/* Testimonial Section */}
      <ServiceSelector />



      <Footer />
    </div>
  )
}