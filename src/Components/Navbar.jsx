import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Check user role
  useEffect(() => {
    const checkUserRole = () => {
      const role = localStorage.getItem("userRole");
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "true") {
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    };

    checkUserRole();
    window.addEventListener("storage", checkUserRole);

    return () => {
      window.removeEventListener("storage", checkUserRole);
    };
  }, []);

  //  Close menu & search box when clicking outside!
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

  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    // Clear localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");

    setIsMenuOpen(false);
    setUserRole(null);
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  // Navigation Links
  const getNavLinks = () => {
    const baseLinks = [
      { name: "HOME", path: "/home", end: true },
      { name: "ABOUT", path: "/about" },
      { name: "SERVICE", path: "/services" },
    ];

    if (userRole === "admin") {
      baseLinks.push({ name: "PROFILE", path: "/admindashboard" });
    } else if (userRole === "user") {
      baseLinks.push({ name: "PROFILE", path: "/userprofile" });
    } else {
      baseLinks.push({ name: "PROFILE", path: "/technicianprofile" });
    }

    baseLinks.push({ name: "CONTACT", path: "/contact" });

    return baseLinks;
  };

  const navLinks = getNavLinks();

  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `${
          isActive ? "text-teal-600 font-bold" : "text-gray-800"
        } font-medium hover:text-teal-400 transition block text-center ${
          item.name === "PROFILE" ? "text-gray-600 font-semibold" : ""
        }`
      }
      onClick={onClick}
    >
      {item.name}
    </NavLink>
  );

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white/95 backdrop-blur-md py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 sm:px-5">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 cursor-pointer flex-shrink-0"
            onClick={handleLogoClick}
            aria-label="Go to home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg flex-shrink-0">
              ✓
            </div>
            <span className="hidden sm:inline">Household Services</span>
            <span className="sm:hidden">H.Services</span>
          </div>

          {/* Search Bar */}
          {showSearch ? (
            <div ref={searchRef} className="flex-1 px-2 sm:px-5 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-teal-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <>
              {/* Desktop Menu */}
              <ul className="hidden md:flex gap-4 lg:gap-8 list-none">
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavItem item={item} />
                  </li>
                ))}
              </ul>

              {/*Desktop Right Side */}
              <div className="hidden md:flex items-center gap-3 lg:gap-5">
                <button
                  className="text-gray-600 text-lg"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <FaSearch />
                </button>

                {/* Helpline link FIXED */}
                <a
                  href="tel:+8801676480060"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 lg:px-5 py-2 lg:py-3 rounded-full flex items-center gap-2 text-xs lg:text-sm font-medium hover:bg-teal-700 transition whitespace-nowrap"
                >
                  <span className="hidden lg:inline">
                    Helpline +880 1676 480060
                  </span>
                  <span className="lg:hidden">+880 1676 480060</span>
                </a>

                {userRole ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border border-red-300 rounded-lg hover:bg-red-50 text-sm"
                  >
                    <FaSignOutAlt />
                    <span className="hidden lg:inline">Sign Out</span>
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border border-teal-300 rounded-lg hover:bg-teal-50 text-sm"
                  >
                    <FaSignInAlt />
                    <span className="hidden lg:inline">Sign In</span>
                  </NavLink>
                )}
              </div>

              {/* Mobile menu Hamburger */}
              <div className="md:hidden flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-600 text-lg sm:text-xl"
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
                    <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Dropdown menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white border-t border-gray-200 px-5 py-4 space-y-4 shadow-lg animate-fadeIn"
          >
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavItem item={item} onClick={() => setIsMenuOpen(false)} />
                </li>
              ))}
            </ul>

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
