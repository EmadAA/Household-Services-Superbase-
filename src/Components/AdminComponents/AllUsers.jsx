 
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../../supabaseClient";
import Img from "../../assets/images/Image.png";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);

  // Fetch users from database
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.mobile.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      console.log("🔍 Fetching users from database...");
      setError(null);

      // Fetch users data
      const { data, error, count } = await supabase
        .from("users")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      console.log("📊 Supabase response:", { data, error, count });

      if (error) {
        console.error("❌ Supabase error:", error);
        setError(`Database Error: ${error.message}`);

        // If RLS is blocking, show specific message
        if (
          error.message.includes("row-level security") ||
          error.code === "PGRST116"
        ) {
          console.log("🔒 RLS policy is blocking access. Checking policies...");
          alert("⚠️ Access denied to users table. Please check RLS policies.");
        }

        setUsers([]);
        setFilteredUsers([]);
        return;
      }

      console.log("✅ Fetched users successfully:", data?.length || 0);
      console.log("📋 User data:", data);

      const userData = data || [];
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error("💥 Fetch error:", error);
      setError(`Fetch Error: ${error.message}`);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect above
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 const deleteUser = async (userId, userName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${userName}'s account?\n\n` +
    `This will:\n` +
    `• Remove the user from the database\n` +
    `• Delete their authentication account\n` +
    `• This action cannot be undone\n\n` +
    `Type "DELETE" to confirm:`
  );
  
  if (!confirmDelete) return;
  
  // Additional confirmation
  const typeConfirm = window.prompt(`To permanently delete ${userName}'s account, type "DELETE" (all caps):`);
  if (typeConfirm !== "DELETE") {
    alert("Deletion cancelled - confirmation text didn't match.");
    return;
  }

  setDeleting(userId);

  try {
    console.log('🗑️ Starting user deletion process for ID:', userId);
    
    // Step 1: Get user data first to verify it exists
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    console.log('👤 User data fetched:', userData);
    console.log('❌ Fetch error:', fetchError);

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        throw new Error('User not found or access denied due to database policies');
      }
      throw new Error('Failed to fetch user data: ' + fetchError.message);
    }

    if (!userData) {
      throw new Error('User not found in database');
    }

    console.log('✅ User found, proceeding with deletion...');

    // Step 2: Try to delete from users table first
    console.log('🗑️ Attempting to delete from users table...');
    
    const { error: deleteError, count } = await supabase
      .from('users')
      .delete({ count: 'exact' })
      .eq('id', userId);

    console.log('Delete result:', { deleteError, count });

    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
      
      if (deleteError.message.includes('row-level security')) {
        throw new Error('Access denied: Unable to delete user due to database security policies. Please contact system administrator.');
      } else if (deleteError.code === 'PGRST116') {
        throw new Error('User deletion blocked by database policies');
      } else {
        throw new Error('Failed to delete user: ' + deleteError.message);
      }
    }

    if (count === 0) {
      console.warn('⚠️ No rows were deleted - user may not exist or may already be deleted');
      throw new Error('No user was deleted - user may not exist or may already be removed');
    }

    console.log(`✅ Successfully deleted ${count} user record(s)`);

    // Step 3: Also try to delete from auth.users (this might fail silently due to permissions)
    try {
      console.log('🔐 Attempting to delete auth user...');
      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userId);
      
      if (authDeleteError) {
        console.log('⚠️ Auth delete error (may be expected):', authDeleteError);
        // Don't fail the whole operation if auth delete fails
      } else {
        console.log('✅ Auth user deleted successfully');
      }
    } catch (authError) {
      console.log('⚠️ Auth deletion failed (may be expected due to permissions):', authError);
      // Continue - the main database deletion succeeded
    }

    alert(`✅ ${userName}'s account has been successfully deleted from the database.`);
    
    // Step 4: Refresh the list
    console.log('🔄 Refreshing user list...');
    await fetchUsers();

  } catch (error) {
    console.error('💥 Delete operation failed:', error);
    alert(`❌ Failed to delete user: ${error.message}`);
  } finally {
    setDeleting(null);
  }
};


//for additional info
  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // Debug function to check table access
  const debugTableAccess = async () => {
    try {
      console.log("🔍 Testing users table access...");

      // Test basic connection
      const { data: testData, error: testError } = await supabase
        .from("users")
        .select("count")
        .limit(1);

      console.log("Test result:", { testData, testError });

      // Check if we can see the table structure
      const { data: structureData, error: structureError } = await supabase
        .from("users")
        .select("id")
        .limit(1);

      console.log("Structure test:", { structureData, structureError });
    } catch (error) {
      console.error("Debug error:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-8 shadow-xl md:w-[85%] lg:w-full">
        <div className="text-center">
          <div className="text-xl">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header & Search Bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row">
        <h2 className="text-xl font-bold text-gray-500">
          All Users : ({filteredUsers.length} total)
        </h2>

        <form onSubmit={handleSearch} className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Search users
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaSearch className="h-4 w-4" />
            </div>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-2 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Search by name, email, or mobile..."
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-teal-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="text-red-800">
              <p className="font-medium">Error loading users:</p>
              <p className="text-sm">{error}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={fetchUsers}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Retry
                </button>
                <button
                  onClick={debugTableAccess}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Debug Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {!error && filteredUsers.length === 0 ? (
        <div className="mt-8 text-center">
          {/* <div className="text-6xl mb-4">👥</div> */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? "No Matching Users" : "No Users Found"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? `No users match your search "${searchTerm}"`
              : "No registered users in the system yet."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-teal-600 hover:text-teal-800 underline"
            >
              Clear search
            </button>
          )}

          {/* Debug info */}
          <div className="mt-4 text-sm text-gray-400">
            <p>Debug: Check browser console for detailed logs</p>
            <button
              onClick={debugTableAccess}
              className="mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            >
              Test Database Access
            </button>
          </div>
        </div>
      ) : (
        !error && (
          <div className="col-span-full max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <img
                      src={Img}
                      alt="User"
                      className="rounded-[20px] border-2 border-gray-600 w-full"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {user.fullname}
                    </h3>
                    {/* <span className="font-medium">Joined:</span>{" "}
                    {formatDate(user.created_at)} */}
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Mobile:</span> {user.mobile}
                    </p>
                    {/* Additional Info */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">User ID:</span>
                        <span className="ml-1 font-mono text-xs">
                          {user.id}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => deleteUser(user.id, user.fullname)}
                      disabled={deleting === user.id}
                      className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === user.id ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        "Delete Account"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
