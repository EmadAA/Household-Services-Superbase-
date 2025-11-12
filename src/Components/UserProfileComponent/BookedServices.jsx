/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../supabaseClient";

export default function RunningServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  // const [confirmServiceId, setConfirmServiceId] = useState(null);
  const [reviewService, setReviewService] = useState(null); // full service object for review modal
  const [reviewData, setReviewData] = useState({
    behavior: 0,
    timing: 0,
    quality: 0,
    review: "",
  });

  // fetch logged-in user's running requests
  useEffect(() => {
    let mounted = true;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        // get session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          // not logged in — show nothing (or redirect as you prefer)
          setServices([]);
          return;
        }

        const userId = session.user.id;

        // fetch requests for this user with status Pending or In Queue (running)
        const { data, error } = await supabase
          .from("request_services")
          .select("*")
          .eq("user_id", userId)
          .in("status", ["Pending", "In Queue"])
          .order("ordered_at", { ascending: false });

        if (error) throw error;

        if (mounted) setServices(data || []);
      } catch (err) {
        console.error("Error fetching requests:", err.message || err);
        Swal.fire({
          icon: "error",
          title: "Failed to load requests",
          text: err.message || "Something went wrong",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRequests();
    return () => {
      mounted = false;
    };
  }, []);

  // refresh helper
  const refresh = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setServices([]);
      setLoading(false);
      return;
    }
    const userId = session.user.id;
    const { data } = await supabase
      .from("request_services")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["Pending", "In Queue"])
      .order("ordered_at", { ascending: false });
    setServices(data || []);
    setLoading(false);
  };

  // called when user clicks Mark as Done (shows confirmation)
 // called when user clicks Mark as Done (shows confirmation)
const handleMarkAsDoneClick = (serviceId) => {
  Swal.fire({
    title: "Mark this service as completed?",
    text: "Once marked completed, you will be asked to leave a review.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, mark completed",
    cancelButtonText: "Not yet",
    confirmButtonColor: "#0d9488",
  }).then(async (res) => {
    if (res.isConfirmed) {
      await markServiceCompleted(serviceId);
    }
  });
};

// only console log instead of updating database
const markServiceCompleted = async (serviceId) => {
  try {
    // find the selected service data
    const serviceData = services.find((s) => s.id === serviceId);

    if (!serviceData) {
      Swal.fire({
        icon: "error",
        title: "Service not found",
        text: "Could not locate this service in the list.",
      });
      return;
    }

    // just console log data (you can connect to DB later)
    console.log("✅ Service marked as done:", serviceData);

    // open review modal
    setReviewService(serviceData);
    setReviewData({ behavior: 0, timing: 0, quality: 0, review: "" });

    Swal.fire({
      icon: "success",
      title: "Marked Completed (Test Mode)",
      text: "Now you can leave a review for this service.",
      confirmButtonColor: "#0d9488",
    });
  } catch (err) {
    console.error("Error marking completed:", err);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.message || "Could not mark completed",
    });
  }
};

  // Submit review: validate and insert into service_reviews
// Submit review: just console log instead of inserting into database
const handleSubmitReview = async () => {
  const { behavior, timing, quality, review } = reviewData;
  if (behavior === 0 || timing === 0 || quality === 0) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Ratings",
      text: "Please rate all categories before submitting your review.",
      confirmButtonColor: "#0d9488",
    });
    return;
  }

  try {
    // get current user
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

    // combine review + service data
    const fullReview = {
      service_id: reviewService.id,
      user_id: userId,
      behavior,
      timing,
      quality,
      comment: review || null,
      created_at: new Date().toISOString(),
      service_name: reviewService.service_name,
      category: reviewService.category,
    };

    // ✅ log instead of saving to DB
    console.log("📝 User Review Submitted:", fullReview);

    Swal.fire({
      icon: "success",
      title: "Review Logged (Test Mode)",
      text: "Check the console to see your review data.",
      confirmButtonColor: "#0d9488",
    });

    // reset modal
    setReviewService(null);
    setReviewData({ behavior: 0, timing: 0, quality: 0, review: "" });
  } catch (err) {
    console.error("Error saving review:", err);
    Swal.fire({
      icon: "error",
      title: "Failed to save review",
      text: err.message || "Please try again later",
    });
  }
};


  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="text-gray-600">Loading your running services...</div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 mx-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px] bg-white">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Running Services</h2>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No running services found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{service.service_name || service.serviceName || "Service"}</h3>
                <p className="text-sm text-gray-500 mb-1">Category: {service.category}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Date: {service.date ? new Date(service.date).toLocaleDateString() : service.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">Cost: {service.price || service.cost}</p>

                <div className="mt-2 mb-2">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Address:</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{service.address}</p>
                </div>

                <div className="mt-2 mb-2">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Problem Details:</p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{service.problem_details || service.problemDetails}</p>
                </div>

                <p className={`mt-2 text-sm font-medium ${service.status === "In Queue" ? "text-blue-600" : "text-yellow-600"}`}>
                  {service.status}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleMarkAsDoneClick(service.id)}
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
      )}

      {/* Review Modal */}
      {reviewService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[420px] p-6 relative">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Please Leave a Review</h3>

            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1"><strong>Service:</strong> {reviewService.service_name}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {reviewService.category}</p>
            </div>

            {[
              { key: "behavior", label: "Technician’s Behavior" },
              { key: "timing", label: "Service Timing" },
              { key: "quality", label: "Service Quality" },
            ].map(({ key, label }) => (
              <div key={key} className="mb-3">
                <label className="font-medium text-gray-700">{label}:</label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setReviewData((prev) => ({ ...prev, [key]: num }))}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${reviewData[key] >= num ? "bg-yellow-400 border-yellow-400 text-white" : "border-gray-300 text-gray-500"}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <textarea
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              rows="3"
              value={reviewData.review}
              onChange={(e) => setReviewData((prev) => ({ ...prev, review: e.target.value }))}
            />

            <div className="flex justify-between mt-4">
              <button onClick={() => setReviewService(null)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm">Cancel</button>
              <button onClick={handleSubmitReview} className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-500 text-sm">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
