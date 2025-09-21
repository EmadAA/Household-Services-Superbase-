import bannerImg from '../assets/images/banner.png';
import ContactForm from '../Components/ContactForm';
import Footer from '../Components/Footer';
import Header from '../Components/HeaderBanner';
import Navbar from '../Components/Navbar';

export default function Contact() {
  return (
    <div>
      <Navbar />
      <Header title="Contact Us" BannerImage={bannerImg} />
      <ContactForm />
      <Footer />
    </div>
  );
}
