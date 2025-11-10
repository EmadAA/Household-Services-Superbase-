/* eslint-disable no-unused-vars */
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const SocialLink = ({ href, icon: Icon, children }) => (
    <a
      href={href}
      className="flex items-center justify-center gap-2 text-sm hover:text-white transition"
      target="_blank"
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </a>
  );

  return (
    <footer className="bg-teal-600 text-gray-200 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="md:text-left text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Household Services
          </h2>
          <a href="tel:8801676480060" className="hover:text-white">
            880 1676 480060
          </a>
          <br />
          <a
            href="mailto:info@householdservices.com"
            className="hover:text-white"
          >
             info@householdservices.com
          </a> <br /> 
          <p className="text-sm leading-relaxed mb-4 md:text-left text-center">
            <b>Household Services -</b> Skilled professionals for plumbing,
            electrical, carpentry, repairs & more. Quality. Reliability. Right
            at your doorstep.
          </p>
          <p className="md:text-left text-center mb-2">
            Sylhet-3100, Bangladesh
          </p>
          
        </div>

        {/* Useful Links */}
        <div className="md:text-left text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm md:text-left text-center">
            <li>
              <a href="/contact" className="hover:text-white transition block">
                Help Center
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition block">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition block">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition block">
                Services
              </a>
            </li>
            <li>
              <a href="/toc" className="hover:text-white transition block">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:text-left text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm md:text-left text-center">
            <li>
              <a href="/services" className="hover:text-white transition block">
                Electric Solution
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition block">
                Office Cleaning
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition block">
                Plumbing Services
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition block">
                Pest Control
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition block">
                AC & Refrigerator Repair
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4 md:text-left">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3 text-center">
            <div className="flex flex-col gap-3 md:items-start items-center">
              <SocialLink href="https://www.facebook.com" icon={FaFacebookF}>
                Facebook
              </SocialLink>
              <SocialLink href="https://www.twitter.com" icon={FaTwitter}>
                Twitter
              </SocialLink>
              <SocialLink href="https://www.instagram.com" icon={FaInstagram}>
                Instagram
              </SocialLink>
              <SocialLink href="https://www.linkedin.com" icon={FaLinkedinIn}>
                LinkedIn
              </SocialLink>
            </div>
            <div className="mt-4">
              <p className="text-sm italic md:text-left text-center">
                "Connecting You to Trusted Home Service Experts"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p className="text-white text-lg">
          © Copyright 2025 - Household Services. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
