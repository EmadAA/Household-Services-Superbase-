import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import ProtectedRoute from './Components/AdminComponents/ProtectedRoute';
import RegistrationComplete from './Components/RegistrationComplete ';

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Services = lazy(() => import('./Pages/Services'));
const Page404 = lazy(() => import('./Pages/Page404'));
const UserProfile = lazy(() => import('./Pages/UserProfile'));
const TechnicianProfile = lazy(() => import('./Pages/TechnicianProfile'));
const AdminDashBoard = lazy(() => import('./Pages/AdminDashBoard'));
const TermsAndConditions = lazy(() => import('./Pages/TOC'));

// Preloader
const Preloader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950/90 text-white">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-400 rounded-full animate-spin border-t-blue-500 shadow-lg"></div>
  </div>
);
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration-complete" element={<RegistrationComplete />} />
          <Route path="/toc" element={<TermsAndConditions />} />
           <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
 
          <Route
          path="/technicianprofile"
          element={
            <ProtectedRoute>
              <TechnicianProfile />
            </ProtectedRoute>}
          /> 
          <Route path="/admindashboard"  element={
            // <ProtectedRoute>
              <AdminDashBoard />
            // </ProtectedRoute>
          }/>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;