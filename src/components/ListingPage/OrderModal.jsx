import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { createOrder } from "../../api/orderApi";

const formatPrice = (price) => {
  if (price === 0 || price === "0") {
    return "Free";
  }
  const parsed = parseFloat(price);
  if (Number.isNaN(parsed)) {
    return "BDT 0.00";
  }
  return `BDT ${parsed.toFixed(2)}`;
};

const OrderModal = ({ listing, user, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!listing) {
    return null;
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose?.();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!listing || !user) {
      toast.error("Missing user or listing details.");
      return;
    }

    const form = event.target;

    const quantity =
      listing.category === "Pets"
        ? 1
        : Math.max(1, parseInt(form.quantity?.value, 10) || 1);

    const orderData = {
      buyerName: user.displayName || "Anonymous",
      email: user.email,
      listingId: listing._id,
      listingName: listing.name,
      quantity,
      price: listing.price,
      address: form.address.value,
      pickupDate: form.pickupDate?.value || listing.pickupDate || "",
      phone: form.phone.value,
      notes: form.notes.value,
    };

    if (!orderData.address || !orderData.pickupDate || !orderData.phone) {
      toast.error("Please fill in address, phone, and pick-up date.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createOrder(orderData);
      toast.success("Order placed successfully!");
      form.reset();
      handleClose();
    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white text-gray-800 max-w-3xl w-full">
        <h3 className="font-bold text-2xl mb-4 text-[#357fa7]">Complete Your Order</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Buyer Name</label>
              <input
                type="text"
                value={user?.displayName || "Anonymous"}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Listing ID</label>
              <input
                type="text"
                value={listing?._id || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Listing Name</label>
              <input
                type="text"
                value={listing?.name || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                defaultValue={listing?.category === "Pets" ? 1 : 1}
                readOnly={listing?.category === "Pets"}
                className={`input input-bordered w-full ${
                  listing?.category === "Pets" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={formatPrice(listing?.price)}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                required
                rows="3"
                className="textarea textarea-bordered w-full"
                placeholder="Enter delivery or pick-up address"
              ></textarea>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pick-up Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={listing?.pickupDate?.split("T")?.[0] || ""}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="^\\+?[0-9\\s-]{7,15}$"
                  placeholder="Enter contact number"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea
              name="notes"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Any additional information or requests"
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
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Submit Order"}
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

OrderModal.propTypes = {
  listing: PropTypes.object,
  user: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default OrderModal;
