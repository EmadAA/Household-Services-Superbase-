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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // All services data
  const services = {
    "AC & Refrigerator Expert": [
      { name: "AC Installation", price: 1200 },
      { name: "AC Gas Refill", price: 800 },
      { name: "Refrigerator Repair", price: 1000 },
      { name: "Cooling Maintenance", price: 600 },
      { name: "AC Deep Cleaning", price: 900 },
      { name: "AC Compressor Repair", price: 1500 },
      { name: "Freezer Repair", price: 950 },
      { name: "Ice Maker Installation", price: 850 },
      { name: "Thermostat Replacement", price: 700 },
      { name: "AC Duct Cleaning", price: 1100 },
      { name: "Refrigerator Door Seal Replacement", price: 500 },
      { name: "AC Remote Repair", price: 300 },
    ],
    Plumber: [
      { name: "Pipe Leakage Repair", price: 400 },
      { name: "Tap Installation", price: 300 },
      { name: "Bathroom Fitting", price: 600 },
      { name: "Water Tank Cleaning", price: 700 },
      { name: "Drainage Cleaning", price: 500 },
      { name: "Toilet Installation", price: 800 },
      { name: "Water Heater Installation", price: 1000 },
      { name: "Sink Installation", price: 450 },
      { name: "Shower Installation", price: 650 },
      { name: "Water Pump Repair", price: 900 },
      { name: "Geyser Repair", price: 750 },
      { name: "Bathroom Tiles Fixing", price: 850 },
      { name: "Kitchen Sink Repair", price: 400 },
      { name: "Sewer Line Cleaning", price: 1200 },
    ],
    Carpenter: [
      { name: "Furniture Repair", price: 500 },
      { name: "Door Fitting", price: 450 },
      { name: "Wood Polishing", price: 650 },
      { name: "Custom Furniture Design", price: 1200 },
      { name: "Wardrobe Installation", price: 1500 },
      { name: "Cabinet Making", price: 1800 },
      { name: "Window Frame Repair", price: 600 },
      { name: "Bed Frame Construction", price: 2000 },
      { name: "Dining Table Repair", price: 700 },
      { name: "Shelf Installation", price: 400 },
      { name: "Door Lock Fitting", price: 350 },
      { name: "Wooden Flooring", price: 2500 },
      { name: "Kitchen Cabinet Installation", price: 2200 },
      { name: "Sofa Frame Repair", price: 800 },
    ],
    Electrician: [
      { name: "Wiring & Circuit Repair", price: 500 },
      { name: "Light Installation", price: 250 },
      { name: "Switchboard Fixing", price: 300 },
      { name: "Fan & Appliance Setup", price: 400 },
      { name: "Ceiling Fan Installation", price: 450 },
      { name: "Socket Repair", price: 200 },
      { name: "Chandelier Installation", price: 800 },
      { name: "Generator Installation", price: 1500 },
      { name: "Voltage Stabilizer Setup", price: 600 },
      { name: "CCTV Camera Installation", price: 1200 },
      { name: "Electrical Panel Upgrade", price: 1800 },
      { name: "Door Bell Installation", price: 350 },
      { name: "Emergency Light Setup", price: 500 },
      { name: "MCB Replacement", price: 400 },
    ],
    Painter: [
      { name: "Interior Painting", price: 1500 },
      { name: "Exterior Painting", price: 2000 },
      { name: "Ceiling Design", price: 1000 },
      { name: "Texture & Polish", price: 800 },
      { name: "Wall Putty Work", price: 900 },
      { name: "Waterproofing", price: 1200 },
      { name: "Wood Varnishing", price: 700 },
      { name: "Door & Window Painting", price: 600 },
      { name: "Stencil Design", price: 850 },
      { name: "Wallpaper Installation", price: 1100 },
      { name: "Color Consultation", price: 300 },
      { name: "Fence Painting", price: 1300 },
      { name: "Asian Paint Application", price: 1600 },
      { name: "Touch-up & Repair", price: 500 },
    ],
    Cleaner: [
      { name: "Home Deep Cleaning", price: 1000 },
      { name: "Office Cleaning", price: 1200 },
      { name: "Carpet & Sofa Wash", price: 700 },
      { name: "Bathroom Sanitization", price: 600 },
      { name: "Kitchen Deep Cleaning", price: 900 },
      { name: "Window & Glass Cleaning", price: 500 },
      { name: "Floor Scrubbing & Polishing", price: 800 },
      { name: "Balcony Cleaning", price: 400 },
      { name: "Curtain Washing", price: 600 },
      { name: "Mattress Cleaning", price: 750 },
      { name: "AC Filter Cleaning", price: 350 },
      { name: "Car Interior Cleaning", price: 850 },
      { name: "Garage Cleaning", price: 550 },
      { name: "After Party Cleaning", price: 1100 },
    ],
    "Decorator (Home Events)": [
      { name: "Stage Decoration", price: 1500 },
      { name: "Balloon & Floral Setup", price: 500 },
      { name: "Lighting Arrangement", price: 800 },
      { name: "Themed Event Design", price: 1000 },
      { name: "Birthday Party Decoration", price: 1200 },
      { name: "Wedding Decoration", price: 3000 },
      { name: "Anniversary Setup", price: 1400 },
      { name: "Baby Shower Decoration", price: 1100 },
      { name: "Engagement Decoration", price: 2000 },
      { name: "Naming Ceremony Setup", price: 900 },
      { name: "Haldi Ceremony Decoration", price: 1600 },
      { name: "Mehendi Function Decor", price: 1500 },
      { name: "Backdrop Setup", price: 700 },
      { name: "Table Decoration", price: 600 },
    ],
    Housemaid: [
      { name: "Daily Cleaning", price: 400 },
      { name: "Cooking Service", price: 600 },
      { name: "Clothes Washing", price: 300 },
      { name: "Utensil Cleaning", price: 250 },
      { name: "Ironing Service", price: 350 },
      { name: "Grocery Shopping", price: 200 },
      { name: "Baby Care", price: 800 },
      { name: "Elderly Care", price: 900 },
      { name: "Pet Care", price: 500 },
      { name: "Laundry Service", price: 450 },
      { name: "Garden Maintenance", price: 550 },
      { name: "Meal Preparation", price: 700 },
      { name: "House Sitting", price: 600 },
      { name: "Dusting & Mopping", price: 350 },
    ],
    Mover: [
      { name: "Home Shifting", price: 2000 },
      { name: "Office Relocation", price: 2500 },
      { name: "Furniture Transport", price: 1800 },
      { name: "Packing & Unpacking", price: 1000 },
      { name: "Car Transportation", price: 3000 },
      { name: "Bike Transportation", price: 1500 },
      { name: "Interstate Moving", price: 5000 },
      { name: "Piano Moving", price: 2200 },
      { name: "Warehouse Shifting", price: 3500 },
      { name: "Loading & Unloading", price: 800 },
      { name: "Storage Service", price: 1200 },
      { name: "Pet Relocation", price: 1600 },
      { name: "International Moving", price: 8000 },
      { name: "Fragile Items Transport", price: 2000 },
    ],
    "Pest Control Expert": [
      { name: "Cockroach Control", price: 700 },
      { name: "Termite Treatment", price: 1200 },
      { name: "Mosquito & Fly Control", price: 600 },
      { name: "Rodent Removal", price: 900 },
      { name: "Bed Bug Treatment", price: 1100 },
      { name: "Ant Control", price: 550 },
      { name: "Lizard Repellent", price: 500 },
      { name: "Spider Control", price: 650 },
      { name: "Moth Control", price: 600 },
      { name: "Snake Catching", price: 1500 },
      { name: "Bee Hive Removal", price: 1300 },
      { name: "General Pest Control", price: 800 },
      { name: "Wood Borer Treatment", price: 1000 },
      { name: "Garden Pest Control", price: 900 },
    ],
  };

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

  // Close menu & search box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Flatten all services and search
    const allServices = Object.entries(services).flatMap(
      ([category, serviceList]) =>
        serviceList.map((service) => ({
          ...service,
          category,
        })),
    );

    const filtered = allServices.filter(
      (service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(filtered.slice(0, 8)); // Show top 8 results
  };

  // Handle selecting a service from search
  const handleSelectService = (service) => {
    // Navigate to services page with pre-selected category and service
    navigate("/services", {
      state: {
        selectedCategory: service.category,
        selectedService: service.name,
        autoOpen: true,
      },
    });
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

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
            <div
              ref={searchRef}
              className="flex-1 px-2 sm:px-5 max-w-md relative"
            >
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-teal-500"
                autoFocus
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-2 right-2 sm:left-5 sm:right-5 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectService(service)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {service.category}
                          </p>
                        </div>
                        <p className="text-teal-600 font-semibold text-sm">
                          ৳{service.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-2 right-2 sm:left-5 sm:right-5 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                  <p className="text-gray-500 text-center text-sm">
                    No services found
                  </p>
                </div>
              )}
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
                  className="text-gray-600 text-lg hover:text-teal-600 transition"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <FaSearch />
                </button>

                {/* Helpline link */}
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
                  className="text-gray-600 text-lg sm:text-xl hover:text-teal-600 transition"
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
