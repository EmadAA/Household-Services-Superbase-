// components/TechLocationForm.jsx - MATCHING PERSONAL INFO WIDTH
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
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chittagong: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cumilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachhari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
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
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
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
  const [isEditing, setIsEditing] = useState(false);
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
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technicianId]);

  const fetchLocation = async () => {
    try {
      setFetchLoading(true);
      const { data } = await supabase
        .from("technicians")
        .select("service_division, service_city")
        .eq("id", technicianId)
        .single();

      if (data) {
        setLocation({
          service_division: data.service_division || "",
          service_city: data.service_city || "",
        });
      }
    } catch (error) {
      console.error("Fetch location error:", error);
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

      setIsEditing(false);
      alert("Service area saved!");
    } catch (error) {
      alert("Failed to save: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  if (fetchLoading) {
    return (
      <div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <p className="text-sm text-gray-500 text-center">Loading location...</p>
      </div>
    );
  }

  return (
<div className="mt-6 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      {/* VIEW MODE */}
      {!isEditing ? (
        <div className="w-full">
          <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">
              My Service Area
            </h3>
            <button
              onClick={() => setIsEditing(true)}
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
        /* EDIT MODE */
        <div className="w-full">
          <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">
              My Service Area
            </h3>
            <button
              onClick={cancelEdit}
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
  );
}
