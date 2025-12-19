// Technician side: RunningOrders.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function RunningOrders({ technicianId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch running orders for this technician
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("RunningOrders techId:", technicianId);

      if (!technicianId) {
        console.log("No technicianId, skipping fetch");
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("request_services")
        .select("*")
        .eq("technician_id", technicianId)
        .eq("status", "Assigned"); // running = Assigned

      console.log("Supabase data:", data, "error:", error);

      if (error) {
        console.error("Tech running fetch error:", error.message);
        setOrders([]);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [technicianId]);

  const refresh = async () => {
    if (!technicianId) return;
    const { data } = await supabase
      .from("request_services")
      .select("*")
      .eq("technician_id", technicianId)
      .eq("status", "Assigned");
    setOrders(data || []);
  };

  // tech clicks Cancel -> back to Pending, free technician
  const handleCancel = async (id) => {
    const { error } = await supabase
      .from("request_services")
      .update({
        status: "Pending",
        tech_done: false,
        technician_id: null,
      })
      .eq("id", id);

    if (error) {
      console.error("Cancel error:", error.message);
      return;
    }
    await refresh();
  };

  // tech clicks Mark as Done
  const handleMarkAsDone = async (id) => {
    const { data, error } = await supabase
      .from("request_services")
      .select("user_done, tech_done")
      .eq("id", id)
      .single();

    if (error) {
      console.error("fetch flags error:", error.message);
      return;
    }

    const newTechDone = true;
    const newUserDone = data.user_done;
    const newStatus =
      newTechDone && newUserDone ? "Completed" : "Assigned";

    const { error: updErr } = await supabase
      .from("request_services")
      .update({ tech_done: newTechDone, status: newStatus })
      .eq("id", id);

    if (updErr) {
      console.error("update tech_done error:", updErr.message);
      return;
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, tech_done: newTechDone, status: newStatus } : o
      )
    );
  };

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading running orders...
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Running Orders</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {orders.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.service_name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Customer: {booking.customer_name}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Address: {booking.address}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date: {booking.date}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Cost: {booking.price}
              </p>

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {booking.problem_details}
                </p>
              </div>

              <p className="mt-2 text-sm font-medium text-blue-600">
                {booking.status === "Completed" ? "Completed" : "Assigned"}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleMarkAsDone(booking.id)}
                disabled={booking.tech_done}
                className={`flex items-center justify-center gap-2 px-3 lg:px-4 py-2 font-medium transition border rounded-lg text-sm
                  ${
                    booking.tech_done
                      ? "text-gray-500 border-gray-300 bg-gray-100 cursor-not-allowed"
                      : "text-green-600 border-green-300 hover:text-green-500 hover:bg-green-50"
                  }`}
              >
                {booking.tech_done && !booking.user_done && booking.status !== "Completed"
                  ? "Marked done • waiting for customer"
                  : booking.tech_done && booking.user_done
                  ? "Order completed"
                  : "Mark as Done"}
              </button>

              {/* Cancel only if not completed by both */}
              {!booking.tech_done || !booking.user_done ? (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm"
                >
                  Cancel Assignment
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No running orders.
        </p>
      )}
    </div>
  );
}
