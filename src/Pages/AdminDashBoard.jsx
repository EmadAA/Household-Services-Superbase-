 // Remove if using real auth
import AllServices from "../Components/AllServices";
import AllTechnicians from "../Components/AllTechnicians";
import AllUsers from "../Components/AllUsers";
import ApproveGigs from "../Components/ApproveGigs";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PersonalInformation from "../Components/PersonalInformation";
import ProfileTopSection from "../Components/ProfileTopSection";
import TotalMember from "../Components/TotalMember";

export default function AdminDashBoard() {
 
    return(
      <div>
      <Navbar />
      <ProfileTopSection />
      <PersonalInformation />
      <TotalMember />
      <ApproveGigs />
      <AllTechnicians />
      <AllUsers />
      <AllServices />
      
      <Footer />
    </div>
    )

}