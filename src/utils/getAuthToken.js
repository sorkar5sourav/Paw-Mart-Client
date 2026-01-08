import { getAuth } from "firebase/auth";

/**
 * Gets the Firebase ID token for the current user
 * Supports both Firebase user objects and merged user objects from AuthContext
 * @param {Object} user - Firebase user object or merged user object from AuthContext
 * @returns {Promise<string|null>} - The ID token or null if user is not available
 */
export const getAuthToken = async (user) => {
  if (!user) {
    return null;
  }

  try {
    // If user has getIdToken method (Firebase user), use it directly
    if (typeof user.getIdToken === "function") {
      const token = await user.getIdToken();
      return token;
    }

    // Otherwise, get the current user from Firebase auth
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    const token = await currentUser.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
