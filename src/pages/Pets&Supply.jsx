import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import MyContainer from "../components/MyContainer";
import ListingCard from "../components/ListingPage/ListingCard";
import SkeletonCard from "../components/ListingPage/SkeletonCard";

const PetsSupply = () => {
  const listingsData = useLoaderData();
  const listings = useMemo(() => listingsData || [], [listingsData]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const categories = [
    "All",
    "Pets",
    "Food",
    "Accessories",
    "Pet Care Products",
  ];

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    let filtered = [...listings];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.name?.toLowerCase().includes(query) ||
          listing.description?.toLowerCase().includes(query) ||
          listing.location?.toLowerCase().includes(query)
      );
    }

    setFilteredListings(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [listings, selectedCategory, searchQuery]);

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-base-content">
          Pets & Supplies
        </h1>
        <p className="text-center text-base-content/70">
          Browse all available listings
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <b>Category : </b>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              setSelectedCategory(newCategory);
              if (newCategory === "All") {
                setSearchParams({});
              } else {
                setSearchParams({ category: newCategory });
              }
            }}
            className="select select-bordered w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-base-content/70">
          Showing {filteredListings.length} of {listings.length} listings
        </p>
      </div>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/80 text-lg">No listings found</p>
          <p className="text-base-content/60 mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings
              .slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
              )
              .map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
          </div>

          {/* Pagination Controls */}
          {Math.ceil(filteredListings.length / ITEMS_PER_PAGE) > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from(
                  {
                    length: Math.ceil(filteredListings.length / ITEMS_PER_PAGE),
                  },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`btn btn-sm ${
                      page === currentPage ? "btn-active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={
                  currentPage ===
                  Math.ceil(filteredListings.length / ITEMS_PER_PAGE)
                }
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center text-sm text-base-content/60 mt-4">
            Page {currentPage} of{" "}
            {Math.ceil(filteredListings.length / ITEMS_PER_PAGE)} | Showing{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredListings.length)} of{" "}
            {filteredListings.length} listings
          </div>
        </>
      )}
    </MyContainer>
  );
};

export default PetsSupply;
