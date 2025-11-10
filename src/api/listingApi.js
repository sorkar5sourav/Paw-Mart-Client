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
    const response = await fetch(`${API_BASE_URL}/listings/${listingId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

