import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function MyPendingBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("request_services")
        .select("*")
        .in("status", ["Pending", "Accepted"]);

      console.log("Supabase data:", data, "error:", error);

      if (error) {
        console.error("Error fetching bookings:", error.message);
        setBookings([]);
      } else {
        setBookings(data || []);
      }

      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleAccept = async (id) => {
    const { error } = await supabase
      .from("request_services")
      .update({ status: "Accepted" })
      .eq("id", id);

    if (error) {
      console.error("Accept error:", error.message);
      return;
    }

    //Update local state: mark this booking as Accepted, don't remove it
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Accepted" } : b
      )
    );
  };

  const handleReject = async (id) => {
    // still just hide for this technician (no DB change)
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading pending bookings...
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">
          Pending Bookings Offer
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.service_name || "Service Request"}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Customer: {booking.customer_name || "Unknown"}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                Phone: {booking.customer_number || "N/A"}
              </p>

              {booking.address && (
                <p className="text-sm text-gray-500 mb-1">
                  Address: {booking.address}
                </p>
              )}

              {booking.date && booking.time && (
                <p className="text-sm text-gray-500 mb-1">
                  Date: {booking.date}, Time: {booking.time}
                </p>
              )}

              {booking.cost && (
                <p className="text-sm text-gray-500 mb-1">
                  Cost: {booking.cost} TK
                </p>
              )}

              <div className="mt-2 mb-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Problem Details:
                </p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {booking.problem_details}
                </p>
              </div>

              <p
                className={`mt-2 text-sm font-medium ${booking.status === "Accepted"
                    ? "text-green-600"
                    : "text-yellow-600"
                  }`}
              >
                {booking.status}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {booking.status === "Accepted" ? (
                //show disabled Accepted button
                <button
                  disabled
                  className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-green-500 font-medium border border-green-300 rounded-lg bg-green-50 text-sm cursor-default"
                >
                  Accepted
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAccept(booking.id)}
                    className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-green-600 hover:text-green-500 font-medium transition border border-green-300 rounded-lg hover:bg-green-50 text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(booking.id)}
                    className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-6">
          No bookings available.
        </p>
      )}
    </div>
  );
}
