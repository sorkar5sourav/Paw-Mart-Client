import { useContext, useState } from "react";
import { useNavigate } from "react-router";
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
  const isAdmin = user?.role === "admin";

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

      await response.json();

      toast.success("Listing created successfully!");

      form.reset();
      setCategory("");
      navigate("/dashboard/listings");
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

  return (
    <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen py-8 px-4">
      <div className="card bg-base-100 text-base-content w-full max-w-3xl shadow-2xl p-10 transition-colors duration-300">
        <h3 className="font-bold text-center text-4xl mb-10 text-primary">
          Create New Listing
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product/Pet Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Product/Pet Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product or pet name"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
                {!isAdmin && (
                  <span className="text-base-content/60 text-xs ml-2">
                    (Admin only for products)
                  </span>
                )}
              </label>
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
                required
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Pets">Pets (Adoption)</option>
                {isAdmin && <option value="Food">Food</option>}
                {isAdmin && <option value="Accessories">Accessories</option>}
                {isAdmin && (
                  <option value="Care Products">Care Products</option>
                )}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Price <span className="text-red-500">*</span>
                {category === "Pets" && (
                  <span className="text-base-content/60 text-xs ml-2">
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
                className={`input input-bordered w-full ${
                  category === "Pets" ? "bg-base-200 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              required
              rows="4"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Pick Up Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="pickupDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </MyContainer>
  );
};

export default ListingForm;
