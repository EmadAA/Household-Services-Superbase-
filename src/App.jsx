import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import ProtectedRoute from './Components/ProtectedRoute';

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Services = lazy(() => import('./Pages/Services'));
const Page404 = lazy(() => import('./Pages/Page404'));
const Profile = lazy(() => import('./Pages/Profile'));
const AdminDashBoard = lazy(() => import('./Pages/AdminDashBoard'));

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
          <Route path="/services" element={<Services />} /> // later,  i will make it also protected
          <Route path="/contact" element={<Contact />} />
           <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
          <Route path="/admindashboard"  element={
            <ProtectedRoute>
              <AdminDashBoard />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;