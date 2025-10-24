import { useState } from "react";

const ServiceSelector = () => {
  const [openService, setOpenService] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  const services = {
    "AC & Refrigerator Expert": [
      "AC Installation",
      "AC Gas Refill",
      "Refrigerator Repair",
      "Cooling Maintenance",
    ],
    Plumber: [
      "Pipe Leakage Repair",
      "Tap Installation",
      "Bathroom Fitting",
      "Water Tank Cleaning",
    ],
    Carpenter: [
      "Furniture Repair",
      "Door Fitting",
      "Wood Polishing",
      "Custom Furniture Design",
    ],
    Electrician: [
      "Wiring & Circuit Repair",
      "Light Installation",
      "Switchboard Fixing",
      "Fan & Appliance Setup",
    ],
    Painter: [
      "Interior Painting",
      "Exterior Painting",
      "Ceiling Design",
      "Texture & Polish",
    ],
    Cleaner: [
      "Home Deep Cleaning",
      "Office Cleaning",
      "Carpet & Sofa Wash",
      "Bathroom Sanitization",
    ],
    "Decorator (Home Events)": [
      "Stage Decoration",
      "Balloon & Floral Setup",
      "Lighting Arrangement",
      "Themed Event Design",
    ],
    Housemaid: [
      "Daily Cleaning",
      "Cooking Service",
      "Clothes Washing",
      "Utensil Cleaning",
    ],
    Mover: [
      "Home Shifting",
      "Office Relocation",
      "Furniture Transport",
      "Packing & Unpacking",
    ],
    "Pest Control Expert": [
      "Cockroach Control",
      "Termite Treatment",
      "Mosquito & Fly Control",
      "Rodent Removal",
    ],
  };

  const handleSelect = (service, sub) => {
    setSelectedSub({ service, sub });
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-6 border-2 shadow-md rounded-lg border-gray-200 my-12">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Choose Your Service
      </h2>

      {/* Responsive Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        style={{ paddingBottom: openService ? '320px' : '0' }}
      >
        {Object.keys(services).map((service) => (
          <div
            key={service}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Header Button */}
            <button
              onClick={() =>
                setOpenService(openService === service ? null : service)
              }
              className={`w-full px-5 py-3 text-left rounded-2xl flex justify-between items-center font-medium ${
                openService === service
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {service}
              <span>{openService === service ? "▲" : "▼"}</span>
            </button>
 
            {/* Dropdown -*/}
            {openService === service && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 space-y-2 animate-fadeIn z-10">
                {services[service].map((sub, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(service, sub)}
                    className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium border transition-all ${
                      selectedSub?.service === service &&
                      selectedSub?.sub === sub
                        ? "bg-cyan-100 border-cyan-400 text-cyan-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {sub}
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition"
                    onClick={() =>
                      alert(
                        selectedSub?.service === service
                          ? `Ordered: ${selectedSub.sub} (${service})`
                          : "Please select a service option first!"
                      )
                    }
                  >
                    Order
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition"
                    onClick={() => {
                      setOpenService(null);
                      setSelectedSub(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;