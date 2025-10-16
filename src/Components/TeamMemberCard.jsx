import { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function TeamMemberCard({
  name,
  role,
  image,
  socialLinks = { facebook: "", linkedin: "", instagram: "", github: "#" },
  showSocialIcons = true,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative h-full">
      <div className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white p-3 sm:p-4 h-full flex flex-col">
        <div className="mb-3 sm:mb-4 aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="text-center flex-1 flex flex-col">
          <h3 className="font-bold text-gray-800 text-base sm:text-lg">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-teal-600 mb-3">{role}</p>

          {showSocialIcons && (
            <div className="mt-auto flex justify-center space-x-3 sm:space-x-4 pt-2">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

