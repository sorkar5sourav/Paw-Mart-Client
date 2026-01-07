import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../../components/MyContainer";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  return (
    <MyContainer>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="card p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
          <div>
            <div className="text-lg font-semibold">
              {user?.displayName || user?.email}
            </div>
            <div className="text-sm text-muted">
              Role: {user?.role || "user"}
            </div>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default Profile;
