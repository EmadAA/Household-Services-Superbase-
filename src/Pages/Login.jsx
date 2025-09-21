import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to verify admin login
  const verifyAdminLogin = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        return false;
      }

      // Simple password comparison (you should use proper hashing in production)
      // For now, assuming password_hash stores plain text or you handle hashing
      return data.password_hash === password;
    } catch (error) {
      console.error('Admin verification error:', error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First check if this is an admin login
      const isAdmin = await verifyAdminLogin(formData.email, formData.password);
      
      if (isAdmin) {
        // Admin login - create a session manually or handle differently
        alert('Admin login successful!');
        // Store admin info in localStorage for now
        localStorage.setItem('adminEmail', formData.email);
        localStorage.setItem('userRole', 'admin');
        navigate("/admindashboard");
        setLoading(false);
        return;
      }

      // If not admin, try regular Supabase auth login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          alert('Please check your email and confirm your account first!');
        } else if (error.message.includes('Invalid login credentials')) {
          alert('Invalid email or password. Please check your credentials.');
        } else {
          alert('Login failed: ' + error.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        alert('Login successful!');
        navigate("/home");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
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

            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>

            <div className="flex justify-center gap-12 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 text-center"
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
