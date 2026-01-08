import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../../components/MyContainer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../../config/apiBaseUrl";
import { getAuthToken } from "../../utils/getAuthToken";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";

const AdminListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken(user);
      if (!token) throw new Error("Failed to get auth token");

      const response = await fetch(`${API_BASE_URL}/admin/listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to load listings");

      const data = await response.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading listings:", error);
      toast.error(error.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (listing) => {
    try {
      const token = await getAuthToken(user);
      const response = await fetch(
        `${API_BASE_URL}/admin/listings/${listing._id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to approve listing");

      toast.success("Listing approved successfully");
      loadListings();
    } catch (error) {
      toast.error(error.message || "Failed to approve listing");
    }
  };

  const handleReject = async (listing) => {
    try {
      const token = await getAuthToken(user);
      const response = await fetch(`${API_BASE_URL}/listings/${listing._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to reject listing");

      toast.success("Listing rejected successfully");
      loadListings();
    } catch (error) {
      toast.error(error.message || "Failed to reject listing");
    }
  };

  const handleUpdate = async (listing) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Listing",
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Name</label>
            <input id="swal-name" class="input input-bordered w-full" placeholder="Listing name" value="${
              listing.name || ""
            }" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Category</label>
            <select id="swal-category" class="select select-bordered w-full">
              <option value="Pets" ${
                listing.category === "Pets" ? "selected" : ""
              }>Pets</option>
              <option value="Pet Supplies" ${
                listing.category === "Pet Supplies" ? "selected" : ""
              }>Pet Supplies</option>
              <option value="Accessories" ${
                listing.category === "Accessories" ? "selected" : ""
              }>Accessories</option>
              <option value="Services" ${
                listing.category === "Services" ? "selected" : ""
              }>Services</option>
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Price (BDT)</label>
            <input id="swal-price" type="number" class="input input-bordered w-full" placeholder="Price" value="${
              listing.Price || listing.price || 0
            }" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Description</label>
            <textarea id="swal-description" class="textarea textarea-bordered w-full" placeholder="Listing description">${
              listing.description || ""
            }</textarea>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Image URL</label>
            <input id="swal-image" class="input input-bordered w-full" placeholder="Image URL" value="${
              listing.image || ""
            }" />
          </div>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const category = document.getElementById("swal-category").value;
        const price = Number(document.getElementById("swal-price").value);
        const description = document.getElementById("swal-description").value;
        const image = document.getElementById("swal-image").value;

        if (!name || !category) {
          Swal.showValidationMessage("Name and category are required");
          return null;
        }

        return { name, category, price, description, image };
      },
    });

    if (!formValues) return;

    try {
      const token = await getAuthToken(user);
      const response = await fetch(`${API_BASE_URL}/listings/${listing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) throw new Error("Failed to update listing");

      toast.success("Listing updated successfully");
      loadListings();
    } catch (error) {
      toast.error(error.message || "Failed to update listing");
    }
  };

  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);
  const paginatedListings = listings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading listings...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">All Listings</h1>
        <p className="text-base-content/70">Manage and approve user listings</p>
      </div>

      {listings.length === 0 ? (
        <div className="alert alert-info">
          <span>No listings yet</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>User Email</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedListings.map((listing) => (
                  <tr key={listing._id} className="hover">
                    <td className="font-semibold">{listing.name}</td>
                    <td>{listing.category}</td>
                    <td>
                      {listing.category === "Pets"
                        ? "Free"
                        : `BDT ${Number(
                            listing.Price || listing.price || 0
                          ).toFixed(2)}`}
                    </td>
                    <td className="text-sm">{listing.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          listing.status === "approved"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="text-right">
                      {listing.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success mr-2"
                            onClick={() => handleApprove(listing)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleReject(listing)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {listing.status === "approved" && (
                        <div className="flex gap-2 justify-end">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleUpdate(listing)}
                          >
                            Edit
                          </button>
                          <span className="text-success">✓ Approved</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`btn btn-sm ${
                        page === currentPage ? "btn-active" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </MyContainer>
  );
};

export default AdminListings;
