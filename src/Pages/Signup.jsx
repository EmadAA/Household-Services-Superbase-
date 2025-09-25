/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex patterns
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    mobile: /^01[3-9]\d{8}$/, // Bangladeshi mobile format
    nid: /^\d{10}$/, // Exactly 10 digits
    birthCertificate: /^\d{16,17}$/, // 16 or 17 digits
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Clear previous errors for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Real-time validation
    if (name === 'email' && value) {
      validateEmail(value);
    } else if (name === 'mobile' && value) {
      validateMobile(value);
    } else if (name === 'nid' && value) {
      validateNID(value);
    } else if (name === 'password' && value) {
      validatePassword(value);
    } else if (name === 'cpassword' && value) {
      validateConfirmPassword(value, formData.password);
    }
  };

  const validateEmail = (email) => {
    if (!patterns.email.test(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: "" }));
    return true;
  };

  const validateMobile = (mobile) => {
    if (!patterns.mobile.test(mobile)) {
      setErrors(prev => ({ ...prev, mobile: "Mobile must be 11 digits starting with 01 (e.g., 01712345678)" }));
      return false;
    }
    setErrors(prev => ({ ...prev, mobile: "" }));
    return true;
  };

  const validateNID = (nid) => {
    const isNID = patterns.nid.test(nid);
    const isBirthCert = patterns.birthCertificate.test(nid);
    
    if (!isNID && !isBirthCert) {
      setErrors(prev => ({ 
        ...prev, 
        nid: "NID must be exactly 10 digits OR Birth Certificate must be 16-17 digits" 
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, nid: "" }));
    return true;
  };

  const validatePassword = (password) => {
    if (!patterns.password.test(password)) {
      setErrors(prev => ({ 
        ...prev, 
        password: "Password must be at least 6 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character" 
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: "" }));
    return true;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      setErrors(prev => ({ ...prev, cpassword: "Passwords don't match" }));
      return false;
    }
    setErrors(prev => ({ ...prev, cpassword: "" }));
    return true;
  };

  const checkUniqueness = async (field, value, role) => {
    try {
      // Check in users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq(field, value)
        .limit(1);

      if (userError) throw userError;
      if (userData && userData.length > 0) {
        return false; // Found duplicate in users
      }

      // Check in technicians table
      const { data: techData, error: techError } = await supabase
        .from('technicians')
        .select('id')
        .eq(field, value)
        .limit(1);

      if (techError) throw techError;
      if (techData && techData.length > 0) {
        return false; // Found duplicate in technicians
      }

      // Check in pending_technicians table
      const { data: pendingData, error: pendingError } = await supabase
        .from('pending_technicians')
        .select('id')
        .eq(field, value)
        .limit(1);

      if (pendingError) throw pendingError;
      if (pendingData && pendingData.length > 0) {
        return false; // Found duplicate in pending_technicians
      }

      return true; // Unique
    } catch (error) {
      console.error('Uniqueness check error:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate all fields
      const isEmailValid = validateEmail(formData.email);
      const isMobileValid = validateMobile(formData.mobile);
      const isPasswordValid = validatePassword(formData.password);
      const isConfirmPasswordValid = validateConfirmPassword(formData.cpassword, formData.password);
      
      let isNIDValid = true;
      if (formData.role === 'technician') {
        isNIDValid = validateNID(formData.nid);
      }

      if (!isEmailValid || !isMobileValid || !isPasswordValid || !isConfirmPasswordValid || !isNIDValid) {
        setLoading(false);
        return;
      }

      // Check uniqueness
      console.log('Checking email uniqueness...');
      const isEmailUnique = await checkUniqueness('email', formData.email, formData.role);
      if (!isEmailUnique) {
        setErrors(prev => ({ ...prev, email: "This email is already registered" }));
        setLoading(false);
        return;
      }

      console.log('Checking mobile uniqueness...');
      const isMobileUnique = await checkUniqueness('mobile', formData.mobile, formData.role);
      if (!isMobileUnique) {
        setErrors(prev => ({ ...prev, mobile: "This mobile number is already registered" }));
        setLoading(false);
        return;
      }

      if (formData.role === 'technician') {
        console.log('Checking NID uniqueness...');
        const isNIDUnique = await checkUniqueness('nid', formData.nid, formData.role);
        if (!isNIDUnique) {
          setErrors(prev => ({ ...prev, nid: "This NID/Birth Certificate number is already registered" }));
          setLoading(false);
          return;
        }
      }

      // Proceed with registration
      if (formData.role === 'user') {
        await handleUserSignup();
      } else if (formData.role === 'technician') {
        await handleTechnicianSignup();
      }

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSignup = async () => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullname: formData.fullname,
          role: formData.role,
          mobile: formData.mobile
        }
      }
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    if (authData.user) {
      alert('Registration successful! Please check your email and confirm your account.');
      navigate('/login');
    }
  };

  const handleTechnicianSignup = async () => {
    try {
      let nidFileUrl = null;
      let uploadedFileName = null;

      // Step 1: Upload NID file first
      if (formData.nidFile) {
        const fileExt = formData.nidFile.name.split('.').pop();
        uploadedFileName = `technician_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        console.log('Uploading file:', uploadedFileName);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('nid-files')
          .upload(uploadedFileName, formData.nidFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('File upload failed: ' + uploadError.message);
        }

        console.log('Upload successful:', uploadData);

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('nid-files')
          .getPublicUrl(uploadedFileName);
        
        nidFileUrl = publicUrl;
        console.log('File URL:', nidFileUrl);
      }

      // Step 2: Insert into pending_technicians table
      console.log('Inserting technician data...');
      
      const { data: insertData, error: insertError } = await supabase
        .from('pending_technicians')
        .insert([
          {
            fullname: formData.fullname,
            mobile: formData.mobile,
            email: formData.email,
            password: formData.password,
            category: formData.category,
            nid: formData.nid,
            nid_file_url: nidFileUrl,
            status: 'pending_verification'
          }
        ]);

      if (insertError) {
        console.error('Database insert error:', insertError);
        
        // Clean up uploaded file if database insert fails
        if (uploadedFileName) {
          console.log('Cleaning up uploaded file...');
          await supabase.storage.from('nid-files').remove([uploadedFileName]);
        }
        
        throw new Error('Database storage failed: ' + insertError.message);
      }

      console.log('Database insert successful:', insertData);

      alert('Technician registration successful! All your data and documents have been saved. Please wait for admin verification.');
      navigate('/registration-complete');

    } catch (error) {
      console.error('Technician signup error:', error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-[850px] min-h-[700px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-[120px] flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold uppercase bg-black/40 px-6 py-2 rounded-md">
            Sign Up
          </h1>
        </div>

        {/* Form */}
        <div className="flex-1 p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 transition
                  ${errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                  ${formData.mobile ? "pt-6" : ""}`}
              />
              <label
                htmlFor="mobile"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.mobile ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Mobile (Ex: 01712345678)
              </label>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
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
                className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 transition
                  ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                  ${formData.email ? "pt-6" : ""}`}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.email ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
                    
                    className={`w-full p-3 border-2 rounded-lg bg-transparent outline-none focus:ring-2 transition
                      ${errors.nid ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                      ${formData.nid ? "pt-6" : ""}`}
                  />
                  <label
                    htmlFor="nid"
                    className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                      ${formData.nid ? "-top-3 text-sm bg-white px-1" : ""}`}
                  >
                    NID / Birth Certificate No.(10 digits for NID or 16-17 digits for Birth Certificate)
                  </label>
                  {errors.nid && (
                    <p className="text-red-500 text-xs mt-1">{errors.nid}</p>
                  )}
                </div>

                {/* NID Upload */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Upload NID / Birth Certificate (PDF or Image) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    name="nidFile"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formData.nidFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.nidFile.name}
                    </p>
                  )}
                  <p className="text-sm text-green-600 mt-1">
                    Your document will be uploaded securely to our servers
                  </p>
                </div>
              </>
            )}

            {/* Password */}
            <div className="relative item ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 pr-12 border-2 rounded-lg bg-transparent outline-none focus:ring-2 transition 
                  ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                  ${formData.password ? "pt-6" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label
                htmlFor="password"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.password ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="cpassword"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
                className={`w-full p-3 pr-12 border-2 rounded-lg bg-transparent outline-none focus:ring-2 transition
                  ${errors.cpassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                  ${formData.cpassword ? "pt-6" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label
                htmlFor="cpassword"
                className={`absolute left-3 top-3 text-gray-500 text-base transition-all
                  ${formData.cpassword ? "-top-3 text-sm bg-white px-1" : ""}`}
              >
                Confirm Password
              </label>
              {errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
              <strong>Password Requirements:</strong>
              <ul className="list-disc list-inside mt-1">
                <li>At least 6 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (@$!%*?&)</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Sign Up'}
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
