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
  const [selectedSub, setSelectedSub] = useState(null);
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

  const handleOrderClick = () => {
    if (!selectedSub) {
      alert("Please select a service option first!");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");

    const orderDetails = {
      user_id: storedUserId,
      category: selectedSub.service,
      service_name: selectedSub.sub.name,
      price: selectedSub.sub.price,
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
                  {services[service].map((sub, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(service, sub)}
                      className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium border flex justify-between ${
                        selectedSub?.service === service &&
                        selectedSub?.sub?.name === sub.name
                          ? "bg-cyan-100 border-cyan-400"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span>{sub.name}</span>
                      <span className="text-xs font-semibold">
                        {sub.price} Tk
                      </span>
                    </div>
                  ))}

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
                        setSelectedSub(null);
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
                value={selectedSub.service}
                className="w-full p-2 border rounded"
              />
              <input
                disabled
                value={selectedSub.sub.name}
                className="w-full p-2 border rounded"
              />
              <input
                disabled
                value={selectedSub.sub.price}
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
                className="w-full p-2 border rounded"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <textarea
                placeholder="Problem details"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, problemDetails: e.target.value })
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
