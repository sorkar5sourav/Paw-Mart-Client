import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const categories = [
  { value: "Pets", label: "Pets" },
  { value: "Food", label: "Food" },
  { value: "Accessories", label: "Accessories" },
  { value: "PetCareProducts", label: "PetCareProducts" },
];

const EditListingModal = ({ listing, isOpen, onClose, onSave }) => {
  const initialState = useMemo(
    () => ({
      name: listing?.name || "",
      category: listing?.category || "",
      price: listing?.category === "Pets" ? 0 : listing?.Price || listing?.price || 0,
      location: listing?.location || "",
      description: listing?.description || "",
      imageUrl: listing?.image || listing?.imageUrl || "",
      pickupDate: listing?.date
        ? listing.date?.split("T")?.[0] || listing.date
        : listing?.pickupDate?.split("T")?.[0] || listing?.pickupDate || "",
    }),
    [listing]
  );

  const [formState, setFormState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormState(initialState);
  }, [initialState]);

  const handleClose = () => {
    if (!isSubmitting) {
      onClose?.();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      category: value,
      price: value === "Pets" ? 0 : prev.price,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!listing) return;

    if (!formState.name || !formState.category || !formState.location || !formState.description || !formState.imageUrl || !formState.pickupDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      name: formState.name,
      category: formState.category,
      Price: formState.category === "Pets" ? 0 : parseFloat(formState.price) || 0,
      location: formState.location,
      description: formState.description,
      image: formState.imageUrl,
      date: formState.pickupDate,
      userId: listing?.userId,
    };

    try {
      setIsSubmitting(true);
      await onSave?.(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!listing) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-base-100 text-base-content max-w-3xl w-full transition-colors duration-300">
        <h3 className="font-bold text-2xl mb-4 text-primary">Update Listing</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product / Pet Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formState.category}
                onChange={handleCategoryChange}
                required
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={
                  formState.category === "Pets" ? 0 : formState.price === undefined ? "" : formState.price
                }
                onChange={handleChange}
                min="0"
                step="0.01"
                readOnly={formState.category === "Pets"}
                className={`input input-bordered w-full ${
                  formState.category === "Pets" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
              {formState.category === "Pets" && (
                <p className="text-xs text-green-600 mt-1">Pets are free for adoption.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pick-up Date</label>
              <input
                type="date"
                name="pickupDate"
                value={formState.pickupDate}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
              rows="4"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={(event) => {
          event.preventDefault();
          handleClose();
        }}
      >
        <button type="button" className="hidden">
          close
        </button>
      </form>
    </div>
  );
};

export default EditListingModal;
