 
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    role: "user",
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
    mobile: /^01[3-9]\d{8}$/,
    nid: /^\d{10}$/,
    birthCertificate: /^\d{16,17}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ 
      ...prev, 
      role,
      ...(role === 'user' && { category: "", nid: "", nidFile: null })
    }));
    setErrors(prev => ({ ...prev, category: "", nid: "" }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Real time validation
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
        nid: "NID must be exactly 10 digits OR Birth Certificate must be 16 or 17 digits" 
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

  // uniqueness check
  const checkUniqueness = async (field, value) => {
    try {
      console.log(` Checking uniqueness for ${field}: ${value}`);
      //rpc= Remote Procedure Call, ready made function in supabase
      const { data, error } = await supabase.rpc('check_field_uniqueness', {
        field_name: field,
        field_value: value
      });

      if (error) {
        console.error('RPC error:', error);
        return false;
      }

      // console.log(`Uniqueness check result for ${field}:`, data);
      return data; 
      
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
      // console.log(' Starting registration process...');
      
      // Validate all fields 
      const isEmailValid = validateEmail(formData.email);
      const isMobileValid = validateMobile(formData.mobile);
      const isPasswordValid = validatePassword(formData.password);
      const isConfirmPasswordValid = validateConfirmPassword(formData.cpassword, formData.password);
      
      let isNIDValid = true;
      if (formData.role === 'technician') {
        isNIDValid = validateNID(formData.nid);
        
        if (!formData.category) {
          setErrors(prev => ({ ...prev, category: "Please select a category" }));
          setLoading(false);
          return;
        }
        
        if (!formData.nidFile) {
          alert("Please upload your NID/Birth Certificate file");
          setLoading(false);
          return;
        }
      }

      if (!isEmailValid || !isMobileValid || !isPasswordValid || !isConfirmPasswordValid || !isNIDValid) {
        // console.log(' Validation failed');
        setLoading(false);
        return;
      }

      // email uniqueness checks
      const isEmailUnique = await checkUniqueness('email', formData.email);
      if (!isEmailUnique) {
        setErrors(prev => ({ ...prev, email: "This email is already registered. Please use a different email address." }));
        setLoading(false);
        return;
      }
      // mobile num uniqueness checks
      const isMobileUnique = await checkUniqueness('mobile', formData.mobile);
      if (!isMobileUnique) {
        setErrors(prev => ({ ...prev, mobile: "This mobile number is already registered. Please use a different mobile number." }));
        setLoading(false);
        return;
      }

      if (formData.role === 'technician') {
      // NID uniqueness checks 
        const isNIDUnique = await checkUniqueness('nid', formData.nid);
        if (!isNIDUnique) {
          setErrors(prev => ({ ...prev, nid: "This NID/Birth Certificate number is already registered. Please check your number." }));
          setLoading(false);
          return;
        }
      }

      // console.log(' All uniqueness checks done, proceeding with registration...');

      // Proceed for registration
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
    console.log(' Creating user account');
    
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
      console.error('Auth error:', authError);
      
      if (authError.message.includes('already registered')) {
        setErrors(prev => ({ ...prev, email: "This email is already registered" }));
      } else {
        alert('Registration failed: ' + authError.message);
      }
      return;
    }

    if (authData.user) {
      // console.log(' User registered successfully');
      alert('Registration successful! Please check your email and confirm your account.');
      navigate('/login');
    }
  };

  const handleTechnicianSignup = async () => {
    try {
      console.log(' Creating technician registration');
      
      let nidFileUrl = null;
      let uploadedFileName = null;

      // Upload NID file first for checkup
      if (formData.nidFile) {
        const fileExt = formData.nidFile.name.split('.').pop();
        uploadedFileName = `technician_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        // console.log('Uploading file:', uploadedFileName);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('nid-files')
          .upload(uploadedFileName, formData.nidFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('File upload failed: ' + uploadError.message);
        }

        console.log(' Upload successful:', uploadData);

        const { data: { publicUrl } } = supabase.storage
          .from('nid-files')
          .getPublicUrl(uploadedFileName);
        
        nidFileUrl = publicUrl;
        // console.log(' File URL:', nidFileUrl);
      }

      // pending_technicians table
      console.log(' Inserting technician data...');
      
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
        ])
        .select();

      if (insertError) {
        console.error('Database insert error:', insertError);
        
        if (uploadedFileName) {
          // console.log(' Cleaning up uploaded file');
          await supabase.storage.from('nid-files').remove([uploadedFileName]);
        }
        
        if (insertError.message.includes('duplicate') || insertError.code === '23505') {
          if (insertError.message.includes('email')) {
            setErrors(prev => ({ ...prev, email: "This email is already registered" }));
          } else if (insertError.message.includes('mobile')) {
            setErrors(prev => ({ ...prev, mobile: "This mobile number is already registered" }));
          } else if (insertError.message.includes('nid')) {
            setErrors(prev => ({ ...prev, nid: "This NID/Birth Certificate number is already registered" }));
          } else {
            throw new Error('Duplicate data detected');
          }
          return;
        }
        
        throw new Error('Database storage failed: ' + insertError.message);
      }

      console.log(' Database insert successful:', insertData);

      alert(' Technician registration successful! All your data and documents have been saved. Please wait for admin verification. You will be notified when approved.');
      navigate('/registration-complete');

    } catch (error) {
      console.error('Technician signup error:', error);
      throw error;
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-2xl p-6 text-center">
          <h1 className="text-white text-3xl font-bold uppercase">
            SIGN UP
          </h1>
        </div>

        {/* Role Tabs */}
        <div className="flex">
          <button
            type="button"
            onClick={() => handleRoleChange('user')}
            className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${
              formData.role === 'user'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            User 
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('technician')}
            className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${
              formData.role === 'technician'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Technician
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Mobile */}
            <div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Mobile (01XXXXXXXXX)"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.mobile 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Technician-specific fields */}
            {formData.role === 'technician' && (
              <>
                {/* Category */}
                <div>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      errors.category 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                    }`}
                  >
                    <option value="">Select Category</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="ac_refrigerator_expert">AC & Refrigerator Expert</option>
                    <option value="painter">Painter</option>
                    <option value="cleaner">Cleaner</option>
                    <option value="decorator">Decorator (Home Events)</option>
                    <option value="housemaid">Housemaid</option>
                    <option value="mover">Mover</option>
                    <option value="pest_control_expert">Pest Control Expert</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                {/* NID */}
                <div>
                  <input
                    type="text"
                    id="nid"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    required
                    placeholder="NID (10 digits) or Birth Certificate (16-17 digits)"
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      errors.nid 
                        ? "border-red-500 focus:ring-red-500" 
                        : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                    }`}
                  />
                  {errors.nid && (
                    <p className="text-red-500 text-sm mt-1">{errors.nid}</p>
                  )}
                </div>

                {/* NID File Upload */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Upload NID / Birth Certificate (PDF or Image) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    name="nidFile"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {formData.nidFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.nidFile.name}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className={`w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
                placeholder="Confirm Password"
                className={`w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.cpassword 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-teal-500 focus:border-transparent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.cpassword && (
                <p className="text-red-500 text-sm mt-1">{errors.cpassword}</p>
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
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Sign Up'}
              </button>
              <Link
                to="/login"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 transition-opacity text-center font-semibold"
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
