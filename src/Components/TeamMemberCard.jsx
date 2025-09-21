// components/TeamMemberCard.jsx
import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const TeamMemberCard = ({
  name,
  role,
  image,
  socialLinks = { facebook: "", twitter: "", instagram: "" },
  showSocialIcons = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative">
      {/* Card */}
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white p-1 ">
        
        <div
          className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-teal-600 to-teal-100
                     pointer-events-none z-0"
        ></div>

        {/*Profile Image*/}
        <img
          src={image}
          alt={name}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-64 object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/*Social Icon */}
        {showSocialIcons && (
          <div className="absolute left-0 bottom-0 w-16 h-24 z-10">
            <div
              className="flex flex-col items-center justify-center h-full p-2 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                           pointer-events-auto"
            >
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors mb-2"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors mb-2"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="text-center mt-4">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-green-600">{role}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
