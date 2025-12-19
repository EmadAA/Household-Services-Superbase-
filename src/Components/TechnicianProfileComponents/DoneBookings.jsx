import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function CompletedOrders({ technicianId }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      if (!technicianId) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("request_services")
        .select("*")
        .eq("technician_id", technicianId)     // remove this line if it's customer side
        .eq("status", "Completed")
        .order("ordered_at", { ascending: false });

      if (error) {
        console.error("Completed orders fetch error:", error.message);
        setOrders([]);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchCompleted();
  }, [technicianId]);

  if (loading) {
    return (
      <div className="mt-10 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <div className="text-center text-gray-500 py-10">
          Loading completed orders...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Completed Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No completed orders yet.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.service_name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Customer: {order.customer_name}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Address: {order.address}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Completed:{" "}
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : order.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Cost: {order.price}
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-blue-600 hover:text-blue-500 font-medium transition border border-blue-300 rounded-lg hover:bg-blue-50 text-sm w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedOrder.service_name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer:</strong> {selectedOrder.customer_name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Ordered On:</strong>{" "}
              {selectedOrder.ordered_at
                ? new Date(selectedOrder.ordered_at).toLocaleString()
                : selectedOrder.ordered_at}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Completed On:</strong>{" "}
              {selectedOrder.date
                ? new Date(selectedOrder.date).toLocaleDateString()
                : selectedOrder.date}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Total Cost:</strong> {selectedOrder.price}
            </p>
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Problem Details:</strong>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedOrder.problem_details}
              </p>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
