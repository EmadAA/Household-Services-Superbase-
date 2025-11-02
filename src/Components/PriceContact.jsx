import { useState } from "react";
import HeroImage from "../assets/images/image.png";
import { sendEmail } from "../utils/emailService";

export default function PriceContact() {
  // Regex patterns
  const patterns = {
    name: /^[A-Za-z][A-Za-z\s]{2,29}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    mobile: /^01[3-9]\d{8}$/,
  };

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes and live validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Validate the input based on regex
    if (patterns[id]) {
      if (!patterns[id].test(value)) {
        setErrors({
          ...errors,
          [id]:
            id === "name"
              ? "Name must contain only letters and spaces (3–30 chars)."
              : id === "email"
              ? "Enter a valid email address."
              : "Enter a valid Bangladeshi mobile number (e.g. 017XXXXXXXX).",
        });
      } else {
        setErrors({ ...errors, [id]: "" });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Final validation check
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
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
        subject: "New Household Service Quote Request"
      });

      console.log("Email sent, response:", response);

      if (response === "OK") {
        setSubmitStatus({ type: "success", message: "Message sent successfully!" });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
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
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Get Instant Quote for Household Service?
          </h2>
          <p className="mb-5 sm:mb-6 text-gray-600 text-sm sm:text-base">
            Need to speak to someone?{" "}
            <a
              href="tel:+8801719712616"
              className="text-teal-500 hover:underline"
            >
              Call us at +880 171 971 2616
            </a>
          </p>

          {/* Status Message */}
          {submitStatus && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name Field */}
            <div>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <input
                id="mobile"
                type="text"
                placeholder="Your Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Message Field */}
            <textarea
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base min-h-[80px] ${
                isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition w-full sm:w-auto font-medium text-sm sm:text-base ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={HeroImage}
            alt="pricing"
            className="w-full max-w-sm sm:max-w-md md:max-w-full rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}