// API functions for listing operations

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Create a new listing
 * @param {Object} listingData - The listing data to be saved
 * @returns {Promise<Object>} - The created listing with response from server
 */
export const createListing = async (listingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

/**
 * Get all listings
 * @returns {Promise<Array>} - Array of listings
 */
export const getAllListings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};

/**
 * Get a single listing by ID
 * @param {string} listingId - The ID of the listing
 * @returns {Promise<Object>} - The listing data
 */
export const getListingById = async (listingId) => {
  try {
    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/listing/${listingId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

/**
 * Get listings created by a specific user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export const getListingsByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/user-listings?userId=${encodeURIComponent(userId)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
};

/**
 * Update a listing
 * @param {string} listingId
 * @param {Object} listingData
 * @returns {Promise<Object>}
 */
export const updateListing = async (listingId, listingData) => {
  try {
    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/listings/${listingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
};

/**
 * Delete a listing
 * @param {string} listingId
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export const deleteListing = async (listingId, userId) => {
  try {
    if (!listingId) {
      throw new Error("Listing ID is required");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await fetch(
      `${API_BASE_URL}/listings/${listingId}?userId=${encodeURIComponent(userId)}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};

