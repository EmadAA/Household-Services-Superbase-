import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function TotalMember() {
  const [stats, setStats] = useState({
    totalTechnicians: 0,
    totalUsers: 0,
    totalMembers: 0,
    totalPendingTechnicians: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      console.log('📊 Fetching database statistics...');
      setError(null);

      // Fetch all counts in parallel for better performance
      const [
        technicianResult,
        userResult,
        pendingResult
      ] = await Promise.all([
        // Count approved technicians
        supabase
          .from('technicians')
          .select('*', { count: 'exact', head: true }),
        
        // Count users
        supabase
          .from('users')
          .select('*', { count: 'exact', head: true }),
        
        // Count pending technicians
        supabase
          .from('pending_technicians')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending_verification')
      ]);

      console.log('📈 Raw results:', {
        technicians: technicianResult,
        users: userResult,
        pending: pendingResult
      });

      // Handle errors
      if (technicianResult.error) {
        console.error('Technicians count error:', technicianResult.error);
      }
      if (userResult.error) {
        console.error('Users count error:', userResult.error);
      }
      if (pendingResult.error) {
        console.error('Pending count error:', pendingResult.error);
      }

      // Extract counts (handle null/undefined cases)
      const technicianCount = technicianResult.count || 0;
      const userCount = userResult.count || 0;
      const pendingCount = pendingResult.count || 0;
      const totalMembers = technicianCount + userCount;

      console.log('📊 Final counts:', {
        technicians: technicianCount,
        users: userCount,
        pending: pendingCount,
        total: totalMembers
      });

      setStats({
        totalTechnicians: technicianCount,
        totalUsers: userCount,
        totalMembers: totalMembers,
        totalPendingTechnicians: pendingCount
      });

    } catch (error) {
      console.error('💥 Statistics fetch error:', error);
      setError('Failed to load statistics: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatistics();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);


  if (loading) {
    return (
      <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
        <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
          <h2 className="text-xl font-bold text-gray-500">Total Members</h2>
        </div>
        <div className="flex justify-center items-center m-3 py-8">
          <div className="text-lg text-gray-500">Loading statistics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">
          Total Members
          {/* {!loading && (
            // <span className="text-sm font-normal text-gray-400 ml-2">
            //   (Updated: {new Date().toLocaleTimeString()})
            // </span>
          )} */}
        </h2>
        
        {/* Refresh Button */}
        <button
          onClick={fetchStatistics}
          disabled={loading}
          className="text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Refreshing...' : ' Refresh'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="m-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
          <button
            onClick={fetchStatistics}
            className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Statistics */}

      {/* Quick Stats Summary */}
      {!error && (
        <div className="m-3 mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <div className="text-2xl font-bold text-green-600">{stats.totalTechnicians}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Technicians</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Users</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-purple-600">{stats.totalMembers}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Total</div>
            </div>
            <div className="p-2">
              <div className={`text-2xl font-bold ${stats.totalPendingTechnicians > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
                {stats.totalPendingTechnicians}
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
