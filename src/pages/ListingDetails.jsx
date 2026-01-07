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
  const [mainImage, setMainImage] = useState(null);
  const [related, setRelated] = useState([]);

  const fetchListingDetails = useCallback(
    async (abortSignal) => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error("No listing ID provided");
        }

        // include auth token if available, but allow public access
        const headers = {};
        if (user) {
          const token = await getAuthToken(user).catch(() => null);
          if (token) headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/listing/${id}`, {
          headers,
          signal: abortSignal,
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Failed to load listing (status ${response.status})`
          );
        }
        const data = await response.json();
        if (!abortSignal.aborted) {
          const resolved = data.result || data;
          setListing(resolved);
          setMainImage(
            resolved.images?.[0] || resolved.image || resolved.imageUrl || null
          );
          // fetch related items (best-effort)
          if (resolved.category) {
            fetch(
              `${API_BASE_URL}/listings?category=${encodeURIComponent(
                resolved.category
              )}&limit=4`
            )
              .then((r) => r.json())
              .then((d) => setRelated((d && d.result) || d || []))
              .catch(() => {});
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return; // Request was cancelled, don't show error
        }
        console.error("Error fetching listing details:", error);
        if (!abortSignal.aborted) {
          toast.error(
            error.message || "Failed to load listing details. Please try again."
          );
          navigate("/pets-supply");
        }
      } finally {
        if (!abortSignal.aborted) {
          setLoading(false);
        }
      }
    },
    [id, navigate, user]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchListingDetails(abortController.signal);

    return () => {
      abortController.abort();
    };
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
        {/* Image Gallery Section */}
        <div className="bg-base-200 h-full rounded-lg transition-colors duration-300 p-4">
          <div
            className="rounded-lg overflow-hidden mb-4 flex items-center justify-center"
            style={{ minHeight: 320 }}
          >
            {mainImage ? (
              <img
                src={mainImage}
                alt={listing.name}
                className="max-h-[420px] w-auto object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="h-48 w-full bg-slate-200" />
            )}
          </div>

          {Array.isArray(listing.images) && listing.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto">
              {listing.images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(src)}
                  className="flex-none rounded overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`thumb-${idx}`}
                    className="h-20 w-32 object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content">
                  {listing.name}
                </h1>
                <span className="badge badge-primary badge-lg">
                  {listing.category}
                </span>
              </div>
            </div>

            <div className="border-b pb-4">
              <span className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                {formatPrice(listing.Price || listing.price)}
              </span>
              {listing.category === "Pets" && (
                <p className="text-green-600 font-semibold mt-1">
                  Free for Adoption
                </p>
              )}
            </div>

            <div className="flex items-center text-base-content justify-between">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              <div className="text-sm text-muted">
                Posted: {formatDate(listing.createdAt || listing.date)}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-2xl font-semibold mb-3 text-base-content">
                Overview
              </h2>
              <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Specs */}
            {listing.specs && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <ul className="list-disc pl-5 text-sm text-base-content/80">
                  {Object.entries(listing.specs).map(([k, v]) => (
                    <li key={k}>
                      <strong>{k}:</strong> {String(v)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-3">Reviews</h3>
              {Array.isArray(listing.reviews) && listing.reviews.length > 0 ? (
                <div className="space-y-3">
                  {listing.reviews.map((r, i) => (
                    <div key={i} className="p-3 bg-base-100 rounded">
                      <div className="flex items-center justify-between">
                        <strong>{r.author || "Anonymous"}</strong>
                        <span className="text-sm">
                          {r.rating ? `⭐ ${r.rating}` : null}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/80 mt-1">
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No reviews yet.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="btn btn-primary flex-1 min-w-40"
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
              <button
                className="btn btn-outline"
                onClick={() =>
                  navigator.share
                    ? navigator.share({
                        title: listing.name,
                        text: listing.description,
                        url: window.location.href,
                      })
                    : toast("Share not supported in this browser")
                }
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related items */}
      {related && related.length > 0 && (
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Related Listings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related
              .filter((r) => r._id !== listing._id)
              .map((r) => (
                <div key={r._id} className="card p-3">
                  <Link to={`/listing-details/${r._id}`} className="block">
                    <img
                      src={r.image || r.imageUrl}
                      alt={r.name}
                      className="h-32 w-full object-cover mb-2"
                    />
                    <div className="font-semibold">{r.name}</div>
                  </Link>
                </div>
              ))}
          </div>
        </section>
      )}

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
