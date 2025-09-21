import { useEffect, useState } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabaseClient';

export default function LoggedInOutButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 text-gray-400 font-medium border-2 rounded">
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-500 font-medium transition border-2 rounded"
      >
        <FaSignOutAlt />
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate('/login')}
      className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:text-teal-500 font-medium transition border-2 rounded"
    >
      <FaSignInAlt />
      <span>Sign In</span>
    </button>
  );
}
