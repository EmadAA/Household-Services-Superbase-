import { useState } from "react";
import HeroImage from "../assets/images/image.png";

export default function PriceContact() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Get Instant Price for Household Service?
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
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base"
            />
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base"
            />
            <textarea
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full text-sm sm:text-base min-h-[120px]"
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition w-full sm:w-auto font-medium text-sm sm:text-base"
            >
              SEE MY INSTANT QUOTE
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
