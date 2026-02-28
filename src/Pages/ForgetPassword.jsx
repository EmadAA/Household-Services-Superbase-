import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Get email from Login page coz this email is used to create the account
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If user directly visits this page ,go back  brother!
      navigate("/login");
    }
  }, [location, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          // eslint-disable-next-line no-undef
          process.env.NODE_ENV === "development"
            ? "http://localhost:5173/reset-password"
            : "https://household-services-superbase-d7gy.vercel.app/reset-password",
      });

      if (error) {
        alert("Error: " + error.message);
      } else {
        alert("Password reset link sent! Check your email.");
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg w-[500px] p-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forget Password
        </h2>

        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            title="This email is used to create account, it cannot be changed here!"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg shadow hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;