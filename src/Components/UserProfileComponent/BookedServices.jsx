const services = [
  {
    id: 1,
    name: "AC Maintenance",
    category: "Electrician",
    date: "2025-11-03",
    cost: "500 TK",
    status: "Pending",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    problemDetails: "AC not cooling properly, needs gas refill and filter cleaning",
  },
  {
    id: 2,
    name: "Plumbing Repair",
    category: "Plumber",
    date: "2025-11-04",
    cost: "300 TK",
    status: "In Queue",
    address: "Flat 3B, Gulshan Avenue, Gulshan-1, Dhaka",
    problemDetails: "Kitchen sink pipe leaking, needs replacement",
  },
  {
    id: 3,
    name: "House Cleaning",
    category: "Cleaner",
    date: "2025-11-02",
    cost: "400 TK",
    status: "Pending",
    address: "Apartment 204, Banani DOHS, Dhaka",
    problemDetails: "Deep cleaning required for 3 bedrooms and living area",
  },
  {
    id: 4,
    name: "Carpet Wash",
    category: "Cleaner",
    date: "2025-11-01",
    cost: "200 TK",
    status: "In Queue",
    address: "House 45, Mohammadpur, Dhaka",
    problemDetails: "Two large carpets need professional washing and stain removal",
  },
  {
    id: 5,
    name: "Pest Control",
    category: "Pest Control Expert",
    date: "2025-11-06",
    cost: "350 TK",
    status: "Pending",
    address: "Villa 7, Bashundhara R/A, Dhaka",
    problemDetails: "Cockroach infestation in kitchen and bathroom areas",
  },
  {
    id: 6,
    name: "Painter",
    category: "Home Decor",
    date: "2025-11-07",
    cost: "1000 TK",
    status: "In Queue",
    address: "House 23, Uttara Sector 10, Dhaka",
    problemDetails: "Interior painting for master bedroom and hallway",
  },
  {
    id: 7,
    name: "Water Filter Setup",
    category: "Plumber",
    date: "2025-11-05",
    cost: "250 TK",
    status: "Pending",
    address: "Flat 5C, Mirpur DOHS, Dhaka",
    problemDetails: "Install new water purifier and connect to main line",
  },
  {
    id: 8,
    name: "CCTV Installation",
    category: "Electrician",
    date: "2025-11-08",
    cost: "700 TK",
    status: "In Queue",
    address: "Shop 12, Elephant Road, Dhaka",
    problemDetails: "Install 4 CCTV cameras with DVR system for security",
  },
  {
    id: 9,
    name: "Roof Repair",
    category: "Carpenter",
    date: "2025-11-09",
    cost: "150 TK",
    status: "Pending",
    address: "House 8, Old Dhaka, Dhaka",
    problemDetails: "Fix wooden roof beams and replace damaged tiles",
  },
  {
    id: 10,
    name: "Lawn Mowing",
    category: "Mover",
    date: "2025-11-10",
    cost: "250 TK",
    status: "In Queue",
    address: "Bungalow 15, Baridhara, Dhaka",
    problemDetails: "Regular lawn maintenance and garden cleanup required",
  },
];

export default function RunningServices() {
  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Running Services</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {service.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">Date: {service.date}</p>
              <p className="text-sm text-gray-500 mb-1">Cost: {service.cost}</p>
              
              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">Address:</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.address}
                </p>
              </div>

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">Problem Details:</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {service.problemDetails}
                </p>
              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  service.status === "In Queue"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {service.status}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border border-teal-300 rounded-lg hover:bg-teal-50 text-sm">
                Mark as Done
              </button>
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}