import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import AllServices from "../Components/AdminComponents/AllServices";
import AllTechnicians from "../Components/AdminComponents/AllTechnicians";
import AllUsers from "../Components/AdminComponents/AllUsers";
import ApproveAccounts from "../Components/AdminComponents/ApproveAccounts";
import TotalMember from "../Components/AdminComponents/TotalMember";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PersonalInformation from "../Components/PersonalInformation";
import ProfileTopSection from "../Components/ProfileTopSection";

export default function AdminDashBoard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      // Check admin
      const userRole = localStorage.getItem('userRole');
      const adminId = localStorage.getItem('adminId');
      
      if (userRole !== 'admin' || !adminId) {
        alert("Access denied. Admin privileges required.");
        window.location.href = "/login";
        return;
      }

      // Fetch admin data
      const { data: adminData, error: adminError } = await supabase
        .from('admin')
        .select('*')
        .eq('id', adminId)
        .single();

      if (adminError) throw adminError;

      // Format admin data to match the structure coz admin dont have the NID and Category
      const formattedAdminData = {
        ...adminData,
        role: 'Admin',
        nid: null, 
        category: null 
      };

      setAdminData(formattedAdminData);

    } catch (error) {
      // console.error("Error fetching admin profile:", error);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
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
      <ProfileTopSection userData={adminData} />
      <PersonalInformation userData={adminData} onProfileUpdated={fetchAdminData} />
      <TotalMember />
      <ApproveAccounts />
      <AllTechnicians />
      <AllUsers />
      <AllServices />
      <Footer />
    </div>
  );
}
