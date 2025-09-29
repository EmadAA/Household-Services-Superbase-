import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PersonalInformation from "../Components/PersonalInformation";
import ProfileTopSection from "../Components/ProfileTopSection";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      // Check if the user is admin 
      const userRole = localStorage.getItem('userRole');
      const adminId = localStorage.getItem('adminId');
      
      if (userRole === 'admin' && adminId) {
        // Fetch admin data
        const { data: adminData, error: adminError } = await supabase
          .from('admin')
          .select('*')
          .eq('id', adminId)
          .single();

        if (adminError) throw adminError;

        // Format admin data to match expected structure coz Admin dont have NID and Category
        const formattedAdminData = {
          ...adminData,
          role: 'Admin',
          nid: null,
          category: null 
        };

        setUserData(formattedAdminData);
        
      } else {
        // Fetch user/technician data
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          alert("Not logged in.");
          window.location.href = "/login";
          return;
        }

        const userId = session.user.id;
        const sessionUserRole = session.user.user_metadata?.role;

        let profileData = null;

        // Fetch from data table based on role
        if (sessionUserRole === 'user') {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (error) throw error;
          profileData = { ...data, role: 'User' };

        } else if (sessionUserRole === 'technician') {
          const { data, error } = await supabase
            .from('technicians')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (error) throw error;
          profileData = { ...data, role: 'Technician' };

        } else {
          throw new Error("Invalid user role");
        }

        setUserData(profileData);
      }

    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Profile not found</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ProfileTopSection userData={userData} />
      <PersonalInformation userData={userData} onProfileUpdated={fetchUserData} />
      <Footer />
    </div>
  );
}
