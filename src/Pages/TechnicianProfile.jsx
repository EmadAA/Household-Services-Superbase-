import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PersonalInformation from "../Components/PersonalInformation";
import ProfileTopSection from "../Components/ProfileTopSection";
import DoneBookings from "../Components/TechnicianProfileComponents/DoneBookings";
import RunningBookings from "../Components/TechnicianProfileComponents/RunningBookings";
import TechLocationForm from "../Components/TechnicianProfileComponents/TechLocationForm";

export default function TechnicianProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert("Not logged in.");
        window.location.href = "/login";
        return;
      }

      const userId = session.user.id;
      const { data, error } = await supabase
        .from("technicians")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setUserData({ ...data, role: "Technician" });
    } catch (error) {
      alert("Failed to load technician profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading technician profile...</div>;
  if (!userData) return <div className="text-center p-10">Profile not found.</div>;

  return (
    <div>
      <Navbar />
      <ProfileTopSection userData={userData} />
      <PersonalInformation userData={userData} onProfileUpdated={fetchUserData} />
      
      {/* ✅ FIXED: Use userData.id instead of undefined technicianId */}
      <TechLocationForm technicianId={userData.id} />
      
      <RunningBookings technicianId={userData.id} />
      <DoneBookings technicianId={userData.id} />
      {/* <TechnicianStatistics /> */}
      <Footer />
    </div>
  );
}
