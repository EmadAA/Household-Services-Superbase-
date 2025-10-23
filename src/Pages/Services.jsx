import BannerImage from "../assets/images/banner.png";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import Navbar from "../Components/Navbar";
import ServiceSelector from "../Components/ServiceSelector";
import ServiceSlider from "../Components/ServiceSlider";
import Testimonial from "../Components/Testimonial";

export default function Services() {
 
  return (
    <div>
         <Navbar />
      <HeaderBanner title="SERVICES" BannerImage={BannerImage} />
      {/* Service Gig  Card */}
      <ServiceSlider />
      {/* Testimonial Section */}
      <ServiceSelector />

     <Testimonial />

     <FAQ />

      <Footer />
    </div>
  )
}