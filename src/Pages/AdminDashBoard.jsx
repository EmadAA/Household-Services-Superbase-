import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import AllTechnicians from "../Components/AdminComponents/AllTechnicians";
import AllUsers from "../Components/AdminComponents/AllUsers";
import ApproveAccounts from "../Components/AdminComponents/ApproveAccounts";
import RequestedService from "../Components/AdminComponents/RequestedService";
import TotalMember from "../Components/AdminComponents/TotalMember";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PersonalInformation from "../Components/PersonalInformation";
import ProfileTopSection from "../Components/ProfileTopSection";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("accounts");

  const fetchAdminData = async () => {
    try {
      const userRole = localStorage.getItem("userRole");
      const adminId = localStorage.getItem("adminId");

      if (userRole !== "admin" || !adminId) {
        alert("Access denied. Admin privileges required.");
        window.location.href = "/login";
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("id", adminId)
        .single();

      if (adminError) throw adminError;

      const formattedAdminData = {
        ...adminData,
        role: "Admin",
        nid: null,
        category: null,
      };

      setAdminData(formattedAdminData);
    } catch (error) {
      alert("Failed to load admin profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">Admin profile not found.</p>
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-[1300px] mx-auto mt-8 px-4">
        <ProfileTopSection userData={adminData} />
        <PersonalInformation
          userData={adminData}
          onProfileUpdated={fetchAdminData}
        />

        {/* 🟢 Full-width Tab Buttons */}
        <div className="flex mt-8 shadow-md rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => setActiveTab("accounts")}
            className={`w-1/2 py-3 text-center font-semibold text-lg transition-all duration-300 ${
              activeTab === "accounts"
                ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Accounts
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`w-1/2 py-3 text-center font-semibold text-lg transition-all duration-300 ${
              activeTab === "services"
                ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Services
          </button>
        </div>

        {/*  Tab Content Section */}
        <div className="mt-8 space-y-8">
          {activeTab === "accounts" ? (
            <>
            {/* Here  the all  component related to accounts */}
              <TotalMember />
              <ApproveAccounts />
              <AllTechnicians />
              <AllUsers />
            </>
          ) : (
            
            <>
            {/* Here  the all  component related to services */}
              <RequestedService />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
