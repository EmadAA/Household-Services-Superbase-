
const HeaderBanner = ({ title,  BannerImage }) => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-900 z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl md:text-7xl font-bold">
            {title.split(" ")[0]}{" "}
            <span className="text-teal-500">
              {title.split(" ")[1] || ""}
            </span>
          </h1>
          <p className="mt-4 text-lg font-semibold">
            <a href="/home"><span className="text-white">HOME</span></a>{" "}
            <span className="mx-2">//</span>
            <span className="text-teal-500 uppercase">{title}</span>
          </p>
        </div>

        {/* Right Side*/}
        <div className="flex justify-center items-center">
          <img
            src={BannerImage}
            alt="Banner Illustration"
            className="max-h-75 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeaderBanner;
