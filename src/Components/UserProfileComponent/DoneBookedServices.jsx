import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function DoneBookedServices() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPastServices = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          if (mounted) {
            setServices([]);
            setLoading(false);
          }
          return;
        }

        const userId = session.user.id;

        const { data, error } = await supabase
          .from("request_services")
          .select("*")
          .eq("user_id", userId)
          .eq("status", "Completed") // only completed history
          .order("ordered_at", { ascending: false });

        if (error) throw error;

        if (mounted) {
          setServices(data || []);
        }
      } catch (err) {
        console.error("Past bookings fetch error:", err.message || err);
        if (mounted) setServices([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPastServices();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-10 mb-10 shadow-xl ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <div className="text-center text-gray-500 py-10">
          Loading past bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Past Bookings Services</h2>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No past bookings yet.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.service_name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Technician Category: {service.category}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Cost: {service.price}
                </p>
                <p className="mt-2 text-sm font-medium text-green-600">
                  Completed
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-blue-600 hover:text-blue-500 font-medium transition border border-blue-300 rounded-lg hover:bg-blue-50 text-sm"
                >
                  View Details
                </button>
                <button className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 text-gray-600 hover:text-gray-500 font-medium transition border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Rebook Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Section */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl shadow-xl p-6 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedService.service_name}
            </h3>

            <div className="text-gray-600 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">
                  Technician Category:
                </span>{" "}
                {selectedService.category}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Ordered On:</span>{" "}
                {selectedService.ordered_at
                  ? new Date(selectedService.ordered_at).toLocaleString()
                  : selectedService.ordered_at}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Completed On:</span>{" "}
                {selectedService.date
                  ? new Date(selectedService.date).toLocaleDateString()
                  : selectedService.date}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Cost:</span>{" "}
                {selectedService.price}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Address:</span>{" "}
                {selectedService.address}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Problem Details:
                </span>{" "}
                {selectedService.problem_details}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
