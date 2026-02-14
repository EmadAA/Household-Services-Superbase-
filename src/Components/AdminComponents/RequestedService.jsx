/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { sendAssignmentNotifications } from "../../utils/emailNotifications";

const normalizeCategory = (value = "") => {
  const v = value.toLowerCase().trim();
  if (v === "ac & refrigerator expert") return "ac_refrigerator_expert";
  if (v === "ac_refrigerator_expert") return "ac_refrigerator_expert";
  return v;
};

const getTechnicianLabel = (tech) => {
  let label = tech.fullname || "Unnamed Technician";
  
  if (tech.service_division && tech.service_city) {
    label += ` (${tech.service_division} - ${tech.service_city})`;
  }
  
  if (tech.is_busy) {
    label += " (Busy)";
  }
  
  return label;
};

export default function RequestedService() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [requestedServices, setRequestedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [servicesRes, techsRes] = await Promise.all([
        supabase.from("request_services").select("*").eq("status", "Pending"),
        supabase.from("technicians").select("*")
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (techsRes.error) throw techsRes.error;

      setRequestedServices(servicesRes.data || []);
      setTechnicians(techsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = (service) => {
    setSelectedService(service);
    setSelectedTechnicianId("");
    setShowModal(true);
  };

  const isTechnicianAvailable = async (technicianId) => {
    const { data, error } = await supabase
      .from("request_services")
      .select("id, status")
      .eq("technician_id", technicianId)
      .neq("status", "Completed")
      .limit(1);

    if (error) throw error;
    return !data || data.length === 0;
  };

  const handleConfirmAssign = async () => {
    if (!selectedTechnicianId) {
      alert("Please select a technician before assigning.");
      return;
    }

    const technicianObj = technicians.find((tech) => tech.id === selectedTechnicianId);
    if (!technicianObj) {
      alert("Selected technician not found.");
      return;
    }

    try {
      setAssigning(true);

      const available = await isTechnicianAvailable(technicianObj.id);
      if (!available) {
        alert(`${technicianObj.fullname} is already working on another job.`);
        return;
      }

      // Update database - assign technician
      const { data, error } = await supabase
        .from("request_services")
        .update({
          technician_id: technicianObj.id,
          status: "Assigned",
        })
        .eq("id", selectedService.id)
        .select();

      if (error) throw error;

      //SEND EMAIL NOTIFICATIONS
      console.log("Sending email notifications...");
      
      // Fetch customer data from users table using user_id
      const { data: customerUser, error: customerError } = await supabase
        .from('users')
        .select('email, fullname, mobile')
        .eq('id', selectedService.user_id)
        .single();

      if (customerError) {
        console.error("Error fetching customer data:", customerError);
      }

      // Prepare customer data (prioritize users table data)
      const customerData = {
        email: customerUser?.email || selectedService.customer_email,
        name: customerUser?.fullname || selectedService.customer_name,
        phone: customerUser?.mobile || selectedService.customer_number
      };

      console.log("Customer data:", customerData);

      // Prepare technician data
      const technicianData = {
        email: technicianObj.email,
        name: technicianObj.fullname,
        phone: technicianObj.mobile,
        category: technicianObj.category
      };

      console.log("Technician data:", technicianData);

      // Prepare service data
      const serviceData = {
        serviceName: selectedService.service_name || selectedService.serviceName,
        category: selectedService.category,
        date: selectedService.date,
        cost: selectedService.cost || selectedService.price,
        address: selectedService.address,
        problemDetails: selectedService.problem_details || selectedService.problemDetails || "No details provided"
      };

      console.log("Service data:", serviceData);

      // Send notifications
      const notificationResult = await sendAssignmentNotifications(
        customerData,
        technicianData,
        serviceData
      );

      if (notificationResult.success) {
        console.log("Email notifications sent successfully!");
      } else {
        console.warn("Some email notifications failed, but assignment was successful");
        console.log("Notification errors:", notificationResult);
      }

      // Update UI state
      setTechnicians((prev) =>
        prev.map((t) =>
          t.id === technicianObj.id ? { ...t, is_busy: true } : t
        )
      );

      setRequestedServices((prev) =>
        prev.filter((req) => req.id !== selectedService.id)
      );

      alert(
        `${getTechnicianLabel(technicianObj)} assigned successfully!\n${
          notificationResult.success 
            ? "Email notifications sent to customer and technician." 
            : "Assignment successful, but some email notifications may have failed. Check console for details."
        }`
      );
      
      setShowModal(false);
      setSelectedTechnicianId("");
      setSelectedService(null);
    } catch (err) {
      console.error("Error assigning technician:", err);
      alert("Failed to assign technician. Please try again.");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading requested services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px] bg-white">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">
          Requested Services (Pending Approval)
        </h2>
        <button
          onClick={fetchAllData}
          className="px-4 py-2 text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {requestedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.serviceName || service.service_name || "Service"}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {service.category || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date: {service.date || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Cost: ৳{service.cost || service.price || "N/A"}
              </p>

              <div className="mt-3 space-y-1">
                <p className="text-xs font-semibold text-gray-700">Customer</p>
                <p className="text-xs text-gray-600">
                  {service.customerName || service.customer_name || "N/A"}
                </p>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-gray-700">Phone</p>
                <p className="text-xs text-gray-600">
                  {service.customerNumber || service.customer_number || "N/A"}
                </p>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-gray-700">Address</p>
                <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                  {service.address || "N/A"}
                </p>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-xs font-semibold text-gray-700">Problem</p>
                <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                  {service.problemDetails || service.problem_details || "Details not provided"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => handleAssignClick(service)}
                className="flex items-center justify-center px-4 py-2 text-teal-600 hover:text-teal-700 font-medium border border-teal-300 rounded-lg hover:bg-teal-50 text-sm transition-all"
              >
                Assign Technician
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-red-600 hover:text-red-700 font-medium border border-red-300 rounded-lg hover:bg-red-50 text-sm transition-all">
                Cancel Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*BOLD BORDER SELECTION */}
      {showModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">
              Assign Technician
            </h3>

            <div className="space-y-2 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Service:</span> 
                <span className="ml-1">{selectedService.serviceName || selectedService.service_name}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Category:</span> 
                <span className="ml-1">{selectedService.category}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Customer:</span> 
                <span className="ml-1">{selectedService.customer_name || selectedService.customerName}</span>
              </p>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Technician
            </label>
            
            <div className="border border-gray-300 rounded-lg p-3 bg-white max-h-60 overflow-y-auto mb-6 shadow-sm">
              {technicians
                .filter((tech) => {
                  const techCategory = normalizeCategory(tech.category || tech.Category);
                  const serviceCategory = normalizeCategory(selectedService.category || selectedService.Category);
                  return techCategory === serviceCategory;
                })
                .map((tech) => {
                  const label = getTechnicianLabel(tech);
                  const isSelected = selectedTechnicianId === tech.id;
                  return (
                    <div
                      key={tech.id}
                      className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
                        isSelected 
                          ? "border-4 border-teal-400 bg-teal-50 shadow-md" 
                          : "hover:border-teal-300"
                      }`}
                      onClick={() => setSelectedTechnicianId(tech.id)}
                    >
                      <div className="font-medium text-sm text-gray-800 mb-1">
                        {label}
                      </div>
                      <div className="text-xs text-gray-600">
                        Phone: {tech.mobile || "Not provided"} | Category: {tech.category || "N/A"}
                        {tech.is_busy && (
                          <span className="ml-2 inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                            Busy
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              
              {technicians.filter((tech) => {
                const techCategory = normalizeCategory(tech.category || tech.Category);
                const serviceCategory = normalizeCategory(selectedService.category || selectedService.Category);
                return techCategory === serviceCategory;
              }).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm font-medium mb-1">No technicians available</p>
                  <p className="text-xs">for "{selectedService.category}" category</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                disabled={assigning}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssign}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
                disabled={!selectedTechnicianId || assigning}
              >
                {assigning ? "Assigning..." : "Assign Technician"}
              </button>
            </div>
          </div>
        </div>
      )}

      {requestedServices.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 font-medium mb-1">No pending requests</p>
          <p className="text-sm text-gray-400">All services have been assigned or cancelled</p>
        </div>
      )}
    </div>
  );
}