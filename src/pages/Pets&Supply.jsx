import { useEffect, useState } from "react";
import { Link } from "react-router";
import MyContainer from "../components/MyContainer";
import { getAllListings } from "../api/listingApi";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import ListingCard from "../components/ListingPage/ListingCard";

const PetsSupply = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Pets", "Food", "Accessories", "Toys"];

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, selectedCategory, searchQuery]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getAllListings();
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterListings = () => {
    let filtered = [...listings];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    // Filter by search query
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
  };


  if (loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-gray-600">Loading listings...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Pets & Supplies
        </h1>
        <p className="text-center text-gray-600">
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
            onChange={(e) => setSelectedCategory(e.target.value)}
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
        <p className="text-gray-600">
          Showing {filteredListings.length} of {listings.length} listings
        </p>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No listings found</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
           <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </MyContainer>
  );
};

export default PetsSupply;

