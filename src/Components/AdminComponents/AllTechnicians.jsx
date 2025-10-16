import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../../supabaseClient";
import Img from "../../assets/images/image.png";

export default function AllTechnicians() {
  const [technicians, setTechnicians] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);

  // Fetch technicians from database
  useEffect(() => {
    fetchTechnicians();
  }, []);

  // Filter technicians based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTechnicians(technicians);
    } else {
      const filtered = technicians.filter(
        (tech) =>
          tech.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tech.mobile.includes(searchTerm) ||
          tech.nid.includes(searchTerm) ||
          tech.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTechnicians(filtered);
    }
  }, [searchTerm, technicians]);

  const fetchTechnicians = async () => {
    try {
      console.log("🔍 Fetching technicians from database...");
      setError(null);

      // Try to fetch technicians data
      const { data, error, count } = await supabase
        .from("technicians")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      console.log(" Supabase response:", { data, error, count });

      if (error) {
        // console.error("Supabase error:", error);
        setError(`Database Error: ${error.message}`);

        // If RLS is blocking, try a different approach
        if (
          error.message.includes("row-level security") ||
          error.code === "PGRST116"
        ) {
          console.log(" RLS policy is blocking access. Checking policies...");
          alert(
            " Access denied to technicians table. Please check RLS policies."
          );
        }

        setTechnicians([]);
        setFilteredTechnicians([]);
        return;
      }

      // console.log(" Fetched technicians successfully:", data?.length || 0);
      // console.log(" Technician data:", data);

      const technicianData = data || [];
      setTechnicians(technicianData);
      setFilteredTechnicians(technicianData);
    } catch (error) {
      // console.error(" Fetch error:", error);
      setError(`Fetch Error: ${error.message}`);
      setTechnicians([]);
      setFilteredTechnicians([]);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect above
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteTechnician = async (technicianId, technicianName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${technicianName}'s account? This action cannot be undone and will also delete their authentication account.`
    );

    if (!confirmDelete) return;

    setDeleting(technicianId);

    try {
      console.log("Deleting technician:", technicianId);

      // Get technician data first
      const { data: techData, error: fetchError } = await supabase
        .from("technicians")
        .select("*")
        .eq("id", technicianId)
        .single();

      if (fetchError) {
        throw new Error(
          "Failed to fetch technician data: " + fetchError.message
        );
      }

      // Delete from technicians table (this will also delete from auth.users due to CASCADE)
      const { error: deleteError } = await supabase
        .from("technicians")
        .delete()
        .eq("id", technicianId);

      if (deleteError) {
        throw new Error("Failed to delete technician: " + deleteError.message);
      }

      // Optional: Delete NID file from storage if it exists
      if (techData.nid_file_url) {
        try {
          const fileName = techData.nid_file_url.split("/").pop();
          await supabase.storage.from("nid-files").remove([fileName]);
          console.log("📁 NID file deleted from storage");
        } catch (storageError) {
          console.log("⚠️ Could not delete NID file:", storageError);
        }
      }

      alert(`✅ ${technicianName}'s account has been successfully deleted.`);

      // Refresh the list
      fetchTechnicians();
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete technician: " + error.message);
    } finally {
      setDeleting(null);
    }
  };

  const formatCategory = (category) => {
    return category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };



  if (loading) {
    return (
      <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-8 shadow-xl md:w-[85%] lg:w-full">
        <div className="text-center">
          <div className="text-xl">Loading technicians...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header & Search Bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row">
        <h2 className="text-xl font-bold text-gray-500">
          All Technicians : ({filteredTechnicians.length} total)
        </h2>

        <form onSubmit={handleSearch} className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Search technicians
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaSearch className="h-4 w-4" />
            </div>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-24 sm:pr-28 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 placeholder:text-xs sm:placeholder:text-sm"
              placeholder="Search by name, email, mobile..."
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg bg-teal-700 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      

      {/* Content */}
      {!error && filteredTechnicians.length === 0 ? (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? "No Matching Technicians" : "No Technicians Found"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? `No technicians match your search "${searchTerm}"`
              : "No approved technicians in the system yet."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-teal-600 hover:text-teal-800 underline"
            >
              Clear search
            </button>
          )}
          
        </div>
      ) : (
        !error && (
          <div className="col-span-full max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredTechnicians.map((technician) => (
                <div
                  key={technician.id}
                  className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <img
                      src={Img}
                      alt="Technician"
                      className="rounded-[20px] border-2 border-gray-600 w-full"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {technician.fullname}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {technician.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span>{" "}
                      {formatCategory(technician.category)}
                    </p>
                    <p className="text-sm text-gray-600">
                      NID: {technician.nid}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Number:</span>{" "}
                      {technician.mobile}
                    </p>

                    {/* NID Document Link */}
                    {technician.nid_file_url && (
                      <div className="bg-transparent border text-center text-white font-bold py-2 px-4 rounded">
                        <a
                          href={technician.nid_file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md text-teal-600 hover:text-teal-800 "
                        >
                          📄 View NID Document
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        deleteTechnician(technician.id, technician.fullname)
                      }
                      disabled={deleting === technician.id}
                      className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === technician.id ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        "Delete Account"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
