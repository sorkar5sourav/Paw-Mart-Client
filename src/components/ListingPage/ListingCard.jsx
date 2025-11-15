import { Link } from "react-router";

const ListingCard = ({ listing }) => {
  const { _id, name, image, imageUrl, category, location, Price, price } = listing;
  // console.log(listing);
  const displayPrice =
    category === "Pets" ? "Free" : `BDT ${Number(Price || price || 0).toFixed(2)}`;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={image || imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg";
          }}
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        <div className="flex items-start justify-between mb-2">
          <h2 className="card-title text-lg line-clamp-2 flex-1">{name}</h2>
          <span className="badge badge-primary badge-sm ml-2 shrink-0">
            {category}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-base-content/70 text-sm mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          <span className="truncate">{location}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold">{displayPrice}</span>
        </div>

        {/* See Details Button */}
        <div className="card-actions justify-end">
          <Link
            to={`/listing-details/${_id}`}
            className="btn btn-primary w-full"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
