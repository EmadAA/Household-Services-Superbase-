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

    // TODO: Send data to backend here

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Get Instant Price for Household Service?
            </h2>
            <p className="mb-6 text-gray-600">
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
                className="border rounded-lg px-4 py-3 w-full"
              />
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full"
              />
              <textarea
                id="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full"
              ></textarea>
              <button
                type="submit"
                className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
              >
                SEE MY INSTANT QUOTE
              </button>
            </form>
          </div>
          <div>
            <img
              src={HeroImage}
              alt="pricing"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
