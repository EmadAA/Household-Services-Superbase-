import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const CATEGORY_MAP = {
  electrician: "Electrician",
  plumber: "Plumber",
  ac_refrigerator_expert: "AC & Refrigerator Expert",
  carpenter: "Carpenter",
  painter: "Painter",
  cleaner: "Cleaner",
  decorator: "Decorator (Home Events)",
  housemaid: "Housemaid",
  mover: "Mover",
  pest_control_expert: "Pest Control Expert",
};

const ServiceSelector = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [openService, setOpenService] = useState(null);
  const [selectedSubs, setSelectedSubs] = useState([]); // ✅ changed
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", number: "" });
  const [formData, setFormData] = useState({
    address: "",
    date: "",
    problemDetails: "",
  });

  /* Fetch available technicians */
  useEffect(() => {
    const fetchAvailableTechnicians = async () => {
      const { data, error } = await supabase
        .from("technicians")
        .select("category");

      if (error) {
        console.error("Error fetching technicians:", error);
        return;
      }

      const uniqueCategories = [...new Set(data.map((t) => t.category))];

      const mappedServices = uniqueCategories
        .map((cat) => CATEGORY_MAP[cat])
        .filter(Boolean);

      setAvailableServices(mappedServices);
    };

    fetchAvailableTechnicians();
  }, []);

  /* Fetch customer info */
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) return;

      const storedUserId = localStorage.getItem("userId");

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", storedUserId)
        .maybeSingle();

      setCustomerInfo({
        name:
          userData?.fullname ||
          session.user.user_metadata?.full_name ||
          session.user.email,
        number: userData?.mobile || session.user.phone || "",
      });
    };

    fetchCustomerInfo();
  }, []);

const services = {
  "AC & Refrigerator Expert": [
    { name: "AC Installation", price: 1200 },
    { name: "AC Gas Refill", price: 800 },
    { name: "Refrigerator Repair", price: 1000 },
    { name: "Cooling Maintenance", price: 600 },
    { name: "AC Deep Cleaning", price: 900 },
    { name: "AC Compressor Repair", price: 1500 },
    { name: "Freezer Repair", price: 950 },
    { name: "Ice Maker Installation", price: 850 },
    { name: "Thermostat Replacement", price: 700 },
    { name: "AC Duct Cleaning", price: 1100 },
    { name: "Refrigerator Door Seal Replacement", price: 500 },
    { name: "AC Remote Repair", price: 300 },
  ],
  Plumber: [
    { name: "Pipe Leakage Repair", price: 400 },
    { name: "Tap Installation", price: 300 },
    { name: "Bathroom Fitting", price: 600 },
    { name: "Water Tank Cleaning", price: 700 },
    { name: "Drainage Cleaning", price: 500 },
    { name: "Toilet Installation", price: 800 },
    { name: "Water Heater Installation", price: 1000 },
    { name: "Sink Installation", price: 450 },
    { name: "Shower Installation", price: 650 },
    { name: "Water Pump Repair", price: 900 },
    { name: "Geyser Repair", price: 750 },
    { name: "Bathroom Tiles Fixing", price: 850 },
    { name: "Kitchen Sink Repair", price: 400 },
    { name: "Sewer Line Cleaning", price: 1200 },
  ],
  Carpenter: [
    { name: "Furniture Repair", price: 500 },
    { name: "Door Fitting", price: 450 },
    { name: "Wood Polishing", price: 650 },
    { name: "Custom Furniture Design", price: 1200 },
    { name: "Wardrobe Installation", price: 1500 },
    { name: "Cabinet Making", price: 1800 },
    { name: "Window Frame Repair", price: 600 },
    { name: "Bed Frame Construction", price: 2000 },
    { name: "Dining Table Repair", price: 700 },
    { name: "Shelf Installation", price: 400 },
    { name: "Door Lock Fitting", price: 350 },
    { name: "Wooden Flooring", price: 2500 },
    { name: "Kitchen Cabinet Installation", price: 2200 },
    { name: "Sofa Frame Repair", price: 800 },
  ],
  Electrician: [
    { name: "Wiring & Circuit Repair", price: 500 },
    { name: "Light Installation", price: 250 },
    { name: "Switchboard Fixing", price: 300 },
    { name: "Fan & Appliance Setup", price: 400 },
    { name: "Ceiling Fan Installation", price: 450 },
    { name: "Socket Repair", price: 200 },
    { name: "Chandelier Installation", price: 800 },
    { name: "Generator Installation", price: 1500 },
    { name: "Voltage Stabilizer Setup", price: 600 },
    { name: "CCTV Camera Installation", price: 1200 },
    { name: "Electrical Panel Upgrade", price: 1800 },
    { name: "Door Bell Installation", price: 350 },
    { name: "Emergency Light Setup", price: 500 },
    { name: "MCB Replacement", price: 400 },
  ],
  Painter: [
    { name: "Interior Painting", price: 1500 },
    { name: "Exterior Painting", price: 2000 },
    { name: "Ceiling Design", price: 1000 },
    { name: "Texture & Polish", price: 800 },
    { name: "Wall Putty Work", price: 900 },
    { name: "Waterproofing", price: 1200 },
    { name: "Wood Varnishing", price: 700 },
    { name: "Door & Window Painting", price: 600 },
    { name: "Stencil Design", price: 850 },
    { name: "Wallpaper Installation", price: 1100 },
    { name: "Color Consultation", price: 300 },
    { name: "Fence Painting", price: 1300 },
    { name: "Asian Paint Application", price: 1600 },
    { name: "Touch-up & Repair", price: 500 },
  ],
  Cleaner: [
    { name: "Home Deep Cleaning", price: 1000 },
    { name: "Office Cleaning", price: 1200 },
    { name: "Carpet & Sofa Wash", price: 700 },
    { name: "Bathroom Sanitization", price: 600 },
    { name: "Kitchen Deep Cleaning", price: 900 },
    { name: "Window & Glass Cleaning", price: 500 },
    { name: "Floor Scrubbing & Polishing", price: 800 },
    { name: "Balcony Cleaning", price: 400 },
    { name: "Curtain Washing", price: 600 },
    { name: "Mattress Cleaning", price: 750 },
    { name: "AC Filter Cleaning", price: 350 },
    { name: "Car Interior Cleaning", price: 850 },
    { name: "Garage Cleaning", price: 550 },
    { name: "After Party Cleaning", price: 1100 },
  ],
  "Decorator (Home Events)": [
    { name: "Stage Decoration", price: 1500 },
    { name: "Balloon & Floral Setup", price: 500 },
    { name: "Lighting Arrangement", price: 800 },
    { name: "Themed Event Design", price: 1000 },
    { name: "Birthday Party Decoration", price: 1200 },
    { name: "Wedding Decoration", price: 3000 },
    { name: "Anniversary Setup", price: 1400 },
    { name: "Baby Shower Decoration", price: 1100 },
    { name: "Engagement Decoration", price: 2000 },
    { name: "Naming Ceremony Setup", price: 900 },
    { name: "Haldi Ceremony Decoration", price: 1600 },
    { name: "Mehendi Function Decor", price: 1500 },
    { name: "Surprise Party Setup", price: 700 },
    { name: "Table Decoration", price: 600 },
  ],
  Housemaid: [
    { name: "Daily Cleaning", price: 400 },
    { name: "Cooking Service", price: 600 },
    { name: "Clothes Washing", price: 300 },
    { name: "Utensil Cleaning", price: 250 },
    { name: "Ironing Service", price: 350 },
    { name: "Grocery Shopping", price: 200 },
    { name: "Baby Care", price: 800 },
    { name: "Elderly Care", price: 900 },
    { name: "Pet Care", price: 500 },
    { name: "Laundry Service", price: 450 },
    { name: "Garden Maintenance", price: 550 },
    { name: "Meal Preparation", price: 700 },
    { name: "House Sitting", price: 600 },
    { name: "Dusting & Mopping", price: 350 },
  ],
  Mover: [
    { name: "Home Shifting", price: 2000 },
    { name: "Office Relocation", price: 2500 },
    { name: "Furniture Transport", price: 1800 },
    { name: "Packing & Unpacking", price: 1000 },
    { name: "Car Transportation", price: 3000 },
    { name: "Bike Transportation", price: 1500 },
    { name: "Interstate Moving", price: 5000 },
    { name: "Piano Moving", price: 2200 },
    { name: "Warehouse Shifting", price: 3500 },
    { name: "Loading & Unloading", price: 800 },
    { name: "Storage Service", price: 1200 },
    { name: "Pet Relocation", price: 1600 },
    { name: "International Moving", price: 8000 },
    { name: "Fragile Items Transport", price: 2000 },
  ],
  "Pest Control Expert": [
    { name: "Cockroach Control", price: 700 },
    { name: "Termite Treatment", price: 1200 },
    { name: "Mosquito & Fly Control", price: 600 },
    { name: "Rodent Removal", price: 900 },
    { name: "Bed Bug Treatment", price: 1100 },
    { name: "Ant Control", price: 550 },
    { name: "Lizard Repellent", price: 500 },
    { name: "Spider Control", price: 650 },
    { name: "Moth Control", price: 600 },
    { name: "Snake Catching", price: 1500 },
    { name: "Bee Hive Removal", price: 1300 },
    { name: "General Pest Control", price: 800 },
    { name: "Wood Borer Treatment", price: 1000 },
    { name: "Garden Pest Control", price: 900 },
  ],
};
  // ✅ Toggle multiple selection
  const handleSelect = (service, sub) => {
    const exists = selectedSubs.find(
      (item) => item.service === service && item.sub.name === sub.name,
    );

    if (exists) {
      setSelectedSubs(
        selectedSubs.filter(
          (item) => !(item.service === service && item.sub.name === sub.name),
        ),
      );
    } else {
      setSelectedSubs([...selectedSubs, { service, sub }]);
    }
  };

  const handleOrderClick = () => {
    if (selectedSubs.length === 0) {
      alert("Please select at least one service option!");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");

    const orderDetails = {
      user_id: storedUserId,
      category: [...new Set(selectedSubs.map((i) => i.service))].join(" + "),
      service_name: selectedSubs.map((i) => i.sub.name).join(" + "),
      price: selectedSubs.reduce((t, i) => t + i.sub.price, 0),
      address: formData.address,
      date: formData.date,
      problem_details: formData.problemDetails,
      customer_name: customerInfo.name,
      customer_number: customerInfo.number,
      ordered_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("request_services")
      .insert([orderDetails]);

    if (error) {
      alert("Failed to submit order!");
    } else {
      alert("Order placed successfully!");
      setShowForm(false);
      setSelectedSubs([]);
      setFormData({ address: "", date: "", problemDetails: "" });
    }
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-6 border-2 shadow-md rounded-lg border-gray-200 my-12 relative">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Choose Your Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(services).map((service) => {
          const isAvailable = availableServices.includes(service);

          return (
            <div
              key={service}
              className="relative bg-white border border-gray-200 rounded-2xl shadow-md"
            >
              <button
                disabled={!isAvailable}
                onClick={() =>
                  isAvailable &&
                  setOpenService(openService === service ? null : service)
                }
                className={`w-full px-5 py-3 text-left rounded-2xl flex justify-between items-center font-medium ${
                  openService === service
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                    : isAvailable
                      ? "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="flex flex-col">
                  <span>{service}</span>
                  {!isAvailable && (
                    <span className="text-xs text-red-500 font-medium">
                      Not available right now
                    </span>
                  )}
                </span>
                <span>{openService === service ? "▲" : "▼"}</span>
              </button>

              {openService === service && isAvailable && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 space-y-2 z-10">
                  {services[service].map((sub, index) => {
                    const isSelected = selectedSubs.some(
                      (item) =>
                        item.service === service && item.sub.name === sub.name,
                    );

                    return (
                      <div
                        key={index}
                        onClick={() => handleSelect(service, sub)}
                        className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium border flex justify-between ${
                          isSelected
                            ? "bg-cyan-100 border-cyan-400"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className="text-xs font-semibold">
                          {sub.price} Tk
                        </span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between mt-4">
                    <button
                      className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg"
                      onClick={handleOrderClick}
                    >
                      Order
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-sm rounded-lg"
                      onClick={() => {
                        setOpenService(null);
                        setSelectedSubs([]);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                disabled
                value={[...new Set(selectedSubs.map((i) => i.service))].join(
                  " + ",
                )}
                className="w-full p-2 border rounded"
              />

              <input
                disabled
                value={selectedSubs.map((i) => i.sub.name).join(" + ")}
                className="w-full p-2 border rounded"
              />
              <input
                disabled
                value={selectedSubs.reduce((t, i) => t + i.sub.price, 0)}
                className="w-full p-2 border rounded"
              />
              <input
                required
                placeholder="Address"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <textarea
                placeholder="Problem details"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problemDetails: e.target.value,
                  })
                }
              />
              <button className="w-full bg-cyan-500 text-white p-2 rounded">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
