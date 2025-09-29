// components/TeamMemberCard.jsx
import { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const TeamMemberCard = ({
  name,
  role,
  image,
  socialLinks = { facebook: "", linkedin: "", instagram: "",  github:'#' },
  showSocialIcons = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative">
      {/* Card Container with Shadow */}
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white p-4">
        
        {/* Profile Image */}
        <div className="mb-4">
          <img
            src={image}
            alt={name}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-64 object-cover rounded-lg transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Member Info */}
        <div className="text-center">
          <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
          <p className="text-sm text-teal-600 mb-3">{role}</p>
          
          {/* Social Icons */}
          {showSocialIcons && (
            <div className="flex justify-center space-x-4 pt-2">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
            
              
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;