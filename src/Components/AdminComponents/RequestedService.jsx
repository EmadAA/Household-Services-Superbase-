import { useState } from "react";

// Sample technicians — later you’ll fetch from Supabase (based on category)
const technicians = [
  { id: 1, name: "Rahim", category: "Electrician" },
  { id: 2, name: "Karim", category: "Plumber" },
  { id: 3, name: "Shuvo", category: "Cleaner" },
  { id: 4, name: "Rafi", category: "Cleaner" },
];

const requestedServices = [
  {
    id: 1,
    customerName: "Emad Uddin Adil",
    customerNumber: "01727199167",
    serviceName: "AC Maintenance",
    category: "Electrician",
    date: "2025-11-03",
    cost: "500 TK",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    problemDetails:
      "AC not cooling properly, needs gas refill and filter cleaning.",
  },
  {
    id: 2,
    customerName: "Farhan Shuvon",
    customerNumber: "01761303911",
    serviceName: "Plumbing Repair",
    category: "Plumber",
    date: "2025-11-04",
    cost: "300 TK",
    address: "Flat 3B, Gulshan Avenue, Gulshan-1, Dhaka",
    problemDetails: "Kitchen sink pipe leaking, needs replacement.",
  },
  {
    id: 3,
    customerName: "Mukter",
    customerNumber: "01761303911",
    serviceName: "Plumbing Repair",
    category: "Cleaner",
    date: "2025-11-04",
    cost: "300 TK",
    address: "Flat 3B, Gulshan Avenue, Gulshan-1, Dhaka",
    problemDetails: "Home cleaning needed for 3-bedroom apartment.",
  },
];

export default function RequestedService() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState("");

  // ✅ Open popup and store which service is being assigned
  const handleAssignClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  // ✅ Assign technician (Later this will update Supabase)
  const handleConfirmAssign = () => {
    if (!selectedTechnician) {
      alert("Please select a technician before assigning.");
      return;
    }

    console.log(
      `Assigned technician ${selectedTechnician} to service ID ${selectedService.id}`
    );
    alert(
      `✅ ${selectedTechnician} assigned to ${selectedService.serviceName}`
    );

    setShowModal(false);
    setSelectedTechnician("");
  };

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">
          Requested Services (Pending Approval)
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {requestedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {service.serviceName}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {service.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">Date: {service.date}</p>
              <p className="text-sm text-gray-500 mb-1">Cost: {service.cost}</p>

              <div className="mt-3 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Customer Name:
                </p>
                <p className="text-xs text-gray-600">{service.customerName}</p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Customer Number:
                </p>
                <p className="text-xs text-gray-600">
                  {service.customerNumber}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Address:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.address}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {service.problemDetails}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleAssignClick(service)}
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border border-teal-300 rounded-lg hover:bg-teal-50 text-sm"
              >
                Assign To
              </button>
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[400px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Assign Technician
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              Service: <strong>{selectedService.serviceName}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Category: <strong>{selectedService.category}</strong>
            </p>

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Technician:
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={selectedTechnician}
              onChange={(e) => setSelectedTechnician(e.target.value)}
            >
              <option value="">-- Choose Technician --</option>
              {technicians
                .filter(
                  (tech) => tech.category === selectedService.category
                )
                .map((tech) => (
                  <option key={tech.id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
            </select>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssign}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 text-sm"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
