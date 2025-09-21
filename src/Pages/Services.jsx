import BannerImage from "../assets/images/banner.png";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";
import HeaderBanner from "../Components/HeaderBanner";
import Navbar from "../Components/Navbar";
import ServiceSlider from "../Components/ServiceSlider";
import Testimonial from "../Components/Testimonial";

export default function Services() {
 
  return (
    <div>
         <Navbar />
      <HeaderBanner title="Services" BannerImage={BannerImage} />
      {/* Service Gig  Card */}
      <ServiceSlider />

      {/* Book Now Section */}


     <Testimonial />

     <FAQ />

      <Footer />
    </div>
  )
}