import { useMemo } from "react";
import { Link } from "react-router";
import ListingCard from "../ListingPage/ListingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
    return sorted.slice(0, 12);
  }, [listings]);
  const minSlidesForLoop = 10; // Based on desktop slidesPerView of 5
  const shouldLoop = recentListings.length >= minSlidesForLoop;
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
      <div className="flex flex-col gap-4 text-center mb-4 md:flex-row md:items-end md:justify-between md:text-left">
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

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={20}
        autoplay={
          shouldLoop
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        loop={shouldLoop}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: false },
          640: { slidesPerView: 3, centeredSlides: true },
          1024: { slidesPerView: 4, centeredSlides: true },
        }}
        className="feedback-swiper"
      >
        {recentListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            {({ isActive }) => (
              <div
                className={`card bg-base-100 shadow-lg h-full flex flex-col justify-between transition-all duration-300 ${
                  isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"
                }`}
              >
                <ListingCard key={listing._id} listing={listing} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecentListings;
