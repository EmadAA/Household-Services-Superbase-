// Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "./LoggedInOutButton";
export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null); // Close menu/search when clicking outside
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
  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/home");
  };
  const navLinks = [
    { name: "HOME", path: "/home", end: true },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICE", path: "/services" },
    { name: "PROFILE", path: "/profile" },
    { name: "CONTACT", path: "/contact" },
  ];
  const NavItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) => ` ${
        isActive ? "text-teal-600 font-bold" : "text-gray-800"
      } 
font-medium hover:text-teal-400 transition block text-center`}
      onClick={onClick}
    >
       {item.name}{" "}
    </NavLink>
  );
  return (
    <div className="sticky top-0 z-50">
      {" "}
      <nav className="bg-white/95 backdrop-blur-md py-4 shadow-md">
        {" "}
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-5">
           {/* Logo */}{" "}
          <div
            className="flex items-center gap-2 text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={handleLogoClick}
            aria-label="Go to home"
          >
           {" "}
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-lg">
              ✓ {" "}
            </div>
            Household Service{" "}
          </div>
          {/* Search Bar */}{" "}
          {showSearch ? (
            <div ref={searchRef} className="flex-1 px-5">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              {" "}
            </div>
          ) : (
            <>
              {/* Desktop Menu */}{" "}
              <ul className="hidden md:flex gap-8 list-none">
              {" "}
                {navLinks.map((item) => (
                  <li key={item.path}>
                    <NavItem item={item} />{" "}
                  </li>
                ))}
              {" "}
              </ul>
           {/* Desktop Right Side */}{" "}
              <div className="hidden md:flex items-center gap-5">
              {" "}
                <button
                  className="text-gray-600 text-lg"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <FaSearch />{" "}
                </button>
               {" "}
                <a
                  href="tel:+8801676480060"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-teal-700 transition"
                >
                  Helpline +880 1676 480060 {" "}
                </a>
               <LogoutButton onClick={handleLogout} />
            {" "}
              </div>
             {/* Mobile Hamburger */}{" "}
              <div className="md:hidden flex items-center gap-4">
               {" "}
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-gray-600 text-xl"
                  aria-label="Search"
                >
                   <FaSearch />{" "}
                </button>
              {" "}
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="text-gray-800 focus:outline-none"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                 {" "}
                  {isMenuOpen ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
{" "}
                </button>
               {" "}
              </div>
             {" "}
            </>
          )}
         {" "}
        </div>
        {/* Mobile Dropdown */}{" "}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white border-t border-gray-200 px-5 py-4 space-y-4 shadow-lg animate-fadeIn"
          >
         {" "}
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavItem item={item} onClick={() => setIsMenuOpen(false)} />
                </li>
              ))}
            </ul>
            {/* Centered Logout */}{" "}
            <div className="flex justify-center">
             {" "}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-500 font-medium transition"
              >
                <FaSignOutAlt />{" "}
                <span>Logout</span>{" "}
              </button>
              {" "}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

    