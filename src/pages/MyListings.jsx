import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import MyContainer from "../components/MyContainer";
import { AuthContext } from "../context/AuthContext";
import EditListingModal from "../components/ListingPage/EditListingModal";
import API_BASE_URL from "../config/apiBaseUrl";
import { getAuthToken } from "../utils/getAuthToken";

const MyListings = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const userId = user?.uid || user?.userId || user?.id || "";

  const loadUserListings = useCallback(
    async (abortSignal) => {
      if (!userId || !user) {
        setListings([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const token = await getAuthToken(user);
        if (!token) {
          throw new Error("Failed to get authentication token");
        }

        const response = await fetch(
          `${API_BASE_URL}/user-listings?userId=${encodeURIComponent(userId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: abortSignal,
          }
        );
        if (!response.ok) {
          if (response.status === 403) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.message ||
                "Access denied: You can only view your own listings"
            );
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Failed to load listings (status ${response.status})`
          );
        }
        const data = await response.json();
        if (!abortSignal.aborted) {
          setListings(Array.isArray(data) ? data : data?.listings || []);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return; // Request was cancelled, don't show error
        }
        console.error("Error loading user listings:", error);
        if (!abortSignal.aborted) {
          toast.error(error.message || "Failed to load your listings");
        }
      } finally {
        if (!abortSignal.aborted) {
          setLoading(false);
        }
      }
    },
    [userId, user]
  );

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("Please login to view your listings");
      navigate("/login");
      return;
    }

    const abortController = new AbortController();
    loadUserListings(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [authLoading, user, navigate, loadUserListings]);

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (listing) => {
    if (!userId) {
      toast.error("User ID missing. Please login again.");
      return;
    }

    const confirmation = window.confirm(
      `Are you sure you want to delete "${listing.name}"? This action cannot be undone.`
    );

    if (!confirmation) return;

    try {
      setIsFetching(true);
      const token = await getAuthToken(user);
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const response = await fetch(
        `${API_BASE_URL}/listings/${listing._id}?userId=${encodeURIComponent(
          userId
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403) {
          throw new Error(
            errorData.message ||
              "Access denied: You do not have permission to delete this listing"
          );
        }
        throw new Error(
          errorData.message ||
            `Failed to delete listing (status ${response.status})`
        );
      }
      setListings((prev) => prev.filter((item) => item._id !== listing._id));
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Failed to delete listing:", error);
      toast.error(error.message || "Failed to delete listing");
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    if (!selectedListing) return;

    try {
      setIsFetching(true);
      const token = await getAuthToken(user);
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const response = await fetch(
        `${API_BASE_URL}/listings/${selectedListing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...updatedData,
            userId,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403) {
          throw new Error(
            errorData.message ||
              "Access denied: You do not have permission to update this listing"
          );
        }
        throw new Error(
          errorData.message ||
            `Failed to update listing (status ${response.status})`
        );
      }
      const updatedListingResponse = await response.json();
      const updatedListing =
        updatedListingResponse?.listing || updatedListingResponse;
      setListings((prev) =>
        prev.map((listing) =>
          listing._id === updatedListing._id
            ? { ...listing, ...updatedListing }
            : listing
        )
      );
      toast.success("Listing updated successfully");
      setIsEditModalOpen(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Failed to update listing:", error);
      toast.error(error.message || "Failed to update listing");
    } finally {
      setIsFetching(false);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedListing(null);
  };

  const isBusy = loading || isFetching;

  if (authLoading || loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading your listings...</p>
      </MyContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Listings</h1>
          <p className="text-base-content/70">
            Manage your pets and products. Only you can see and edit these
            listings.
          </p>
        </div>
        <div className="text-sm text-base-content/60">
          Total Listings:{" "}
          <span className="font-semibold text-base-content">
            {listings.length}
          </span>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="bg-base-100 shadow rounded-lg p-8 text-center transition-colors duration-300">
          <h2 className="text-xl font-semibold text-base-content mb-2">
            No listings yet
          </h2>
          <p className="text-base-content/70 mb-4">
            Create a listing to see it appear here and manage it later.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/listing")}
          >
            Create Listing
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg transition-colors duration-300">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Pickup Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing._id} className="hover">
                  <td>
                    <div>
                      <p className="font-semibold text-base-content">
                        {listing.name}
                      </p>
                      <p className="text-xs text-base-content/60 truncate max-w-xs">
                        {listing.description}
                      </p>
                    </div>
                  </td>
                  <td>{listing.category}</td>
                  <td>
                    {listing.category === "Pets"
                      ? "Free"
                      : `BDT ${Number(
                          listing.Price || listing.price || 0
                        ).toFixed(2)}`}
                  </td>
                  <td>{listing.location}</td>
                  <td>
                    {listing.date || listing.pickupDate
                      ? new Date(
                          listing.date || listing.pickupDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span className="badge badge-outline badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEdit(listing)}
                        disabled={isBusy}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(listing)}
                        disabled={isBusy}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditListingModal
        listing={selectedListing}
        isOpen={isEditModalOpen}
        onClose={closeModal}
        onSave={handleUpdate}
      />
    </MyContainer>
  );
};

export default MyListings;
