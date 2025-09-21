import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    role: "",
    nid: "",
    password: "",
    cpassword: "",
    category: "",
    nidFile: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.cpassword) {
        alert("Passwords don't match!");
        setLoading(false);
        return;
      }

      // Sign up user - DON'T store file in metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.fullname,
            role: formData.role,
            mobile: formData.mobile,
            category: formData.role === 'technician' ? formData.category : null,
            nid: formData.role === 'technician' ? formData.nid : null,
            // DON'T store file data here - it's too big
            hasNidFile: formData.nidFile ? true : false // Just store if file exists
          }
        }
      });

      if (authError) {
        alert(authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        alert('Registration successful! Please check your email and confirm your account.');
        navigate('/login');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Your existing JSX stays exactly the same
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-[850px] min-h-[700px] flex flex-col overflow-hidden">
        {/* All your existing JSX code here - no changes needed */}
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-[120px] flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold uppercase bg-black/40 px-6 py-2 rounded-md">
            Sign Up
          </h1>
        </div>

        {/* Form */}
        <div className="flex-1 p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* All your existing form fields... */}
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                  ${formData.fullname ? "pt-6" : ""}`}
              />
              <label
                htmlFor="fullname"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.fullname ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Full Name
              </label>
            </div>

            {/* Mobile */}
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                  ${formData.mobile ? "pt-6" : ""}`}
              />
              <label
                htmlFor="mobile"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.mobile ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Mobile
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                  ${formData.email ? "pt-6" : ""}`}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.email ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Email
              </label>
            </div>

            {/* Role */}
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="technician">Technician</option>
              </select>
              <label
                htmlFor="role"
                className="absolute left-3 -top-3 text-sm bg-white px-1 text-gray-500"
              >
                Role
              </label>
            </div>

            {/* Technician Fields */}
            {formData.role === "technician" && (
              <>
                {/* Category */}
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 rounded-lg outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition"
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="ac_refrigerator_expert">
                      AC & Refrigerator Expert
                    </option>
                    <option value="painter">Painter</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="decorator">Decorator (Home Events)</option>
                    <option value="housemaid">Housemaid</option>
                    <option value="mover">Mover</option>
                    <option value="pest_control_expert">
                      Pest Control Expert
                    </option>
                  </select>
                  <label
                    htmlFor="category"
                    className="absolute left-3 -top-3 text-sm bg-white px-1 text-gray-500"
                  >
                    Category
                  </label>
                </div>

                {/* NID */}
                <div className="relative">
                  <input
                    type="text"
                    id="nid"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                      ${formData.nid ? "pt-6" : ""}`}
                  />
                  <label
                    htmlFor="nid"
                    className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                      ${formData.nid ? "-top-3 text-sm bg-white px-1" : ""}`}
                  >
                    NID / Birth Certificate No.
                  </label>
                </div>

                {/* NID Upload */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Upload NID / Birth Certificate (PDF or Image)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    name="nidFile"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formData.nidFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.nidFile.name}
                    </p>
                  )}
                  <p className="text-sm text-orange-600 mt-1">
                    Note: File will be uploaded after email confirmation
                  </p>
                </div>
              </>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                  ${formData.password ? "pt-6" : ""}`}
              />
              <label
                htmlFor="password"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.password ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Password
              </label>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 transition
                  ${formData.cpassword ? "pt-6" : ""}`}
              />
              <label
                htmlFor="cpassword"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.cpassword ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Confirm Password
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <Link
                to="/login"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 transition-opacity text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
