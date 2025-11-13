import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { RingLoader } from "react-spinners";
import MyContainer from "../components/MyContainer";
import { getAllListings } from "../api/listingApi";
import { toast } from "react-hot-toast";
import ListingCard from "../components/ListingPage/ListingCard";

const CATEGORY_LABELS = {
  Pets: "Pets (Adoption)",
  Food: "Pet Food",
  Accessories: "Accessories",
  "Care Products": "Pet Care Products",
  "Pet Care Products": "Pet Care Products",
};

const normalizeCategory = (category) => {
  if (!category) return "";
  if (category.toLowerCase() === "pet care products") {
    return "Care Products";
  }
  return category;
};

const CategoryFilteredProduct = () => {
  const { categoryName = "" } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const normalizedCategory = normalizeCategory(decodedCategory);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionTitle = useMemo(
    () =>
      CATEGORY_LABELS[decodedCategory] ||
      CATEGORY_LABELS[normalizedCategory] ||
      decodedCategory ||
      "Category",
    [decodedCategory, normalizedCategory]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchListings = async () => {
      try {
        setLoading(true);
        const allListings = await getAllListings();
        if (!isMounted) return;

        const target = normalizeCategory(decodedCategory).toLowerCase();
        const filtered = allListings.filter((listing) => {
          const listingCategory = normalizeCategory(
            listing.category
          )?.toLowerCase();
          return listingCategory === target;
        });

        setListings(filtered);
      } catch (error) {
        if (isMounted) {
          console.error("Error loading category listings:", error);
          toast.error("Unable to load category listings right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      isMounted = false;
    };
  }, [decodedCategory]);

  if (loading) {
    return (
      <MyContainer className="flex min-h-screen flex-1 flex-col items-center justify-center gap-4">
        <RingLoader color="#357fa7" size={60} />
        <p className="text-gray-600">Loading {sectionTitle} listings...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex flex-1 flex-col gap-8 py-10 px-4">
      <div
        className="flex justify-between items-center
       "
      >
        <Link to="/pets-supply" className="btn btn-ghost btn-sm">
          ← Back to Listings
        </Link>

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
            Category Spotlight
          </p>
        </div>
      </div>
      <div className="text-center">
        <h1 className="mt-2 text-4xl font-bold text-gray-800">
          {sectionTitle}
        </h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          Browse all available listings curated for this category.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No listings found
          </h2>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Check back soon or explore other categories for more options.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </section>
      )}
    </MyContainer>
  );
};

export default CategoryFilteredProduct;
