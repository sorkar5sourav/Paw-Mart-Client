import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

const downloadOrdersReport = (orders, userName) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: "My Orders Report",
      subject: "Order Details Export",
      author: userName,
    });

    // Add title
    doc.setFontSize(16);
    doc.text("My Orders Report", 14, 15);

    // Add user information
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`User: ${userName}`, 14, 25);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      14,
      32
    );

    // Prepare table data
    const tableData = orders.map((order) => [
      order.listingName,
      order.buyerName,
      formatPrice(order.price),
      order.quantity,
      order.address,
      order.pickupDate
        ? new Date(order.pickupDate).toLocaleDateString()
        : "N/A",
      order.phone,
      order.status,
    ]);

    // Add table using autoTable
    autoTable(doc, {
      head: [
        [
          "Listing",
          "Buyer",
          "Price",
          "Quantity",
          "Address",
          "Pick-up Date",
          "Phone",
          "Status",
        ],
      ],
      body: tableData,
      startY: 40,
      theme: "grid",
      headerStyles: {
        backgroundColor: [53, 127, 167], // #357fa7
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        halign: "left",
      },
      alternateRowStyles: {
        backgroundColor: [240, 245, 250],
      },
      margin: { top: 40 },
      didDrawPage: (data) => {
        // Footer
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.getHeight();
        const pageWidth = pageSize.getWidth();
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${data.pageNumber}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        });
      },
    });

    // Save the PDF
    doc.save(`Orders_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("Report downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate report");
  }
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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600">
            Review your adoption requests and supply orders.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end md:items-center">
          <div className="text-sm text-gray-500">
            Total Orders:{" "}
            <span className="font-semibold text-gray-700">{orders.length}</span>
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
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-4">
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
                      <p className="font-semibold text-gray-800">
                        {order.listingName}
                      </p>
                      <p className="text-xs text-gray-500">
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
                      {order.status}
                    </span>
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
