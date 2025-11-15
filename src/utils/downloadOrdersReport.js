import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-hot-toast";

export const formatPrice = (price) => {
  if (price === 0 || price === "0") {
    return "Free";
  }
  const parsed = parseFloat(price);
  if (Number.isNaN(parsed)) {
    return "BDT 0.00";
  }
  return `BDT ${parsed.toFixed(2)}`;
};

export const downloadOrdersReport = (orders, userName) => {
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
      order.status || "pending",
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
