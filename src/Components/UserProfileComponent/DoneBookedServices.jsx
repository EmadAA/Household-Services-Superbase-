import { useState } from "react";

const pastServices = [
  {
    id: 1,
    name: "AC Repair",
    category: "Electrician",
    orderedDate: "2025-10-01 10:30 AM",
    completedDate: "2025-10-02 04:45 PM",
    cost: "500 TK",
    tranxID: "TXN-784512",
  },
  {
    id: 2,
    name: "Pipe Fixing",
    category: "Plumber",
    orderedDate: "2025-10-03 02:00 PM",
    completedDate: "2025-10-03 06:30 PM",
    cost: "300 TK",
    tranxID: "TXN-784513",
  },
  {
    id: 3,
    name: "Full House Cleaning",
    category: "Cleaner",
    orderedDate: "2025-10-05 09:00 AM",
    completedDate: "2025-10-05 02:15 PM",
    cost: "800 TK",
    tranxID: "TXN-784514",
  },
  {
    id: 4,
    name: "Furniture Polishing",
    category: "Carpenter",
    orderedDate: "2025-10-07 11:15 AM",
    completedDate: "2025-10-08 03:40 PM",
    cost: "600 TK",
    tranxID: "TXN-784515",
  },
  {
    id: 5,
    name: "Pest Control",
    category: "Pest Control Expert",
    orderedDate: "2025-10-10 09:30 AM",
    completedDate: "2025-10-10 01:00 PM",
    cost: "400 TK",
    tranxID: "TXN-784516",
  },
  {
    id: 6,
    name: "Painting",
    category: "Home Decor",
    orderedDate: "2025-10-11 08:00 AM",
    completedDate: "2025-10-13 06:00 PM",
    cost: "1000 TK",
    tranxID: "TXN-784517",
  },
  
];

export default function DoneBookedServices() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Past Bookings Services</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {pastServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Technician Category: {service.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">Cost: {service.cost}</p>
              <p className="mt-2 text-sm font-medium text-green-600">Completed</p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => setSelectedService(service)}
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-blue-600 hover:text-blue-500 font-medium transition border border-blue-300 rounded-lg hover:bg-blue-50 text-sm"
              >
                View Details
              </button>
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-gray-600 hover:text-gray-500 font-medium transition border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Rebook Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedService.name}
            </h3>

            <div className="text-gray-600 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Technician Category:</span>{" "}
                {selectedService.category}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Ordered On:</span>{" "}
                {selectedService.orderedDate}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Completed On:</span>{" "}
                {selectedService.completedDate}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Cost:</span>{" "}
                {selectedService.cost}
              </p>
              {selectedService.tranxID && (
                <p>
                  <span className="font-semibold text-gray-700">Transaction ID:</span>{" "}
                  {selectedService.tranxID}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
