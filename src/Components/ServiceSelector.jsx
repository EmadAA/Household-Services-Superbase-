import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const ServiceSelector = () => {
  const [openService, setOpenService] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", number: "" });
  const [formData, setFormData] = useState({
    address: "",
    date: "",
    problemDetails: "",
  });

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        // get session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          return;
        }

        const session = sessionData?.session;
        if (!session?.user) {
          alert("You're not logged in.");
          return;
        }

        const storedUserId = localStorage.getItem("userId");
        console.log("Looking up user with ID:", storedUserId);

        // Query by ID
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", storedUserId)
          .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors if no row exists

        console.log("User data:", data, "Error:", error);

        if (error) {
          console.error("Error fetching customer:", error);
          // Fallback to session data
          setCustomerInfo({
            name:
              session.user.user_metadata?.full_name || session.user.email || "",
            number: session.user.phone || "",
          });
          return;
        }

        if (data) {
          // Map table columns to your form fields
          setCustomerInfo({
            name: data.fullname || session.user.user_metadata?.full_name || "",
            number: data.mobile || session.user.phone || "",
          });
          console.log("Successfully loaded user info:", {
            name: data.fullname,
            number: data.mobile,
          });
        } else {
          // fallback: use session user data when table row missing
          console.log("No user record found, using session data");
          setCustomerInfo({
            name:
              session.user.user_metadata?.full_name || session.user.email || "",
            number: session.user.phone || "",
          });
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later you can send this to Supabase:
    const orderDetails = {
      ...selectedSub,
      ...formData,
      customer: customerInfo,
      orderedAt: new Date().toISOString(),
    };

    console.log("✅ Order Submitted:", orderDetails);
    alert("Order placed successfully!");
    setShowForm(false);
    setFormData({ address: "", date: "", problemDetails: "" });
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-6 border-2 shadow-md rounded-lg border-gray-200 my-12 relative">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Choose Your Service
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    onClick={handleOrderClick}
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

      {/* 🟢 Floating Order Form */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-[90%] sm:w-[500px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Confirm Your Booking
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* 🟢 Category Field */}
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <input
                  type="text"
                  value={selectedSub.service} // main category name
                  disabled
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* 🟢 Service Field */}
              <div>
                <label className="text-sm text-gray-600">Service</label>
                <input
                  type="text"
                  value={selectedSub.sub.name} // sub service name
                  disabled
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* 🟢 Cost Field */}
              <div>
                <label className="text-sm text-gray-600">Cost (Tk)</label>
                <input
                  type="text"
                  value={selectedSub.sub.price}
                  disabled
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* 🟢 Customer Info */}
              <div>
                <label className="text-sm text-gray-600">Customer Name</label>
                <input
                  type="text"
                  value={customerInfo.name || ""}
                  disabled
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="text"
                  value={customerInfo.number || ""}
                  disabled
                  className="w-full p-2 border rounded-lg text-gray-700 bg-gray-100"
                />
              </div>

              {/* 🟢 Address */}
              <div>
                <label className="text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* 🟢 Date */}
              <div>
                <label className="text-sm text-gray-600">Preferred Date</label>
                <input
                  type="date"
                  required
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* 🟢 Problem Details */}
              <div>
                <label className="text-sm text-gray-600">
                  Problem Details (optional)
                </label>
                <textarea
                  value={formData.problemDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, problemDetails: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Describe the issue (optional)"
                />
              </div>

              {/* 🟢 Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
