import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👈 icons
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to verify admin login
  const verifyAdminLogin = async (email, password) => {
    try {
      console.log('🔍 Checking admin login for:', email);
      
      // Try to fetch admin data
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single();

      console.log('📊 Admin query result:', { data, error });

      // If RLS error or no access, just return false (don't show error to user)
      if (error) {
        console.log('❌ Admin query error (expected for non-admins):', error.message);
        return { isAdmin: false, adminData: null };
      }

      if (!data) {
        console.log('❌ No admin found with this email');
        return { isAdmin: false, adminData: null };
      }

      console.log('✅ Admin found:', data.fullname);
      
      // Compare password (exact match)
      const isValidPassword = data.password_hash === password;
      
      console.log('🔐 Password comparison result:', isValidPassword);
      
      return { 
        isAdmin: isValidPassword, 
        adminData: isValidPassword ? data : null 
      };
      
    } catch (error) {
      console.log('💥 Admin verification error (expected for non-admins):', error);
      // Don't treat this as a fatal error - just means user is not admin
      return { isAdmin: false, adminData: null };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🚀 Starting login process...');
      
      // First check if this is an admin login (silently fail if not)
      const { isAdmin, adminData } = await verifyAdminLogin(formData.email, formData.password);
      
      if (isAdmin && adminData) {
        console.log('✅ Admin login successful for:', adminData.fullname);
        
        // Store admin session data
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('adminId', adminData.id);
        localStorage.setItem('adminEmail', adminData.email);
        localStorage.setItem('adminName', adminData.fullname);
        localStorage.setItem('isLoggedIn', 'true');
        
        alert(`🎉 Welcome back, ${adminData.fullname}! Admin login successful.`);
        navigate("/admindashboard");
        setLoading(false);
        return;
      }

      // If not admin, try regular Supabase auth login for users/technicians
      console.log('👤 Attempting regular user login for:', formData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('❌ Supabase auth error:', error);
        
        if (error.message.includes('Email not confirmed')) {
          alert('📧 Please check your email and confirm your account first!');
        } else if (error.message.includes('Invalid login credentials')) {
          alert('🔐 Invalid email or password. Please check your credentials and try again.');
        } else {
          alert('❌ Login failed: ' + error.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log('✅ Regular user login successful:', data.user.email);
        
        // Store user session data
        localStorage.setItem('userRole', data.user.user_metadata?.role || 'user');
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('isLoggedIn', 'true');
        
        alert('🎉 Login successful!');
        
        // Redirect based on user role
        const userRole = data.user.user_metadata?.role;
        if (userRole === 'technician') {
          navigate("/home");
        } else {
          navigate("/home");
        }
      }

    } catch (error) {
      console.error('💥 Login error:', error);
      alert('❌ Login error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg w-[800px] h-[600px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-[200px] flex justify-center items-center">
          <h1 className="text-white text-3xl font-bold uppercase bg-black/40 px-6 py-2 rounded-md">
            Sign In
          </h1>
        </div>

        {/* Form */}
        <div className="flex-1 p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Password with eye toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            {/* Remember me / forgot password */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-12 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 disabled:opacity-50 transition"
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 text-center transition"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;