import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import { getListingById } from "../api/listingApi";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  const fetchListingDetails = async () => {
    try {
      setLoading(true);
      const data = await getListingById(id);
      setListing(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
      toast.error("Failed to load listing details. Please try again.");
      navigate("/pets-supply");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === 0 || price === "0") {
      return "Free";
    }
    return `$${parseFloat(price).toFixed(2)}`;
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
        <p className="mt-4 text-gray-600">Loading listing details...</p>
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
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-6">
        <Link
          to="/pets-supply"
          className="btn btn-ghost btn-sm mb-4"
        >
          ← Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <div className="sticky top-8">
            <img
              src={listing.imageUrl || "https://via.placeholder.com/600x600?text=No+Image"}
              alt={listing.name}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* Details Section */}
        <div>
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-800">
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
                {formatPrice(listing.price)}
              </span>
              {listing.category === "Pets" && (
                <p className="text-green-600 font-semibold mt-1">
                  Free for Adoption
                </p>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-700">
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
            <div className="flex items-center text-gray-700">
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
                Pickup Date: {formatDate(listing.pickupDate)}
              </span>
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-4">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Contact Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
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
                  <div className="flex items-center text-gray-700">
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
            <div className="flex gap-4 pt-4">
              <a
                href={`mailto:${listing.email}?subject=Inquiry about ${listing.name}`}
                className="btn btn-primary flex-1"
              >
                Contact Seller
              </a>
              <Link to="/pets-supply" className="btn btn-outline">
                Browse More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default ListingDetails;

