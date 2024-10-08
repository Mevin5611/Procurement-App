import React from "react";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = React.useState([]);

  React.useEffect(() => {
    const storedOrderHistory = localStorage.getItem("orderHistory");
    if (storedOrderHistory) {
      setOrderHistory(JSON.parse(storedOrderHistory));
    }
  }, []);

  return (
    <div className="p-4 m-10">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orderHistory.length > 0 ? (
        <div className="space-y-4">
          {orderHistory.map((order, index) => (
            <div key={index} className="border p-4 rounded-md">
              <h2 className="font-bold">Order No: {order.orderNo}</h2>
              <p>Date: {order.orderDate}</p>
              <p>Supplier: {order.supplier}</p>
              <h3 className="font-semibold">Items:</h3>
              <ul className="list-disc pl-5">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.itemName} (Qty: {item.orderQty}, Net Amount: {item.netAmount})
                  </li>
                ))}
              </ul>
              <p className="font-bold">Total Amount: {order.totalAmount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
