import { useMemo } from "react";
import { Link } from "react-router";

const RecentListings = ({ listings = [] }) => {
  const recentListings = useMemo(() => {
    const sorted = [...listings].sort((a, b) => {
      if (a._id && b._id) {
        if (a._id > b._id) return -1;
        if (a._id < b._id) return 1;
      }
      if (a.createdAt || a.updatedAt || b.createdAt || b.updatedAt) {
        const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
        const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
        return dateB - dateA;
      }
      return 0;
    });
    return sorted.slice(0, 6);
  }, [listings]);

  if (recentListings.length === 0) {
    return (
      <section className="w-full rounded-2xl border border-dashed border-base-300 bg-base-100 py-12 text-center shadow-sm transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-base-content">
          Recent Listings
        </h2>
        <p className="mt-2 text-sm text-base-content/70">
          New listings will appear here once available.
        </p>
        <Link
          to="/pets-supply"
          className="btn btn-ghost mt-6 border border-primary bg-base-100 text-primary hover:bg-primary hover:text-primary-content transition-colors duration-300"
        >
          Browse All Listings
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
            Fresh Arrivals
          </p>
          <h2 className="mt-1 text-3xl font-bold text-base-content md:text-4xl">
            Recent Listings
          </h2>
          <p className="mt-2 text-sm text-base-content/70 md:text-base">
            Discover the latest pets and supplies added by our community.
          </p>
        </div>
        <Link
          to="/pets-supply"
          className="btn btn-outline btn-sm border-emerald-400 text-emerald-600 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recentListings.map((listing) => {
          const {
            _id,
            name,
            image,
            imageUrl,
            category,
            Price,
            price,
            location,
          } = listing;
          const listingPrice = Price || price;
          const listingImage = image || imageUrl;

          const displayPrice =
            category === "Pets" || listingPrice === 0 || listingPrice === "0"
              ? "Free for Adoption"
              : `BDT ${Number(listingPrice || 0).toFixed(2)}`;

          return (
            <article
              key={_id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow transition hover:-translate-y-1 hover:shadow-lg transition-colors duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden bg-base-200">
                {listingImage ? (
                  <img
                    src={listingImage}
                    alt={name || "Listing image"}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://i.pinimg.com/736x/44/b2/11/44b211e4d40b1b835da33b55fdf9fd13.jpg";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-base-content/40">
                    No image
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-base-100/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow">
                  {category || "Uncategorized"}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-base-content line-clamp-2">
                  {name || "Untitled Listing"}
                </h3>
                <p className="text-sm font-medium text-primary">
                  {displayPrice}
                </p>
                <p className="text-sm text-base-content/70">
                  {location || "Location not specified"}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/listing-details/${_id}`}
                    className="btn btn-sm w-full btn-primary font-semibold transition-colors duration-300"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentListings;
