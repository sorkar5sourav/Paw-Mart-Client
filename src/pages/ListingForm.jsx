import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import MyContainer from "../components/MyContainer";
import API_BASE_URL from "../config/apiBaseUrl";
import { getAuthToken } from "../utils/getAuthToken";

const ListingForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create a listing");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const form = e.target;
    const name = form.name?.value;
    const selectedCategory = form.category?.value;
    const price =
      selectedCategory === "Pets"
        ? 0
        : Number.isNaN(parseFloat(form.price?.value))
        ? 0
        : parseFloat(form.price?.value);
    const location = form.location?.value;
    const description = form.description?.value;
    const imageUrl = form.imageUrl?.value;
    const pickupDate = form.pickupDate?.value;
    const email = user.email;

    // Validation
    if (
      !name ||
      !selectedCategory ||
      !location ||
      !description ||
      !imageUrl ||
      !pickupDate
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    if (
      selectedCategory !== "Pets" &&
      (!form.price?.value || parseFloat(form.price.value) < 0)
    ) {
      toast.error("Please enter a valid price");
      setIsSubmitting(false);
      return;
    }

    try {
      const listingData = {
        name,
        category: selectedCategory,
        Price: price,
        location,
        description,
        image: imageUrl,
        date: pickupDate,
        email,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
      };

      const token = await getAuthToken(user);
      if (!token) {
        toast.error("Failed to get authentication token. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to create listing (status ${response.status})`
        );
      }

      const createdListing = await response.json();
      console.log(createdListing);

      toast.success("Listing created successfully!");

      // Reset form
      form.reset();
      setCategory("");

      // Navigate to home or listings page
      navigate("/");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(
        error.message || "Failed to create listing. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const priceInput = e.target.form.price;
    if (priceInput) {
      priceInput.value = selectedCategory === "Pets" ? "0" : "";
    }
  };

  if (!user) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <div className="card bg-[#357fa7] text-white w-full max-w-md shadow-2xl">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">Please login to create a listing</p>
            <Link to="/login" className="btn btn-outline btn-accent">
              Go to Login
            </Link>
          </div>
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen py-8 px-4">
      <div className="card bg-[#357fa7] text-white w-full max-w-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center my-6 md:my-8">
          Create New Listing
        </h2>
        <div className="card-body pt-0">
          <div className="border border-gray-200 w-full mb-5"></div>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset space-y-4">
              {/* Product/Pet Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product/Pet Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product or pet name"
                  required
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                  className="select font-semibold select-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white scheme-dark"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled className="text-gray-800 bg-white">
                    Select a category
                  </option>
                  <option value="Pets" className="text-gray-800 bg-white">
                    Pets
                  </option>
                  <option value="Food" className="text-gray-800 bg-white">
                    Food
                  </option>
                  <option
                    value="Accessories"
                    className="text-gray-800 bg-white"
                  >
                    Accessories
                  </option>
                  <option
                    value="Care Products"
                    className="text-gray-800 bg-white"
                  >
                    Care Products
                  </option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price <span className="text-red-400">*</span>
                  {category === "Pets" && (
                    <span className="text-amber-300 text-xs ml-2">
                      (Free for adoption)
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder={category === "Pets" ? "0 (Free)" : "Enter price"}
                  min="0"
                  step="0.01"
                  required
                  defaultValue={category === "Pets" ? "0" : ""}
                  readOnly={category === "Pets"}
                  className={`input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white ${
                    category === "Pets" ? "cursor-not-allowed opacity-70" : ""
                  }`}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  required
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  required
                  rows="4"
                  className="textarea font-semibold textarea-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white resize-none"
                ></textarea>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  required
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pick Up Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white scheme-dark"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Email (Readonly) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  readOnly
                  className="input font-semibold input-bordered w-full bg-white/30 placeholder-white/60 focus:outline-none cursor-not-allowed opacity-70 text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-outline btn-accent w-full mt-6"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Listing"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </MyContainer>
  );
};

export default ListingForm;
