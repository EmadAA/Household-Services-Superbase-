import Img from "../assets/images/Profile.webp";

export default function ProfileTopSection({ userData }) {
  // Format expertise nicely
  const getExpertise = () => {
    if (userData.category) {
      return userData.category.replace("_", " & ");
    }
    if (userData.role === "technician") return "General Technician";
    if (userData.role === "admin") return "System Administrator";
    return "NA";
  };

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 md:gap-10 mx-auto box-border border-2 p-6 rounded-[15px] border-[#E7E7E7] h-auto md:h-[220px] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px] bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div>
          <img
            src={Img}
            alt="Profile Picture"
            className="h-[150px] w-[150px] sm:h-[130px] sm:w-[130px] md:h-[150px] md:w-[150px] rounded-[50%] object-cover border-4 border-teal-500 shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-8">
          {/* Left Info */}
          <div className="profile-info text-center md:text-left space-y-2 flex-1">
            <h3 className="text-lg">
              <span className="font-semibold">Name</span>: {userData.fullname}
            </h3>
            <p className="text-lg">
              <span className="font-semibold">Number</span>: {userData.mobile}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Expertise</span>:{" "}
              {getExpertise()}
            </p>
          </div>

          {/* Right Info */}
          <div className="profile-info text-center md:text-left space-y-2 flex-1">
            <h3 className="text-lg">
              <span className="font-semibold">NID/Birth Certificate No</span>:{" "}
              {userData.nid || "Not available"}
            </h3>
            <h3 className="text-lg">
              <span className="font-semibold">Joining Date</span>:{" "}
              {new Date(userData.created_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h3>
            <h3 className="text-lg">
              <span className="font-semibold">Role</span>: {userData.role}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
