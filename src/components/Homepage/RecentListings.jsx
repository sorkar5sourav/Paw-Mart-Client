import { useMemo } from "react";
import { Link } from "react-router";

const RecentListings = ({ listings = [] }) => {
  const recentListings = useMemo(() => {
    const sorted = [...listings].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return dateB - dateA;
    });
    return sorted.slice(0, 6);
  }, [listings]);

  if (recentListings.length === 0) {
    return (
      <section className="w-full rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">
          Recent Listings
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          New listings will appear here once available.
        </p>
        <Link
          to="/pets-supply"
          className="btn btn-ghost mt-6 border border-emerald-300 bg-white text-emerald-600 hover:bg-emerald-500 hover:text-white"
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
          <h2 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
            Recent Listings
          </h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
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
          const { _id, name, imageUrl, category, price, location } = listing;

          const displayPrice =
            category === "Pets" || price === 0 || price === "0"
              ? "Free for Adoption"
              : `BDT ${Number(price || 0).toFixed(2)}`;

          return (
            <article
              key={_id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name || "Listing image"}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 shadow">
                  {category || "Uncategorized"}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {name || "Untitled Listing"}
                </h3>
                <p className="text-sm font-medium text-emerald-600">
                  {displayPrice}
                </p>
                <p className="text-sm text-slate-500">
                  {location || "Location not specified"}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/listing-details/${_id}`}
                    className="btn btn-sm w-full bg-emerald-500 font-semibold text-white transition hover:bg-emerald-600"
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
