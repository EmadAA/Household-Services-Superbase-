import { useState } from "react";
const completedOrders = [
  {
    id: 1,
    serviceName: "AC Maintenance",
    category: "Electrical",
    customerName: "Abdur Rahman",
    address: "House 14, Road 12, Dhanmondi, Dhaka",
    orderedDate: "2025-10-25 11:00 AM",
    completedDate: "2025-10-26 03:45 PM",
    tranxID: "TXN123456",
    cost: "500 TK",
    problemDetails: "AC not cooling properly, needed gas refill and filter cleaning",
  },
  {
    id: 2,
    serviceName: "CCTV Installation",
    category: "Electrical",
    customerName: "Nadia Hasan",
    address: "Gulshan 1, Dhaka",
    orderedDate: "2025-10-20 09:15 AM",
    completedDate: "2025-10-20 05:10 PM",
    tranxID: "TXN987654",
    cost: "700 TK",
    problemDetails: "Installed 4 CCTV cameras with DVR system for home security",
  },
  {
    id: 3,
    serviceName: "Electric Wiring Fix",
    category: "Electrical",
    customerName: "Tariq Islam",
    address: "Banani, Dhaka",
    orderedDate: "2025-10-22 01:30 PM",
    completedDate: "2025-10-22 06:00 PM",
    tranxID: "TXN555888",
    cost: "250 TK",
    problemDetails: "Fixed short circuit in living room and replaced faulty switchboard",
  },
  {
    id: 4,
    serviceName: "Ceiling Fan Repair",
    category: "Electrical",
    customerName: "Sadia Khatun",
    address: "Mirpur 10, Dhaka",
    orderedDate: "2025-10-18 10:00 AM",
    completedDate: "2025-10-18 02:40 PM",
    tranxID: "TXN220144",
    cost: "300 TK",
    problemDetails: "Fan was making noise and wobbling, fixed motor and balanced blades",
  },
];

export default function CompletedOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Completed Orders</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {completedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {order.serviceName}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Customer: {order.customerName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Address: {order.address}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Completed: {order.completedDate.split(" ")[0]}
              </p>
              <p className="text-sm text-gray-500 mb-1">Cost: {order.cost}</p>
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

      {/* Popup Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedOrder.serviceName}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer:</strong> {selectedOrder.customerName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Ordered On:</strong> {selectedOrder.orderedDate}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Completed On:</strong> {selectedOrder.completedDate}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Transaction ID:</strong> {selectedOrder.tranxID || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Total Cost:</strong> {selectedOrder.cost}
            </p>
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Problem Details:</strong>
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedOrder.problemDetails}
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