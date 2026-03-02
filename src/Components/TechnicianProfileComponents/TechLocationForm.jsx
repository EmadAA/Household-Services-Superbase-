// components/TechLocationForm.jsx - WITH INTEGRATED STATUS TOGGLE
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { supabase } from "../../../supabaseClient";

const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const CITIES = {
  Dhaka: [
    "Banani",
    "Gulshan",
    "Baridhara",
    "Bashundhara",
    "Uttara",
    "Mirpur",
    "Dhanmondi",
    "Mohammadpur",
    "Khilgaon",
    "Badda",
    "Rampura",
    "Malibagh",
    "Shahbag",
    "Motijheel",
    "Paltan",
    "Tejgaon",
    "Farmgate",
    "Lalbagh",
    "Old Dhaka",
    "Kakrail",
    "Moghbazar",
    "Shantinagar",
    "Agargaon",
    "Demra",
    "Jatrabari",
  ],
  Chittagong: [
    "Agrabad",
    "Nasirabad",
    "GEC Circle",
    "Panchlaish",
    "Khulshi",
    "Halishahar",
    "Chawkbazar",
    "Kotwali",
    "Anderkilla",
    "Patharghata",
    "Bakalia",
    "Muradpur",
    "2 No. Gate",
    "Oxygen",
    "EPZ",
    "Patenga",
    "Foy's Lake",
    "Bahaddarhat",
    "Sholashahar",
    "Lalkhan Bazar",
    "Tigerpass",
    "Kaptai Rashta Matha",
    "Mehedibag",
    "Kazir Dewri",
  ],
  Rajshahi: [
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Chapainawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokathi",
    "Patuakhali",
    "Pirojpur",
  ],
  Sylhet: [
    "Zindabazar",
    "Amberkhana",
    "Chowhatta",
    "Bondor Bazar",
    "Uposhohor",
    "Shahjalal Uposhohor",
    "Mirabazar",
    "Subidbazar",
    "Tilagor",
    "Shibgonj",
    "Baghbari",
    "South Surma",
    "Kumarpara",
    "Mejortila",
    "Akhalia",
    "Mendibagh",
    "Nayasarak",
    "Pathantula",
    "Dargah Gate",
    "Lamabazar",
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

export default function TechLocationForm({ technicianId }) {
  const [location, setLocation] = useState({
    service_division: "",
    service_city: "",
  });
  const [isActive, setIsActive] = useState(true);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  if (!technicianId) {
    return (
      <div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <p className="text-sm text-gray-500 text-center">Loading...</p>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technicianId]);

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      const { data } = await supabase
        .from("technicians")
        .select("service_division, service_city, is_active")
        .eq("id", technicianId)
        .single();

      if (data) {
        setLocation({
          service_division: data.service_division || "",
          service_city: data.service_city || "",
        });
        setIsActive(data.is_active ?? true); // Default to true if null
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const saveLocation = async () => {
    if (!location.service_division || !location.service_city) {
      alert("Please select both division and city");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("technicians")
        .update(location)
        .eq("id", technicianId);

      if (error) throw error;

      setIsEditingLocation(false);
      alert("Service area saved!");
    } catch (error) {
      alert("Failed to save: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveStatus = async (newStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("technicians")
        .update({ is_active: newStatus })
        .eq("id", technicianId);

      if (error) throw error;

      setIsActive(newStatus);
      setIsEditingStatus(false);
      alert(`Status updated! You are now ${newStatus ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (error) {
      alert("Failed to update status: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <p className="text-sm text-gray-500 text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* WORK AVAILABILITY STATUS SECTION */}
      <div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        {!isEditingStatus ? (
          /* STATUS VIEW MODE */
          <div className="w-full">
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">
                Work Availability Status
              </h3>
              <button
                onClick={() => setIsEditingStatus(true)}
                className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 border border-teal-900 rounded flex items-center gap-2"
              >
                <HiPencil />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                    {isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {isActive
                    ? "✅ You can receive new job assignments"
                    : "⏸️ You won't receive new assignments"}
                </p>
              </div>
            </div>

            {!isActive && (
              <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Note:</strong> You are currently INACTIVE. Admin
                  cannot assign you to new jobs. Change to ACTIVE when you're
                  ready to work.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* STATUS EDIT MODE */
          <div className="w-full">
            <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">
                Update Work Status
              </h3>
              <button
                onClick={() => setIsEditingStatus(false)}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Choose your availability status:
              </p>

              {/* Active Option */}
              <div
                onClick={() => !loading && saveStatus(true)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-300 hover:bg-green-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                        }`}
                    >
                      {isActive && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        ACTIVE - Available for Work
                      </p>
                      <p className="text-sm text-gray-600">
                        Admin can assign you to new jobs
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">✅</span>
                </div>
              </div>

              {/* Inactive Option */}
              <div
                onClick={() => !loading && saveStatus(false)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${!isActive
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-red-300 hover:bg-red-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isActive
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                        }`}
                    >
                      {!isActive && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        INACTIVE - Not Available
                      </p>
                      <p className="text-sm text-gray-600">
                        You won't receive new job assignments
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">⏸️</span>
                </div>
              </div>
            </div>

            {loading && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Updating status...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SERVICE AREA SECTION */}
      <div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        {!isEditingLocation ? (
          /* LOCATION VIEW MODE */
          <div className="w-full">
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">
                My Service Area
              </h3>
              <button
                onClick={() => setIsEditingLocation(true)}
                className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 border border-teal-900 rounded flex items-center gap-2"
              >
                <HiPencil />
                <span>Edit</span>
              </button>
            </div>

            {location.service_division && location.service_city ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Division</p>
                  <p className="text-base font-medium text-gray-900">
                    {location.service_division}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">City/District</p>
                  <p className="text-base font-medium text-gray-900">
                    {location.service_city}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                No service area set
              </div>
            )}
          </div>
        ) : (
          /* LOCATION EDIT MODE */
          <div className="w-full">
            <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">
                My Service Area
              </h3>
              <button
                onClick={() => setIsEditingLocation(false)}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <select
                  value={location.service_division}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      service_division: e.target.value,
                      service_city: "",
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                >
                  <option value="">Select Division</option>
                  {DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City/District *
                </label>
                <select
                  value={location.service_city}
                  disabled={!location.service_division}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      service_city: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="">
                    {location.service_division
                      ? "Select City"
                      : "Select Division first"}
                  </option>
                  {location.service_division &&
                    CITIES[location.service_division]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={saveLocation}
                disabled={
                  !location.service_division || !location.service_city || loading
                }
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Service Area"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}