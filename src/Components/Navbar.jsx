// Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaSignInAlt, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";


export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Check user role on component mount and when localStorage changes
  useEffect(() => {
    const checkUserRole = () => {
      const role = localStorage.getItem('userRole');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (isLoggedIn === 'true') {
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    };

    checkUserRole();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUserRole);
    
    return () => {
      window.removeEventListener('storage', checkUserRole);
    };
  }, []);

  // Close menu/search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogin= () =>{
    setIsMenuOpen(false);
    navigate("/login");
  }
  const handleLogout = async () => {
    // Clear all user data

    try {
      const { error } = await supabase.auth.signOut();
          if (error) {
            console.error('Logout error:', error);
          }
          navigate('/login');
        } catch (error) {
          console.error('Logout failed:', error);
        }
   
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    setIsMenuOpen(false);
    setUserRole(null);
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  // Dynamic navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { name: "HOME", path: "/home", end: true },
      { name: "ABOUT", path: "/about" },
      { name: "SERVICE", path: "/services" },
    ];

    // Add different profile links based on user role
    if (userRole === 'admin') {
      baseLinks.push({ name: "PROFILE", path: "/admindashboard" });
    } else if (userRole === 'technician') {
      baseLinks.push({ name: "PROFILE", path: "/profile" });
    } else if (userRole === 'user') {
      baseLinks.push({ name: "PROFILE", path: "/profile" });
    } else {
      // Not logged in - show generic profile
      baseLinks.push({ name: "PROFILE", path: "/profile" });
    }

    baseLinks.push({ name: "CONTACT", path: "/contact" });
    
    return baseLinks;
  };

  const navLinks = getNavLinks();

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) => `${
        isActive ? "text-teal-600 font-bold" : "text-gray-800"
      } font-medium hover:text-teal-400 transition block text-center ${
        item.name === "PROFILE" ? "text-gray-600 font-semibold" : ""
      }`}
      onClick={onClick}
    >
      {item.name}
    </NavLink>
  );

  // Get user display name based on role
  const getUserDisplayName = () => {
    if (userRole === 'admin') {
      return localStorage.getItem('adminName') || 'Admin';
    } else if (userRole) {
      return localStorage.getItem('userEmail') || 'User';
    }
    return null;
  };

  const userDisplayName = getUserDisplayName();

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white/95 backdrop-blur-md py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-5">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={handleLogoClick}
            aria-label="Go to home"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-lg">
              ✓
            </div>
            Household Service
          </div>

          {/* Search Bar */}
          {showSearch ? (
            <div ref={searchRef} className="flex-1 px-5">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <>
              {/* Desktop Menu */}
              <ul className="hidden md:flex gap-8 list-none">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavItem item={item} />
                  </li>
                ))}
              </ul>

              {/* Desktop Right Side */}
              <div className="hidden md:flex items-center gap-5">
                <button
                  className="text-gray-600 text-lg"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <FaSearch />
                </button>

                {/* User Role Indicator */}
                {/* {userDisplayName && (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      userRole === 'admin' ? 'bg-purple-500' : 
                      userRole === 'technician' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      {userDisplayName}
                      {userRole === 'admin' && <span className="text-purple-600 ml-1">(Admin)</span>}
                      {userRole === 'technician' && <span className="text-blue-600 ml-1">(Tech)</span>}
                    </span>
                  </div>
                )} */}

                <a
                  href="tel:+8801676480060"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-teal-700 transition"
                >
                  Helpline +880 1676 480060
                </a>

                {userRole ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                     className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border border-teal-300 rounded-lg hover:bg-teal-50"
                  >
                    <FaSignInAlt />
                    Sign In
                  </NavLink>
                )}
              </div>

              {/* Mobile Hamburger */}
              <div className="md:hidden flex items-center gap-4">
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-600 text-xl"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="text-gray-800 focus:outline-none"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white border-t border-gray-200 px-5 py-4 space-y-4 shadow-lg animate-fadeIn"
          >
            {/* User info for mobile */}
            {userDisplayName && (
              <div className="flex items-center justify-center gap-2 py-2 border-b border-gray-200">
                <div className={`w-3 h-3 rounded-full ${
                  userRole === 'admin' ? 'bg-purple-500' : 
                  userRole === 'technician' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  Welcome, {userDisplayName}
                  {userRole === 'admin' && <span className="text-purple-600 ml-1">(Admin)</span>}
                  {userRole === 'technician' && <span className="text-blue-600 ml-1">(Tech)</span>}
                </span>
              </div>
            )}

            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavItem item={item} onClick={() => setIsMenuOpen(false)} />
                </li>
              ))}
            </ul>

            {/* Centered Login/Logout */}
            <div className="flex justify-center">
              {userRole ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-500 font-medium transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              ) : (
                
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition"
                >
                  <FaSignInAlt />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
