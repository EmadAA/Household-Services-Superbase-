import { useState } from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaVk,
} from "react-icons/fa";

const SocialIcon = ({ icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    className="text-gray-600 hover:text-teal-600 transition"
  >
    {icon}
  </a>
);
//for  repetitive input field
const InputField =({type="text", placeholder,  value, required, onChange})=>(

  <input 
  type={type}
  placeholder={placeholder}
  value={value}
  onChange={onChange}
  required={required}
  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600"
  />

)

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex-1 ">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className="w-16 h-0.5 bg-teal-600 mr-2"></div>
                <span className="text-sm font-semibold text-teal-600 uppercase">
                  CONTACT US
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Get In Touch With Us
              </h2>
            </div>

            {/* Address */}
            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-teal-600">ADDRESS:</span>{" "}
              Sylhet-3100 , Bangladesh
            </p>

            {/* Customer Service */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                <FaPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  CUSTOMER SERVICE:
                </h3>
                <p className="text-gray-600">
                  +880 1676 480060 , +880 1719 712616
                </p>
              </div>
            </div>

            {/* Careers */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">CAREERS:</h3>
                <p className="text-gray-600">household@info.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="border-t border-dashed border-gray-300 pt-6">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-800 mr-4">
                  FOLLOW US:
                </span>
                <div className="flex space-x-4">
                  <SocialIcon
                    icon={<FaTwitter className="w-5 h-5" />}
                    href="#"
                    label="Twitter"
                  />
                  <SocialIcon
                    icon={<FaLinkedin className="w-5 h-5" />}
                    href="#"
                    label="LinkedIn"
                  />
                  <SocialIcon
                    icon={<FaInstagram className="w-5 h-5" />}
                    href="#"
                    label="Instagram"
                  />
                  <SocialIcon
                    icon={<FaVk className="w-5 h-5" />}
                    href="#"
                    label="VK"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} autoFocus className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
                <InputField 
                
                type="text"
                onChange={handleChange}
                placeholder="First Name *"
                value={formData.firstName}
                required 
                />




                <InputField
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  type="tel"
                  name="phone"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <InputField
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your message ..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
