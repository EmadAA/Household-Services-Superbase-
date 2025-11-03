const technicianCategory = "Electrical";

const technicianBookings = [
  {
    id: 1,
    serviceName: "AC Maintenance",
    category: "Electrical",
    customerName: "Abdur Rahman",
    address: "House 14, Road 12, Dhanmondi, Dhaka",
    date: "2025-11-03",
    time: "10:30 AM",
    cost: "500 TK",
    status: "Pending",
  },

  {
    id: 3,
    serviceName: "Electric Wiring Fix",
    category: "Electrical",
    customerName: "Tariq Islam",
    address: "Banani, Dhaka",
    date: "2025-11-06",
    time: "11:00 AM",
    cost: "250 TK",
    status: "In Queue",
  },
  {
    id: 4,
    serviceName: "CCTV Installation",
    category: "Electrical",
    customerName: "Nadia Hasan",
    address: "Gulshan 1, Dhaka",
    date: "2025-11-08",
    time: "04:00 PM",
    cost: "700 TK",
    status: "Pending",
  },

];

export default function MyPendingBookings() {
  // Filter bookings for this technician’s category only
  const filteredBookings = technicianBookings.filter(
    (booking) => booking.category === technicianCategory
  );

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">
          Pending Bookings Offer
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.serviceName}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Customer: {booking.customerName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Address: {booking.address}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date: {booking.date}, Time: {booking.time}
              </p>
              <p className="text-sm text-gray-500 mb-1">Cost: {booking.cost}</p>

              <p
                className={`mt-2 text-sm font-medium ${
                  booking.status === "In Queue"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {booking.status}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-green-600 hover:text-green-500 font-medium transition border border-green-300 rounded-lg hover:bg-green-50 text-sm">
                Accept
              </button>
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No bookings available for your category.
        </p>
      )}
    </div>
  );
}
