import { useState } from "react";
import Swal from "sweetalert2"; // Make sure to install: npm install sweetalert2

const technicianCategory = "Electrical";

const technicianBookings = [
  {
    id: 1,
    serviceName: "AC Maintenance",
    category: "Electrical",
    customerName: "Abdur Rahman",
    address: "House 14, Road 12, Dhanmondi, Dhaka",
    date: "2025-11-03",
    time: "10:30 AM",
    cost: "500 TK",
    status: "In Queue",
    problemDetails:
      "AC not cooling properly, needs gas refill and filter cleaning",
  },
  {
    id: 2,
    serviceName: "Plumbing Repair",
    category: "Plumbing",
    customerName: "Rafiq Ahmed",
    address: "Bashundhara R/A, Block B",
    date: "2025-11-04",
    time: "02:00 PM",
    cost: "300 TK",
    status: "In Queue",
    problemDetails: "Kitchen sink pipe leaking continuously",
  },
  {
    id: 3,
    serviceName: "Electric Wiring Fix",
    category: "Electrical",
    customerName: "Tariq Islam",
    address: "Banani, Dhaka",
    date: "2025-11-06",
    time: "11:00 AM",
    cost: "250 TK",
    status: "In Queue",
    problemDetails: "Short circuit in living room, sparking from switchboard",
  },
  {
    id: 4,
    serviceName: "CCTV Installation",
    category: "Electrical",
    customerName: "Nadia Hasan",
    address: "Gulshan 1, Dhaka",
    date: "2025-11-08",
    time: "04:00 PM",
    cost: "700 TK",
    status: "In Queue",
    problemDetails:
      "Need to install 4 CCTV cameras with DVR system for home security",
  },
];

export default function RunningOrders() {
  const filteredBookings = technicianBookings.filter(
    (booking) => booking.category === technicianCategory
  );

  const [openModal, setOpenModal] = useState(null);
  const [reviewData, setReviewData] = useState({
    helpfulness: 0,
    behavior: 0,
    punctuality: 0,
    review: "",
  });

  const handleOpenModal = (id) => {
    setOpenModal(id);
    setReviewData({ helpfulness: 0, behavior: 0, punctuality: 0, review: "" });
  };

  const handleSubmitReview = () => {
    // ✅ Validation before submit
    if (
      reviewData.helpfulness === 0 ||
      reviewData.behavior === 0 ||
      reviewData.punctuality === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please complete all ratings",
        text: "Rate all 3 categories before submitting your review.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Submit Review?",
      text: "Are you sure you want to submit this feedback?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Technician Review Submitted:", reviewData);
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "We appreciate your feedback.",
          confirmButtonColor: "#16a34a",
        });
        setOpenModal(null);
      }
    });
  };

  const handleMarkAsDone = (bookingId) => {
    Swal.fire({
      title: "Mark as Done?",
      text: "Are you sure you want to complete this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark Done",
    }).then((result) => {
      if (result.isConfirmed) {
        handleOpenModal(bookingId);
      }
    });
  };

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Running Orders</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.serviceName}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Customer: {booking.customerName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Address: {booking.address}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Date: {booking.date}, Time: {booking.time}
              </p>
              <p className="text-sm text-gray-500 mb-1">Cost: {booking.cost}</p>

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {booking.problemDetails}
                </p>
              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  booking.status === "In Queue"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {booking.status}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleMarkAsDone(booking.id)}
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-green-600 hover:text-green-500 font-medium transition border border-green-300 rounded-lg hover:bg-green-50 text-sm"
              >
                Mark as Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No bookings available for your category.
        </p>
      )}

      {/* Review Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[400px] p-6 relative">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Rate the Customer
            </h3>

            {[ 
              { key: "helpfulness", label: "Helpfulness" },
              { key: "behavior", label: "Behavior & Communication" },
              { key: "punctuality", label: "Punctuality" },
            ].map(({ key, label }) => (
              <div key={key} className="mb-3">
                <label className="font-medium text-gray-700">{label}:</label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setReviewData((prev) => ({ ...prev, [key]: num }))
                      }
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                        reviewData[key] >= num
                          ? "bg-yellow-400 border-yellow-400 text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <textarea
              placeholder="Write your feedback..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              rows="3"
              value={reviewData.review}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, review: e.target.value }))
              }
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
