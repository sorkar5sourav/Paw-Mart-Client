import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  signInWithCustomToken,
} from "firebase/auth";
import API_BASE_URL from "../config/apiBaseUrl";
import { auth } from "../firebase/firebaseConfig";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithEmailFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithCustomTokenFunc = (token) => {
    setLoading(true);
    return signInWithCustomToken(auth, token);
  };

  const demoSignIn = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/demo`, { method: "POST" });
      const json = await res.json();
      if (json && json.token) {
        await signInWithCustomToken(auth, json.token);
        return { success: true };
      }
      throw new Error("No demo token returned");
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const signoutUserFunc = () => {
    setLoading(true);
    return signOut(auth);
  };
  const sendPassResetEmailFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    firebaseUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    signInWithCustomTokenFunc,
    demoSignIn,
    signoutUserFunc,
    sendPassResetEmailFunc,
    updateProfileFunc,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        setFirebaseUser(currUser);
        try {
          // Get Firebase ID token for backend authentication
          const token = await currUser.getIdToken();

          // Fetch user profile from backend to get role and other details from MongoDB
          const response = await fetch(`${API_BASE_URL}/user-profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userProfile = await response.json();
            // Merge Firebase user with MongoDB profile data
            const enrichedUser = {
              ...currUser,
              role: userProfile?.role || "user",
              ...userProfile,
            };
            setUser(enrichedUser);
          } else {
            // If backend call fails, still set user but without role
            setUser({
              ...currUser,
              role: "user",
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Fallback: set user without role if backend call fails
          setUser({
            ...currUser,
            role: "user",
          });
        }
      } else {
        setUser(null);
        setFirebaseUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
