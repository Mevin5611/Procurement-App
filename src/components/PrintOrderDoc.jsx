import React from "react";

const PrintOrderDoc = ({
  items,
  totalAmount,
  orderDate,
  orderNo,
  supplier,
  setHandlemPrintModal,
  exportToExcel,
  active,
  setSelectedItems,
  setTotalAmount,
  setSelectedSupplier
  
}) => {
  const print = () => {
    
    const printContent = document.querySelector(".printable-div").innerHTML;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
          <html>
            <head>
              <title>Print Purchase Order</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  
                }
                  .div3item{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                  }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
                  .h-purchase{
                  display: flex;
                    justify-content: center;
                    align-items: center;
                  }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);

    printWindow.document.close();
    printWindow.focus(); 
    printWindow.print();
    printWindow.close();
  };

  const handleExit = () => {
      setHandlemPrintModal(false)
      setSelectedItems([]);
    setTotalAmount(0);
    setSelectedSupplier("");
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[85%] m-10">
        <div className="flex justify-between">
          <div className="flex space-x-3 mb-5">
            <button
              onClick={items.length > 0 ? exportToExcel : null}
              className="border p-2 rounded-md bg-stone-100 font-bold shadow-sm"
            >
              Export to Excel
            </button>
            <button
              onClick={print}
              className="border p-2 rounded-md bg-stone-100 font-bold shadow-sm"
            >
              Print
            </button>
          </div>
          <span
            className="font-bold text-lg text-red-700 cursor-pointer rounded-md"
            onClick={() => active === 1 ? handleExit() : setHandlemPrintModal(false)}
          >
            x
          </span>
        </div>
        <div className="border p-10 printable-div">
          <h2 className="text-2xl font-bold mb-4 text-center h-purchase">
            Purchase Order Details
          </h2>
          <div className="flex justify-center mt-5 space-x-5 mb-5 div3item">
            <div>
              <span className="font-bold text-lg">OrderNo</span>
              <span className="font-bold "> : </span>
              <span className="font-semibold text-lg">{orderNo}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Order_Date</span>
              <span className="font-bold "> : </span>
              <span className="font-semibold text-lg">{orderDate}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Supplier</span>
              <span className="font-bold "> : </span>
              <span className="font-semibold text-lg">{supplier}</span>
            </div>
          </div>

          <div className="border p-4 rounded-md mb-5">
            <h4 className="font-bold">Order No: {orderNo}</h4>
            <p>Date: {orderDate}</p>
            <p>Supplier: {supplier}</p>
            <h3 className="font-semibold">Items:</h3>
            <ul className="list-disc pl-5">
              {items.map((item, i) => (
                <li key={i}>
                  {item.itemName} (Qty: {item.orderQty}, Net Amount:{" "}
                  {item.netAmount})
                </li>
              ))}
            </ul>
            <p className="font-bold">Total Amount: {totalAmount}</p>
          </div>

          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Item No</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.itemNo}>
                  <td>{item.itemNo}</td>
                  <td>{item.itemName}</td>
                  <td>{item.orderQty}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.unitPrice * item.orderQty}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <strong>Total Amount:</strong>
                </td>
                <td>
                  <strong>{totalAmount}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintOrderDoc;
