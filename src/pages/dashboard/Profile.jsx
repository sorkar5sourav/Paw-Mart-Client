import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../../components/MyContainer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../config/apiBaseUrl";
import { getAuthToken } from "../../utils/getAuthToken";

const Profile = () => {
  const { user, updateProfileFunc, signoutUserFunc } = useContext(AuthContext);
  // console.log("Current user data:", user);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!formData.displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      // Update Firebase profile
      await updateProfileFunc(formData.displayName, formData.photoURL);

      // Update MongoDB user record
      const token = await getAuthToken(user);
      if (token) {
        await fetch(`${API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            displayName: formData.displayName,
            email: user?.email,
          }),
        });
      }

      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signoutUserFunc();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            My Profile
          </h1>
          <p className="text-base-content/70">
            Manage your account settings and personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Picture Section */}
          <div className="md:col-span-1">
            <div className="card bg-base-100 shadow-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-secondary overflow-hidden mb-4 border-4 border-base-200">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-base-200 text-3xl">
                      👤
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-base-content">
                  {user?.displayName || user?.email}
                </h2>
                <p className="text-sm text-base-content/60 mt-1">
                  {user?.email}
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary">
                  {user?.role === "admin" ? "👑 Admin" : "👤 User"}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="md:col-span-2">
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-bold text-base-content mb-6">
                Account Information
              </h3>

              {!editing ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-base-content/60">Full Name</p>
                      <p className="text-lg font-semibold text-base-content">
                        {user?.displayName || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="divider my-3"></div>

                  <div>
                    <p className="text-sm text-base-content/60">
                      Email Address
                    </p>
                    <p className="text-lg font-semibold text-base-content break-all">
                      {user?.email}
                    </p>
                  </div>

                  <div className="divider my-3"></div>

                  <div>
                    <p className="text-sm text-base-content/60">Account Role</p>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user?.role === "admin"
                            ? "bg-warning/20 text-warning"
                            : "bg-info/20 text-info"
                        }`}
                      >
                        {user?.role === "admin"
                          ? "Administrator"
                          : "Regular User"}
                      </span>
                    </div>
                  </div>

                  <div className="divider my-3"></div>

                  <div>
                    <p className="text-sm text-base-content/60">Photo URL</p>
                    <p className="text-sm text-base-content break-all">
                      {user?.photoURL || "No photo provided"}
                    </p>
                  </div>

                  <div className="divider my-3"></div>

                  <div>
                    <p className="text-sm text-base-content/60">
                      Account Status
                    </p>
                    <p className="text-lg font-semibold text-success">
                      ✓ Active
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setEditing(true)}
                      className="btn btn-primary flex-1"
                    >
                      ✏️ Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline btn-error flex-1"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-base-content">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-base-content">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="https://example.com/photo.jpg"
                    />
                    {formData.photoURL && (
                      <div className="mt-3 text-center">
                        <img
                          src={formData.photoURL}
                          alt="Preview"
                          className="h-24 w-24 rounded-full object-cover mx-auto border-2 border-primary"
                        />
                      </div>
                    )}
                  </div>

                  <div className="alert alert-info mt-4">
                    <span>
                      Email cannot be changed. This is your account identifier.
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="btn btn-success flex-1"
                    >
                      {isSaving ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "💾 Save Changes"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          displayName: user?.displayName || "",
                          photoURL: user?.photoURL || "",
                        });
                      }}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow p-6 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h4 className="font-semibold text-base-content">My Listings</h4>
            <p className="text-2xl font-bold text-primary mt-2">View</p>
          </div>

          <div className="card bg-base-100 shadow p-6 text-center">
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-semibold text-base-content">Orders</h4>
            <p className="text-2xl font-bold text-info mt-2">View</p>
          </div>

          <div className="card bg-base-100 shadow p-6 text-center">
            <div className="text-3xl mb-2">⚙️</div>
            <h4 className="font-semibold text-base-content">Settings</h4>
            <p className="text-2xl font-bold text-secondary mt-2">Manage</p>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default Profile;
