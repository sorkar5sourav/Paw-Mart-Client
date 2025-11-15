import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { FiDownload } from "react-icons/fi";
import MyContainer from "../components/MyContainer";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config/apiBaseUrl";
import { getAuthToken } from "../utils/getAuthToken";
import {
  downloadOrdersReport,
  formatPrice,
} from "../utils/downloadOrdersReport";

const MyOrders = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const email = user?.email || "";

  const loadOrders = useCallback(
    async (abortSignal) => {
      if (!email || !user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = await getAuthToken(user);
        if (!token) {
          throw new Error("Failed to get authentication token");
        }

        const response = await fetch(
          `${API_BASE_URL}/orders?email=${encodeURIComponent(email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: abortSignal,
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.message ||
                "Access denied: You can only view your own orders"
            );
          }
          throw new Error(`Failed to load orders (status ${response.status})`);
        }

        const data = await response.json();
        if (!abortSignal.aborted) {
          setOrders(Array.isArray(data) ? data : data?.orders || []);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return; // Request was cancelled, don't show error
        }
        console.error("Error loading orders:", error);
        if (!abortSignal.aborted) {
          toast.error(error.message || "Failed to load your orders");
        }
      } finally {
        if (!abortSignal.aborted) {
          setLoading(false);
        }
      }
    },
    [email, user]
  );

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    const abortController = new AbortController();
    loadOrders(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [authLoading, user, navigate, loadOrders]);

  const handleDeleteOrder = async (order) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    const confirmation = window.confirm(
      `Are you sure you want to delete the order for "${order.listingName}"? This action cannot be undone.`
    );

    if (!confirmation) return;

    try {
      setIsDeleting(true);
      const token = await getAuthToken(user);
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const response = await fetch(`${API_BASE_URL}/orders/${order._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403) {
          throw new Error(
            errorData.message ||
              "Access denied: You do not have permission to delete this order"
          );
        }
        throw new Error(
          errorData.message ||
            `Failed to delete order (status ${response.status})`
        );
      }

      setOrders((prev) => prev.filter((item) => item._id !== order._id));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.message || "Failed to delete order");
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-base-content/70">Loading your orders...</p>
      </MyContainer>
    );
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">My Orders</h1>
          <p className="text-base-content/70">
            Review your adoption requests and supply orders.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end md:items-center">
          <div className="text-sm text-base-content/60">
            Total Orders:{" "}
            <span className="font-semibold text-base-content">
              {orders.length}
            </span>
          </div>
          {orders.length > 0 && (
            <button
              onClick={() =>
                downloadOrdersReport(
                  orders,
                  user?.displayName || user?.email || "User"
                )
              }
              className="btn btn-primary btn-sm gap-2 flex items-center"
            >
              <FiDownload size={16} />
              Download Report
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-base-100 shadow rounded-lg p-8 text-center transition-colors duration-300">
          <h2 className="text-xl font-semibold text-base-content mb-2">
            No orders yet
          </h2>
          <p className="text-base-content/70 mb-4">
            Place an order to see it listed here.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/pets-supply")}
          >
            Browse Listings
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg transition-colors duration-300">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>Listing</th>
                <th>Buyer</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Pick-up Date</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover">
                  <td>
                    <div>
                      <p className="font-semibold text-base-content">
                        {order.listingName}
                      </p>
                      <p className="text-xs text-base-content/60">
                        ID: {order.listingId}
                      </p>
                    </div>
                  </td>
                  <td>{order.buyerName}</td>
                  <td>{formatPrice(order.price)}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span
                      className="block max-w-xs truncate"
                      title={order.address}
                    >
                      {order.address}
                    </span>
                  </td>
                  <td>
                    {order.pickupDate
                      ? new Date(order.pickupDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{order.phone}</td>
                  <td>
                    <span className="badge badge-outline badge-info capitalize">
                      {order.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleDeleteOrder(order)}
                        disabled={isDeleting}
                        title="Delete order"
                      >
                        {isDeleting ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MyContainer>
  );
};

export default MyOrders;
