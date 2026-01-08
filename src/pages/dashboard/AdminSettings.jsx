import React from "react";
import MyContainer from "../../components/MyContainer";

const AdminSettings = () => {
  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Settings</h1>
          <p className="text-base-content/70">
            Manage system settings and configurations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* General Settings */}
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              General Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base-content">
                    System Maintenance Mode
                  </p>
                  <p className="text-sm text-base-content/60">
                    Put the system in maintenance mode
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-warning"
                  disabled
                />
              </div>

              <div className="divider"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base-content">
                    Allow New Registrations
                  </p>
                  <p className="text-sm text-base-content/60">
                    Enable or disable new user registrations
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  defaultChecked
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              Email Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base-content">
                    Order Notifications
                  </p>
                  <p className="text-sm text-base-content/60">
                    Send email when new orders are placed
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  defaultChecked
                  disabled
                />
              </div>

              <div className="divider"></div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base-content">
                    Listing Alerts
                  </p>
                  <p className="text-sm text-base-content/60">
                    Notify about pending listings
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  defaultChecked
                  disabled
                />
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="card bg-base-100 shadow-lg p-6">
            <h3 className="text-xl font-bold text-base-content mb-4">
              System Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-base-content/70">Platform Version</span>
                <span className="font-semibold text-base-content">1.0.0</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-base-content/70">Last Updated</span>
                <span className="font-semibold text-base-content">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/70">Support Email</span>
                <span className="font-semibold text-base-content">
                  support@pawmart.local
                </span>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <span>
              ℹ️ Settings are currently in read-only mode. Contact system
              administrator for modifications.
            </span>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default AdminSettings;
