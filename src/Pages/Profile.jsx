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
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        alert("Not logged in.");
        window.location.href = "/login";
        return;
      }

      const userId = session.user.id;
      const userRole = session.user.user_metadata?.role;

      let profileData = null;

      // Fetch from appropriate table based on role
      if (userRole === 'user') {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        profileData = { ...data, role: 'User' };

      } else if (userRole === 'technician') {
        const { data, error } = await supabase
          .from('technicians')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        profileData = { ...data, role: 'Technician' };

      } else {
        // Check admin table
        const { data, error } = await supabase
          .from('admin')
          .select('*')
          .eq('email', session.user.email)
          .single();
        
        if (error) throw error;
        profileData = { ...data, role: 'Admin' };
      }

      setUserData(profileData);

    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div>
      <Navbar />
      <ProfileTopSection userData={userData} />
      <PersonalInformation userData={userData} onProfileUpdated={fetchUserData} />
      <Footer />
    </div>
  );
}
