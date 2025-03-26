import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import "./PaymentTable.css"; // Import styles

const PaymentTable = () => {
  const payments = [
    {
      id: "TXN123456789",
      landTitle: "Green Valley",
      landSize: "2 Acres",
      tenant: "John Doe",
      landlord: "Alice Smith",
      amount: "$5000",
      status: "Success",
      date: "2025-03-25 12:30 PM",
    },
    {
      id: "TXN987654321",
      landTitle: "Sunset Farm",
      landSize: "1.5 Acres",
      tenant: "Jane Smith",
      landlord: "David Johnson",
      amount: "$3000",
      status: "Pending",
      date: "2025-03-25 10:00 AM",
    },
    {
      id: "TXN555888222",
      landTitle: "Golden Field",
      landSize: "3 Acres",
      tenant: "Michael Brown",
      landlord: "Sophia Wilson",
      amount: "$7000",
      status: "Failed",
      date: "2025-03-24 09:15 AM",
    },
  ];

  // Function to display status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Success":
        return <Badge bg="success">✅ Success</Badge>;
      case "Pending":
        return <Badge bg="warning">⏳ Pending</Badge>;
      case "Failed":
        return <Badge bg="danger">❌ Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="payment-container">
      <h2 className="text-center">💳 Payment Records</h2>
      <Table striped bordered hover responsive className="payment-table">
        <thead>
          <tr>
            <th>Land Name</th>
            <th>Land Size</th>
            <th>Tenant</th>
            <th>Landlord</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.landTitle}</td>
              <td>{payment.landSize}</td>
              <td>{payment.tenant}</td>
              <td>{payment.landlord}</td>
              <td>{payment.amount}</td>
              <td>{getStatusBadge(payment.status)}</td>
              <td>{payment.date}</td>
              <td>
                {payment.status === "Success" && (
                  <Button variant="primary" size="sm">📄 View Receipt</Button>
                )}
                {payment.status === "Pending" && (
                  <Button variant="warning" size="sm">🔄 Retry</Button>
                )}
                {payment.status === "Failed" && (
                  <Button variant="danger" size="sm">❌ Report Issue</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentTable;
