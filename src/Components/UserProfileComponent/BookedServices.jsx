import { useState } from "react";

const services = [
  {
    id: 1,
    name: "AC Maintenance",
    category: "Electrician",
    date: "2025-11-03",
    cost: "500 TK",
    status: "Pending",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    problemDetails:
      "AC not cooling properly, needs gas refill and filter cleaning",
  },
  {
    id: 2,
    name: "Plumbing Repair",
    category: "Plumber",
    date: "2025-11-04",
    cost: "300 TK",
    status: "In Queue",
    address: "Flat 3B, Gulshan Avenue, Gulshan-1, Dhaka",
    problemDetails: "Kitchen sink pipe leaking, needs replacement",
  },
  {
    id: 3,
    name: "House Cleaning",
    category: "Cleaner",
    date: "2025-11-02",
    cost: "400 TK",
    status: "Pending",
    address: "Apartment 204, Banani DOHS, Dhaka",
    problemDetails: "Deep cleaning required for 3 bedrooms and living area",
  },
  // ... (you can keep your other services)
];

export default function RunningServices() {
  const [openModal, setOpenModal] = useState(null); // holds id of service
  const [reviewData, setReviewData] = useState({
    behavior: 0,
    timing: 0,
    quality: 0,
    review: "",
  });

  const handleOpenModal = (id) => {
    setOpenModal(id);
    setReviewData({ behavior: 0, timing: 0, quality: 0, review: "" });
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", reviewData);
    alert("Thanks for the review, we appreciate your feedback! Stay with us.");
    setOpenModal(null);
  };

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Running Services</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {service.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">Date: {service.date}</p>
              <p className="text-sm text-gray-500 mb-1">Cost: {service.cost}</p>

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Address:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.address}
                </p>
              </div>

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {service.problemDetails}
                </p>
              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  service.status === "In Queue"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {service.status}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleOpenModal(service.id)}
                className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border border-teal-300 rounded-lg hover:bg-teal-50 text-sm"
              >
                Mark as Done
              </button>
              <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[400px] p-6 relative">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Please Leave a Review, It will be helpful for others to trust
            </h3>

            {/* Ratings */}
            {["How was technician's behavior", "How was timing", "How was the service quality"].map((field) => (
              <div key={field} className="mb-3">
                <label className="capitalize font-medium text-gray-700">
                  {field}:
                </label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setReviewData((prev) => ({ ...prev, [field]: num }))
                      }
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                        reviewData[field] >= num
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

            {/* Review Text */}
            <textarea
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              rows="3"
              value={reviewData.review}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, review: e.target.value }))
              }
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setOpenModal(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500 text-sm"
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
