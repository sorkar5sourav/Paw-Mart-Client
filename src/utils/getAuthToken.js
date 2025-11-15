/**
 * Gets the Firebase ID token for the current user
 * @param {Object} user - Firebase user object
 * @returns {Promise<string|null>} - The ID token or null if user is not available
 */
export const getAuthToken = async (user) => {
  if (!user) {
    return null;
  }

  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

