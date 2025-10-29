import { useState } from "react";

const ServiceSelector = () => {
  const [openService, setOpenService] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  // ✅ Added prices for each sub-service
  const services = {
    "AC & Refrigerator Expert": [
      { name: "AC Installation", price: 1200 },
      { name: "AC Gas Refill", price: 800 },
      { name: "Refrigerator Repair", price: 1000 },
      { name: "Cooling Maintenance", price: 600 },
    ],
    Plumber: [
      { name: "Pipe Leakage Repair", price: 400 },
      { name: "Tap Installation", price: 300 },
      { name: "Bathroom Fitting", price: 600 },
      { name: "Water Tank Cleaning", price: 700 },
    ],
    Carpenter: [
      { name: "Furniture Repair", price: 500 },
      { name: "Door Fitting", price: 450 },
      { name: "Wood Polishing", price: 650 },
      { name: "Custom Furniture Design", price: 1200 },
    ],
    Electrician: [
      { name: "Wiring & Circuit Repair", price: 500 },
      { name: "Light Installation", price: 250 },
      { name: "Switchboard Fixing", price: 300 },
      { name: "Fan & Appliance Setup", price: 400 },
    ],
    Painter: [
      { name: "Interior Painting", price: 1500 },
      { name: "Exterior Painting", price: 2000 },
      { name: "Ceiling Design", price: 1000 },
      { name: "Texture & Polish", price: 800 },
    ],
    Cleaner: [
      { name: "Home Deep Cleaning", price: 1000 },
      { name: "Office Cleaning", price: 1200 },
      { name: "Carpet & Sofa Wash", price: 700 },
      { name: "Bathroom Sanitization", price: 600 },
    ],
    "Decorator (Home Events)": [
      { name: "Stage Decoration", price: 1500 },
      { name: "Balloon & Floral Setup", price: 500 },
      { name: "Lighting Arrangement", price: 800 },
      { name: "Themed Event Design", price: 1000 },
    ],
    Housemaid: [
      { name: "Daily Cleaning", price: 400 },
      { name: "Cooking Service", price: 600 },
      { name: "Clothes Washing", price: 300 },
      { name: "Utensil Cleaning", price: 250 },
    ],
    Mover: [
      { name: "Home Shifting", price: 2000 },
      { name: "Office Relocation", price: 2500 },
      { name: "Furniture Transport", price: 1800 },
      { name: "Packing & Unpacking", price: 1000 },
    ],
    "Pest Control Expert": [
      { name: "Cockroach Control", price: 700 },
      { name: "Termite Treatment", price: 1200 },
      { name: "Mosquito & Fly Control", price: 600 },
      { name: "Rodent Removal", price: 900 },
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
        style={{ paddingBottom: openService ? "320px" : "0" }}
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

            {/* Dropdown */}
            {openService === service && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 space-y-2 animate-fadeIn z-10">
                {services[service].map((sub, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(service, sub)}
                    className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium border flex justify-between items-center transition-all ${
                      selectedSub?.service === service &&
                      selectedSub?.sub?.name === sub.name
                        ? "bg-cyan-100 border-cyan-400 text-cyan-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="text-gray-500 font-semibold text-xs">
                      {sub.price} Tk
                    </span>
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition"
                    onClick={() =>
                      alert(
                        selectedSub?.service === service
                          ? `Ordered: ${selectedSub.sub.name} (${service}) - ${selectedSub.sub.price} Tk`
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
