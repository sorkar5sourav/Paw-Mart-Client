import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import MyContainer from "../components/MyContainer";
import ListingCard from "../components/ListingPage/ListingCard";
import SkeletonCard from "../components/ListingPage/SkeletonCard";

const PAGE_SIZE = 12;

const CategoryFilteredProduct = () => {
  const data = useLoaderData() || [];
  const listings = useMemo(() => data.result || data, [data]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (category && category !== "All") params.category = category;
    if (minPrice) params.min = minPrice;
    if (maxPrice) params.max = maxPrice;
    if (sort) params.sort = sort;
    if (page) params.page = page;
    setSearchParams(params);
  }, [query, category, minPrice, maxPrice, sort, page, setSearchParams]);

  const filtered = useMemo(() => {
    let items = [...(listings || [])];
    if (category && category !== "All")
      items = items.filter((i) => i.category === category);
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          (i.name || "").toLowerCase().includes(q) ||
          (i.description || "").toLowerCase().includes(q)
      );
    }
    if (minPrice)
      items = items.filter(
        (i) => Number(i.price || i.Price || 0) >= Number(minPrice)
      );
    if (maxPrice)
      items = items.filter(
        (i) => Number(i.price || i.Price || 0) <= Number(maxPrice)
      );
    if (sort === "price_asc")
      items.sort(
        (a, b) =>
          Number(a.price || a.Price || 0) - Number(b.price || b.Price || 0)
      );
    else if (sort === "price_desc")
      items.sort(
        (a, b) =>
          Number(b.price || b.Price || 0) - Number(a.price || a.Price || 0)
      );
    else
      items.sort(
        (a, b) =>
          new Date(b.createdAt || b.date || 0) -
          new Date(a.createdAt || a.date || 0)
      );
    return items;
  }, [listings, category, query, minPrice, maxPrice, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <MyContainer className="py-8 flex-1">
      <h1 className="text-3xl font-bold mb-2">Explore Listings</h1>
      <p className="text-sm text-muted mb-6">
        Search, filter and browse available pets and supplies.
      </p>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or description"
          className="input input-bordered flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-48"
        >
          {["All", "Pets", "Food", "Accessories", "Pet Care Products"].map(
            (c) => (
              <option key={c} value={c}>
                {c}
              </option>
            )
          )}
        </select>
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          className="input input-bordered w-32"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="input input-bordered w-32"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      <div className="mb-4 text-sm text-muted">Showing {total} results</div>

      {listings.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : total === 0 ? (
        <div className="text-center py-12">No results found.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pageItems.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <button
                className="btn btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default CategoryFilteredProduct;
