import Img from "../assets/images/Profile.webp";

export default function ProfileTopSection({ userData }) {


  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 md:gap-10 ml-auto mr-auto box-border border-2 p-5 rounded-[15px] border-[#E7E7E7] h-auto md:h-[200px] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div>
          <img
            src={Img}
            alt="Profile Picture"
            className="h-[180px] w-[180px] sm:h-[140px] sm:w-[140px] md:h-[150px] md:w-[150px] rounded-full object-cover "
          />
        </div>
        <div className="flex justify-around w-full">
          <div className="profile-info text-center md:text-left space-y-2">
            <h3 className="text-lg">
              <span className="font-semibold">Name</span>: {userData.fullname}
            </h3>
            <p className="text-lg">
              <span className="font-semibold">Number</span>: {userData.mobile}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Expertise</span>:{" "}
              {(userData.category
                ? userData.category.replace("_", " & ")
                : userData.role === "technician"
                ? "General Technician"
                : userData.role === "admin"
                ? "System Administrator"
                : "Web Development").charAt(0).toUpperCase() + (userData.category
                ? userData.category.replace("_", " & ")
                : userData.role === "technician"
                ? "General Technician"
                : "Web Development").slice(1)}
            </p>
          </div>
          <div className="profile-info text-center md:text-left space-y-2">
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
