import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function ApproveGigs() {
  const [pendingTechnicians, setPendingTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // Fetch pending technicians from database
  useEffect(() => {
    fetchPendingTechnicians();
  }, []);

  const fetchPendingTechnicians = async () => {
    try {
      const { data, error } = await supabase
        .from('pending_technicians')
        .select('*')
        .eq('status', 'pending_verification')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingTechnicians(data || []);
      console.log('📊 Fetched pending technicians:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching pending technicians:', error);
      alert('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const approveTechnician = async (pendingTech) => {
    setProcessingId(pendingTech.id);
    
    try {
      console.log('🚀 Starting approval for:', pendingTech.fullname, 'ID:', pendingTech.id);
      
      // Step 1: Create auth user account
      console.log('📝 Creating Supabase auth user...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: pendingTech.email,
        password: pendingTech.password,
        options: {
          data: {
            fullname: pendingTech.fullname,
            role: 'technician',
            mobile: pendingTech.mobile,
            category: pendingTech.category,
            nid: pendingTech.nid,
            nid_file_url: pendingTech.nid_file_url,
            is_verified: true
          }
        }
      });

      if (authError) {
        console.error('❌ Auth signup error:', authError);
        throw new Error(`Failed to create user account: ${authError.message}`);
      }

      console.log('✅ Auth user created successfully:', authData.user?.id);
      
      // Step 2: Wait for database trigger to complete
      console.log('⏳ Waiting for database trigger to add to technicians table...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

      // Step 3: NOW DELETE from pending_technicians table
      console.log('🗑️ Attempting to delete from pending_technicians table...');
      console.log('🔍 Deleting record with ID:', pendingTech.id);
      
      const { error: deleteError, count } = await supabase
        .from('pending_technicians')
        .delete({ count: 'exact' })
        .eq('id', pendingTech.id);

      console.log('🔍 Delete operation result:', { deleteError, count });

      if (deleteError) {
        console.error('❌ Delete error details:', deleteError);
        
        // Try to update status instead of delete as a fallback
        console.log('⚠️ Delete failed, trying to update status...');
        const { error: updateError } = await supabase
          .from('pending_technicians')
          .update({ status: 'approved', approved_at: new Date().toISOString() })
          .eq('id', pendingTech.id);
          
        if (updateError) {
          console.error('❌ Update also failed:', updateError);
          throw new Error(`Could not delete or update record: ${deleteError.message}`);
        }
        
        console.log('✅ Updated status to approved as fallback');
      } else {
        console.log('✅ Successfully deleted record, count:', count);
      }

      // Step 4: Update local state to remove from UI immediately
      console.log('🔄 Updating local state...');
      setPendingTechnicians(prev => {
        const updated = prev.filter(tech => tech.id !== pendingTech.id);
        console.log('📊 Updated list length:', updated.length);
        return updated;
      });

      alert(`✅ ${pendingTech.fullname} has been approved successfully! They can now login with their credentials.`);
      
      // Step 5: Refresh data to ensure UI is in sync
      console.log('🔄 Refreshing data from database...');
      setTimeout(() => {
        fetchPendingTechnicians();
      }, 1000);

    } catch (error) {
      console.error('💥 Approval process failed:', error);
      alert(`❌ Approval failed: ${error.message}`);
      
      // Refresh data on error to ensure UI shows correct state
      fetchPendingTechnicians();
    } finally {
      setProcessingId(null);
    }
  };

  const rejectTechnician = async (pendingTech) => {
    const confirmReject = window.confirm(`Are you sure you want to reject ${pendingTech.fullname}'s application? This action cannot be undone.`);
    
    if (!confirmReject) return;

    setProcessingId(pendingTech.id);

    try {
      console.log('🚫 Rejecting technician:', pendingTech.fullname, 'ID:', pendingTech.id);
      
      // Delete from pending_technicians table
      const { error: deleteError, count } = await supabase
        .from('pending_technicians')
        .delete({ count: 'exact' })
        .eq('id', pendingTech.id);

      console.log('Delete result:', { deleteError, count });

      if (deleteError) {
        throw new Error(`Delete failed: ${deleteError.message}`);
      }

      // Optional: Delete the uploaded NID file from storage
      if (pendingTech.nid_file_url) {
        try {
          const fileName = pendingTech.nid_file_url.split('/').pop();
          await supabase.storage.from('nid-files').remove([fileName]);
          console.log('📁 NID file deleted from storage');
        } catch (storageError) {
          console.log('⚠️ Could not delete NID file:', storageError);
        }
      }

      // Update local state
      setPendingTechnicians(prev => prev.filter(tech => tech.id !== pendingTech.id));

      alert(`❌ ${pendingTech.fullname}'s application has been rejected and removed.`);
      
      // Refresh data
      fetchPendingTechnicians();

    } catch (error) {
      console.error('Rejection error:', error);
      alert('❌ Error rejecting application: ' + error.message);
      fetchPendingTechnicians();
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCategory = (category) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-8 shadow-xl md:w-[85%] lg:w-full">
        <div className="text-center">
          <div className="text-xl">Loading pending applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header */}
      <h2 className="border-b-2 pb-4 text-xl font-bold text-gray-500">
        Approval Request : ({pendingTechnicians.length} pending)
      </h2>

      {/* Content */}
      {pendingTechnicians.length === 0 ? (
        <div className="mt-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">All Caught Up!</h3>
          <p className="text-gray-500">No pending technician applications to review.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Scrollable Wrapper */}
          <div className="col-span-full max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pendingTechnicians.map((tech) => (
                <div
                  key={tech.id}
                  className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">{tech.fullname}</h3>
                    <p className="text-sm text-gray-600">Email: {tech.email}</p>
                    <p className="text-sm">
                      <span className="font-medium">Mobile:</span> {tech.mobile}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Category:</span> {formatCategory(tech.category)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">NID:</span> {tech.nid}
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied: {formatDate(tech.created_at)}
                    </p>
                    
                    {/* Debug info - remove this after testing */}
                    <p className="text-xs text-purple-600">
                      ID: {tech.id} | Status: {tech.status}
                    </p>
                    
                    {/* NID File Link */}
                    {tech.nid_file_url && (
                      <div className="mt-2">
                        <a 
                          href={tech.nid_file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          📄 View NID Document
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button 
                      onClick={() => approveTechnician(tech)}
                      disabled={processingId === tech.id}
                      className="flex-1 rounded bg-teal-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-teal-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === tech.id ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          ...
                        </span>
                      ) : (
                        'Approve'
                      )}
                    </button>
                    <button 
                      onClick={() => rejectTechnician(tech)}
                      disabled={processingId === tech.id}
                      className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
