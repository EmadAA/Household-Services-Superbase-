import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { supabase } from "../../supabaseClient";

export default function PersonalInformation({ userData, onProfileUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.fullname || "",
    email: userData.email || "",
    phone: userData.mobile || "",
    nid: userData.nid || "",
    joiningDate: new Date(userData.created_at).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    userRole: userData.role || "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        alert("Not logged in.");
        setSaving(false);
        return;
      }

      const userId = session.user.id;
      const userRole = session.user.user_metadata?.role;

      // Prepare update data
      const updateData = {
        fullname: formData.name,
        mobile: formData.phone,
        email: formData.email,
      };

      // Add NID for technicians only
      if (userRole === 'technician') {
        updateData.nid = formData.nid;
      }

      // Determine which table to update
      let tableName = '';
      if (userRole === 'user') {
        tableName = 'users';
      } else if (userRole === 'technician') {
        tableName = 'technicians';
      } else {
        tableName = 'admin';
      }

      // Update in Supabase
      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', userId);

      if (error) throw error;

      alert("✅ Profile updated successfully!");
      setIsEditing(false);
      if (onProfileUpdated) onProfileUpdated(); // Refresh parent data

    } catch (error) {
      console.error("Update error:", error);
      alert(`❌ ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userData.fullname || "",
      email: userData.email || "",
      phone: userData.mobile || "",
      nid: userData.nid || "",
      joiningDate: new Date(userData.created_at).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      userRole: userData.role || "user",
    });
  };

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-4 sm:p-5 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px]">
      <div className="flex flex-col sm:flex-row justify-between w-full border-b-2 pb-4 gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-500">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 w-full sm:w-auto border border-teal-900 rounded flex items-center justify-center gap-2"
          >
            <HiPencil />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="p-3 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div className="text-left">
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <h2 className="mb-3 mt-1 text-lg font-medium">{formData.name}</h2>
            )}
          </div>
          {/* Email */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <h2 className="mt-1 text-lg font-medium">{formData.email}</h2>
            )}
          </div>
          {/* Phone */}
          <div className="text-left">
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <h2 className="mt-1 text-lg font-medium">{formData.phone}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
