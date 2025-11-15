import { useMemo } from "react";
import { Link, useParams, useLoaderData } from "react-router";
import MyContainer from "../components/MyContainer";
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
  const allListingsData = useLoaderData();
  const allListings = useMemo(() => allListingsData || [], [allListingsData]);
  const decodedCategory = decodeURIComponent(categoryName);
  const normalizedCategory = normalizeCategory(decodedCategory);

  const sectionTitle = useMemo(
    () =>
      CATEGORY_LABELS[decodedCategory] ||
      CATEGORY_LABELS[normalizedCategory] ||
      decodedCategory ||
      "Category",
    [decodedCategory, normalizedCategory]
  );

  const listings = useMemo(() => {
    const target = normalizeCategory(decodedCategory).toLowerCase();
    return allListings.filter((listing) => {
      const listingCategory = normalizeCategory(
        listing.category
      )?.toLowerCase();
      return listingCategory === target;
    });
  }, [allListings, decodedCategory]);

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
        <h1 className="mt-2 text-4xl font-bold text-base-content">
          {sectionTitle}
        </h1>
        <p className="mt-3 text-sm text-base-content/70 md:text-base">
          Browse all available listings curated for this category.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-100 py-16 text-center transition-colors duration-300">
          <h2 className="text-xl font-semibold text-base-content">
            No listings found
          </h2>
          <p className="mt-2 max-w-md text-sm text-base-content/70">
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
