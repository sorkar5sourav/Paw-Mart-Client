import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import MyContainer from "../components/MyContainer";
import { AuthContext } from "../context/AuthContext";
import { getOrdersByUser } from "../api/orderApi";

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

const MyOrders = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = user?.email || "";

  const loadOrders = useCallback(async () => {
    if (!email) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getOrdersByUser(email);
      setOrders(Array.isArray(data) ? data : data?.orders || []);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error.message || "Failed to load your orders");
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    loadOrders();
  }, [authLoading, user, navigate, loadOrders]);

  if (authLoading || loading) {
    return (
      <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen">
        <RingLoader color="#357fa7" size={60} />
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </MyContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MyContainer className="flex-1 py-8 px-4 min-h-screen">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600">Review your adoption requests and supply orders.</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Orders: <span className="font-semibold text-gray-700">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-4">Place an order to see it listed here.</p>
          <button className="btn btn-primary" onClick={() => navigate("/pets-supply")}>Browse Listings</button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th>Listing</th>
                <th>Buyer</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Pick-up Date</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover">
                  <td>
                    <div>
                      <p className="font-semibold text-gray-800">{order.listingName}</p>
                      <p className="text-xs text-gray-500">ID: {order.listingId}</p>
                    </div>
                  </td>
                  <td>{order.buyerName}</td>
                  <td>{formatPrice(order.price)}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span className="block max-w-xs truncate" title={order.address}>
                      {order.address}
                    </span>
                  </td>
                  <td>{order.pickupDate ? new Date(order.pickupDate).toLocaleDateString() : "N/A"}</td>
                  <td>{order.phone}</td>
                  <td>
                    <span className="badge badge-outline badge-info capitalize">{order.status}</span>
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
