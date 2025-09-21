import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../supabaseClient';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          // No user → redirect to login
          navigate('/login', { replace: true });
          return;
        }

        setUser(session.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate('/login', { replace: true });
        } else {
          setUser(session.user);
        }
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, [navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If no user, return null (will redirect)
  if (!user) return null;

  // User is authenticated, show protected content
  return children;
}
