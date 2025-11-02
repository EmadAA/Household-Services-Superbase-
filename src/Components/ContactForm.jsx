import { useState } from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { sendEmail } from "../utils/emailService";

const SocialIcon = ({ icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    className="text-gray-600 hover:text-teal-600 transition"
  >
    {icon}
  </a>
);

const InputField = ({
  type = "text",
  placeholder,
  name,
  value,
  required,
  onChange,
  error,
  disabled,
}) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 ${
        error ? "border-red-500" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const ContactForm = () => {
  const patterns = {
    firstName: /^[A-Za-z][A-Za-z\s]{2,29}$/,
    lastName: /^[A-Za-z][A-Za-z\s]{2,29}$/,
    phone: /^01[3-9]\d{8}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (patterns[name]) {
      if (!patterns[name].test(value)) {
        let message = "";
        switch (name) {
          case "firstName":
          case "lastName":
            message =
              "Name must contain only letters and spaces (3–30 characters).";
            break;
          case "phone":
            message = "Enter a valid Bangladeshi mobile number (e.g. 017XXXXXXXX).";
            break;
          case "email":
            message = "Enter a valid email address.";
            break;
          default:
            message = "Invalid input.";
        }
        setErrors((prev) => ({ ...prev, [name]: message }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const newErrors = {};
    Object.keys(patterns).forEach((key) => {
      if (!patterns[key].test(formData[key])) {
        newErrors[key] = `Invalid ${key} format.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting form...");
      
      // Send email
      const response = await sendEmail({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        subject: `New Contact Form - ${formData.firstName} ${formData.lastName}`
      });

      console.log("Email sent, response:", response);

      if (response === "OK") {
        setSubmitStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitStatus({ type: "error", message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      console.error("Error details:", error.message);
      setSubmitStatus({ 
        type: "error", 
        message: `Error: ${error.message || "Please check console for details"}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Contact Info */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className="w-16 h-0.5 bg-teal-600 mr-2"></div>
                <span className="text-lg font-semibold text-teal-600 uppercase">
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
              Sylhet-3100, Bangladesh
            </p>

            {/* Customer Service */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                <FaPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">CUSTOMER SERVICE:</h3>
                <p className="text-gray-600">
                  +880 1676 480060 , +880 1719 712616
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mr-4">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email Support:</h3>
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
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex-1">
            {/* Status Message */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  name="firstName"
                  type="text"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  error={errors.firstName}
                  disabled={isSubmitting}
                />
                <InputField
                  name="lastName"
                  type="text"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  error={errors.lastName}
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  name="phone"
                  type="tel"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={errors.phone}
                  disabled={isSubmitting}
                />
                <InputField
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none ${
                  isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-3 px-6 rounded-full transition ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;