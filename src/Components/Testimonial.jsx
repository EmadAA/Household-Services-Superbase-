/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Adil from "../assets/images/Adil.png";
import FIS from "../assets/images/shuvon.png";
import test from "../assets/images/test.webp";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Farhan Shuvon",
      image: FIS,
      rating: 5,
      text: "When you work with Los Angeles House Cleaners Referral Agency Cleaning, breathe easy because your home will soon be spotless and fresh. Their team is professional and reliable.",
    },
    {
      id: 2,
      name: "Emad Adil",
      image: Adil,
      rating: 5,
      text: "I've never had such a thorough cleaning before. The attention to detail was incredible. I highly recommend them to anyone looking for top-tier service.",
    },
    {
      id: 3,
      name: "James Rivera",
      image: test,
      rating: 4,
      text: "The cleaners arrived on time and worked efficiently. My house looks brand new. I'll definitely book again!",
    },
    {
      id: 4,
      name: "James Test",
      image: test,
      rating: 4,
      text: "The cleaners arrived on time and worked efficiently. My house looks brand new. I'll definitely book again!",
    },
  ];

  // Auto rotate in every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative bg-gray-900 text-white py-16 md:py-24 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="#00B7A8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* main section */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center flex justify-center items-center mb-8">
          <div className="w-16 h-1 bg-teal-600"></div>
          <span className="text-[35px] font-semibold text-teal-600 uppercase tracking-wider ml-2">
            Testimonials
          </span>
          <div className="w-16 h-1 bg-teal-600"></div>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Our Clients Are Saying
          </h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            When You Work With Los Angeles House Cleaners Referral Agency
            Cleaning, Breathe Easy Because Your Home Will Soon Be Spotless.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto relative overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-6xl text-teal-400 opacity-70">
            “
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Img & Info */}
            <div className="flex-shrink-0">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full border-4 border-teal-500 object-cover"
              />
            </div>

            <div className="flex-1">
              {/* Ratings */}
              <div className="flex items-center mb-2">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-teal-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.122a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.122a1 1 0 00-1.175 0l-3.976 2.122c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.122c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white">
                {currentTestimonial.name}
              </h3>
              <p className="text-gray-300 mt-2 leading-relaxed">
                {currentTestimonial.text}
              </p>
            </div>
          </div>
        </div>

        {/* Arrow Buttons */}
        <div className="flex justify-center items-center mt-10 space-x-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-teal-700 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200 shadow-lg border border-teal-500"
            aria-label="Previous"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-teal-700 hover:bg-teal-600 flex items-center justify-center transition-colors duration-200 shadow-lg border border-teal-500"
            aria-label="Next"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Progress Line */}
        <div className="mt-6 flex justify-center items-center">
          <div className="w-16 h-1 bg-teal-500"></div>
          <div className="w-16 h-1 bg-teal-500 mx-2"></div>
          <div className="w-16 h-1 bg-teal-500"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
