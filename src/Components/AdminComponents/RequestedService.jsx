import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const normalizeCategory = (value = "") => {
  const v = value.toLowerCase().trim();
  if (v === "ac & refrigerator expert") return "ac_refrigerator_expert";
  if (v === "ac_refrigerator_expert") return "ac_refrigerator_expert";
  return v;
};

export default function RequestedService() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequestedServices();
    fetchTechnicians();
  }, []);

  const fetchRequestedServices = async () => {
    try {
      const { data, error } = await supabase
        .from("request_services")
        .select("*")
        .eq("status", "Pending"); // only pending for admin

      if (error) throw error;

      console.log("Fetched services:", data);
      setRequestedServices(data || []);
    } catch (error) {
      console.error("Error fetching requested services:", error);
      alert("Failed to load requested services");
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const { data, error } = await supabase.from("technicians").select("*");

      if (error) throw error;

      console.log("Fetched technicians:", data);
      setTechnicians(data || []);
    } catch (error) {
      console.error("Error fetching technicians:", error);
      alert("Failed to load technicians");
    }
  };

  const handleAssignClick = (service) => {
    setSelectedService(service);
    setSelectedTechnician("");
    setShowModal(true);
  };

  const handleConfirmAssign = async () => {
    if (!selectedTechnician) {
      alert("Please select a technician before assigning.");
      return;
    }

    const technicianObj = technicians.find(
      (tech) => tech.fullname === selectedTechnician
    );

    if (!technicianObj) {
      alert("Selected technician not found.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("request_services")
        .update({
          technician_id: technicianObj.id, // requires technician_id column
          status: "Assigned",
        })
        .eq("id", selectedService.id)
        .select();

      if (error) throw error;

      console.log("Updated request_services row:", data);

      setRequestedServices((prev) =>
        prev.filter((req) => req.id !== selectedService.id)
      );

      alert(
        `✅ ${selectedTechnician} assigned to ${
          selectedService.serviceName || selectedService.service_name
        }`
      );

      setShowModal(false);
      setSelectedTechnician("");
      setSelectedService(null);
    } catch (err) {
      console.error("Error assigning technician:", err);
      alert("Failed to assign technician. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

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
                {service.serviceName || service.service_name || "N/A"}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {service.category || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date: {service.date || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Cost: {service.cost || "N/A"}
              </p>

              <div className="mt-3 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Customer Name:
                </p>
                <p className="text-xs text-gray-600">
                  {service.customerName || service.customer_name || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Customer Number:
                </p>
                <p className="text-xs text-gray-600">
                  {service.customerNumber || service.customer_number || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Address:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.address || "N/A"}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {service.problemDetails ||
                    service.problem_details ||
                    "N/A"}
                </p>
              </div>
            </div>

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

      {showModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[400px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Assign Technician
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              Service:{" "}
              <strong>
                {selectedService.serviceName ||
                  selectedService.service_name ||
                  "N/A"}
              </strong>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Category:{" "}
              <strong>{selectedService.category || "N/A"}</strong>
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
                .filter((tech) => {
                  const techCategory = normalizeCategory(
                    tech.category || tech.Category
                  );
                  const serviceCategory = normalizeCategory(
                    selectedService.category || selectedService.Category
                  );
                  return techCategory === serviceCategory;
                })
                .map((tech) => (
                  <option key={tech.id} value={tech.fullname}>
                    {tech.fullname}
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
