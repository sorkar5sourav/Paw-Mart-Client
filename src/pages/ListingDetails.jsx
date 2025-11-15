import { useContext, useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import OrderModal from "../components/ListingPage/OrderModal";
import API_BASE_URL from "../config/apiBaseUrl";
import { getAuthToken } from "../utils/getAuthToken";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);

  const fetchListingDetails = useCallback(async () => {
    try {
      setLoading(true);
      if (!id) {
        throw new Error("No listing ID provided");
      }
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await getAuthToken(user);
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const response = await fetch(`${API_BASE_URL}/listing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to load listing (status ${response.status})`
        );
      }
      const data = await response.json();
      // console.log(data);
      setListing(data.result || data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
      toast.error(
        error.message || "Failed to load listing details. Please try again."
      );
      navigate("/pets-supply");
    } finally {
      setLoading(false);
    }
  }, [id, navigate, user]);

  useEffect(() => {
    fetchListingDetails();
  }, [fetchListingDetails]);

  const formatPrice = (price) => {
    if (price === 0 || price === "0") {
      return "Free";
    }
    const parsed = parseFloat(price);
    if (Number.isNaN(parsed)) {
      return "BDT 0.00";
    }
    return `BDT ${parsed.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading listing details...</p>
      </MyContainer>
    );
  }

  if (!listing) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
          <Link to="/pets-supply" className="btn btn-primary">
            Back to Listings
          </Link>
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4">
      <div className="mb-6">
        <Link to="/pets-supply" className="btn btn-ghost btn-sm mb-4">
          ← Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image Section */}
        <div className="bg-base-200 h-full flex justify-center items-center rounded-lg transition-colors duration-300">
          <img
            src={listing.image || listing.imageUrl}
            alt={listing.name}
            className="rounded-lg max-h-140 w-auto"
            onError={(e) => {
              e.target.src =
                "https://i.pinimg.com/736x/44/b2/11/44b211e4d40b1b835da33b55fdf9fd13.jpg";
            }}
          />
        </div>

        {/* Details Section */}
        <div>
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-base-content">
                  {listing.name}
                </h1>
                <span className="badge badge-primary badge-lg">
                  {listing.category}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b pb-4">
              <span className="text-4xl font-bold text-[#357fa7]">
                {formatPrice(listing.Price || listing.price)}
              </span>
              {listing.category === "Pets" && (
                <p className="text-green-600 font-semibold mt-1">
                  Free for Adoption
                </p>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center text-base-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-lg">{listing.location}</span>
            </div>

            {/* Pickup Date */}
            <div className="flex items-center text-base-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg">
                Pickup Date: {formatDate(listing.date || listing.pickupDate)}
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-base-300 pt-4">
              <h2 className="text-2xl font-semibold mb-3 text-base-content">
                Description
              </h2>
              <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="border-t border-base-300 pt-4">
              <h2 className="text-2xl font-semibold mb-3 text-base-content">
                Contact Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-base-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <span>{listing.email}</span>
                </div>
                {listing.userName && (
                  <div className="flex items-center text-base-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Listed by: {listing.userName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="btn btn-secondary flex-1 min-w-40"
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to place an order.");
                    navigate("/login");
                    return;
                  }
                  setIsOrderModalOpen(true);
                }}
              >
                Adopt / Order Now
              </button>
              <Link to="/pets-supply" className="btn btn-outline min-w-40">
                Browse More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        listing={listing}
        user={user}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </MyContainer>
  );
};

export default ListingDetails;
