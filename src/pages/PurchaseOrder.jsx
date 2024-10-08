import React, { useEffect, useState } from "react";

import * as XLSX from "xlsx";
import ItemTableList from "../components/ItemTableList";
import { Link } from "react-router-dom";
import PrintOrderDoc from "../components/PrintOrderDoc";
import Supplier from "../components/Supplier";

const PurchaseOrder = () => {
  const [orderNo, setOrderNo] = useState(1);
  const [orderDate] = useState(new Date().toLocaleDateString());
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [handlemPrintModal, setHandlemPrintModal] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("sampleItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    const storedSuppliers = localStorage.getItem("supplier");
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers));
    }

    const storedOrderNo = localStorage.getItem("orderNo");
    if (storedOrderNo) {
      setOrderNo(parseInt(storedOrderNo) + 1);
    }
    const storedOrderHistory = localStorage.getItem("orderHistory");
    if (storedOrderHistory) {
      setOrderHistory(JSON.parse(storedOrderHistory));
    }
  }, []);

  const handleSelectSupplier = (value) => {
    setSelectedSupplier(value);
    setIsSupplierModalOpen(false);
  };

  const handleSelectItem = (item, qty) => {
    const quantity = parseInt(qty);

    if (quantity === 0) {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem.itemNo !== item.itemNo
      );
      setSelectedItems(updatedItems);

      const total = updatedItems.reduce((acc, item) => acc + item.netAmount, 0);
      setTotalAmount(total);

      return;
    }

    const netAmount = quantity * item.unitPrice;

    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.itemNo === item.itemNo
    );

    let updatedItems;

    if (existingItemIndex !== -1) {
      updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        orderQty: quantity,
        netAmount,
      };
    } else {
      const newItem = { ...item, orderQty: quantity, netAmount };
      updatedItems = [...selectedItems, newItem];
    }

    setSelectedItems(updatedItems);

    //total amount
    const total = updatedItems.reduce((acc, item) => acc + item.netAmount, 0);
    setTotalAmount(total);
  };

  //Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Order");
    XLSX.writeFile(workbook, `PurchaseOrder_${orderNo}.xlsx`);
  };

  // Save Order
  const handleSaveOrder = () => {
    const newOrder = {
      orderNo: orderNo,
      orderDate,
      supplier: selectedSupplier,
      items: selectedItems,
      totalAmount,
    };

    const updatedOrderHistory = [...orderHistory, newOrder];
    setOrderHistory(updatedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    localStorage.setItem("orderNo", orderNo.toString());
    setActive(1)
    alert("Order Saved Successfully!");
    setHandlemPrintModal(true)
    
    
    
  };

  const [searchItemNo, setSearchItemNo] = useState("");
  const [searchItemName, setSearchItemName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.itemNo.toLowerCase().includes(searchItemNo.toLowerCase()) &&
      item.itemName.toLowerCase().includes(searchItemName.toLowerCase()) &&
      item.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      item.supplier.toLowerCase().includes(searchSupplier.toLowerCase())
  );

  return (
    <div className="p-4 m-10">
      <Link
        to={"/"}
        className=" font-bold border p-2 rounded-md border-dashed  bg-slate-50"
      >
        Manage Items
      </Link>
      <Link
        to="/order-history"
        className="font-bold border p-2 rounded-md ms-5 border-dashed bg-slate-50"
      >
        Order History
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-4">Create Purchase Order</h1>

      <div className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-bold">Order No:</label>
          <input
            type="text"
            value={"ORD" + orderNo.toString().padStart(3, "0")}
            readOnly
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold">Order Date:</label>
          <input
            type="text"
            value={orderDate}
            readOnly
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2  ">
          <label className="block text-sm font-bold">Supplier:</label>
          <input
            value={selectedSupplier}
            onClick={() => setIsSupplierModalOpen(true)}
            onChange={handleSelectSupplier}
            className="p-2 border rounded w-full  "
          />
        </div>
      </div>

      {isSupplierModalOpen && (
        <Supplier
          supplier={suppliers}
          setIsSupplierModalOpen={setIsSupplierModalOpen}
          isOrder={true}
          handleSelectSupplier={handleSelectSupplier}
        />
      )}

      <ItemTableList
        searchItemNo={searchItemNo}
        setSearchItemNo={setSearchItemNo}
        searchItemName={searchItemName}
        setSearchItemName={setSearchItemName}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        searchSupplier={searchSupplier}
        setSearchSupplier={setSearchSupplier}
        filteredItems={filteredItems}
        isOrder={true}
        selectedItems={selectedItems}
        handleSelectItem={handleSelectItem}
      />
      <div className="mb-4 p-4 border border-gray-300 border-dashed rounded  mt-4">
        <label className="block text-lg font-bold mb-2">Added Items</label>
        <div className="space-y-2">
          {selectedItems &&
            selectedItems.map((sitem, sindex) => (
              <div
                key={sindex}
                className="flex justify-between p-2 border-b last:border-b-0"
              >
                <span className="font-bold text-md">{sitem.itemName}</span>
                <div className="flex space-x-1">
                  <span>:</span>
                  <span className="font-semibold text-md">
                    {sitem.orderQty}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-bold">Total Amount:</label>
        <input
          type="text"
          value={totalAmount}
          readOnly
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => selectedItems.length > 0 && setHandlemPrintModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Order
        </button>

        <button
          onClick={handleSaveOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Order
        </button>
      </div>

      {handlemPrintModal && (
        <PrintOrderDoc
          supplier={selectedSupplier}
          orderNo={orderNo}
          orderDate={orderDate}
          items={selectedItems}
          totalAmount={totalAmount}
          setHandlemPrintModal={setHandlemPrintModal}
          exportToExcel={exportToExcel}
          active={active}
          setSelectedItems={setSelectedItems}
          setTotalAmount={setTotalAmount}
          setSelectedSupplier={setSelectedSupplier}
        />
      )}
    </div>
  );
};

export default PurchaseOrder;
