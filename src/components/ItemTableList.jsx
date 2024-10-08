import React, { useState } from "react";

const ItemTableList = ({
  searchItemNo,
  setSearchItemNo,
  searchItemName,
  setSearchItemName,
  searchCategory,
  setSearchCategory,
  searchSupplier,
  setSearchSupplier,
  filteredItems,
  handleSetItem,
  handleDeleteItem,
  isOrder,
  handleSelectItem,
}) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (item, change) => {
    setQuantities((prevQuantities) => {
      const currentQty = prevQuantities[item.itemNo] || 0;
      const newQty = Math.max(0, currentQty + change);

      handleSelectItem(item, newQty);

      return {
        ...prevQuantities,
        [item.itemNo]: newQty,
      };
    });
  };

  return (
    <div className="p-4">
  <h2 className="text-xl font-bold mb-4 text-center">Items List</h2>
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <input
      type="text"
      placeholder="Search Item No"
      value={searchItemNo}
      onChange={(e) => setSearchItemNo(e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="text"
      placeholder="Search Item Name"
      value={searchItemName}
      onChange={(e) => setSearchItemName(e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="text"
      placeholder="Search Category"
      value={searchCategory}
      onChange={(e) => setSearchCategory(e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="text"
      placeholder="Search Supplier"
      value={searchSupplier}
      onChange={(e) => setSearchSupplier(e.target.value)}
      className="border p-2 w-full"
    />
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Item No</th>
          <th className="border border-gray-300 p-2">Item Name</th>
          <th className="border border-gray-300 p-2">Inventory Location</th>
          <th className="border border-gray-300 p-2">Brand</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">Stock Unit</th>
          <th className="border border-gray-300 p-2">Supplier</th>
          <th className="border border-gray-300 p-2">Unit Price</th>
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Status</th>
          <th className="border border-gray-300 p-2">
            {isOrder ? "Quantity" : "Edit"}
          </th>
          {!isOrder && <th className="border border-gray-300 p-2">Delete</th>}
        </tr>
      </thead>
      <tbody>
        {isOrder ? (
          <tr>
            <td colSpan={11} className="border border-gray-300">
              <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
                <table className="min-w-full">
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          {item.itemNo}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.itemName}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.inventoryLocation}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.brand}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.category}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.stockUnit}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.supplier}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.unitPrice}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.images.length > 0 &&
                            item.images.map((image, idx) => (
                              <img
                                key={idx}
                                src={image}
                                alt={`Item ${index} Image ${idx}`}
                                className="w-16 h-16 object-cover"
                              />
                            ))}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {item.status}
                        </td>
                        <td className="border  border-gray-300 flex justify-center items-center p-2">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            disabled={quantities[item.itemNo] <= 0}
                          >
                            -
                          </button>
                          <span className="p-1 border rounded w-10 text-center">
                            {quantities[item.itemNo] || 0}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="bg-blue-500 text-white px-2 py-1 rounded ms-2"
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        ) : (
          filteredItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.itemNo}</td>
              <td className="border border-gray-300 p-2">{item.itemName}</td>
              <td className="border border-gray-300 p-2">
                {item.inventoryLocation}
              </td>
              <td className="border border-gray-300 p-2">{item.brand}</td>
              <td className="border border-gray-300 p-2">{item.category}</td>
              <td className="border border-gray-300 p-2">{item.stockUnit}</td>
              <td className="border border-gray-300 p-2">{item.supplier}</td>
              <td className="border border-gray-300 p-2">{item.unitPrice}</td>
              <td className="border border-gray-300 p-2">
                {item.images.length > 0 &&
                  item.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Item ${index} Image ${idx}`}
                      className="w-16 h-16 object-cover"
                    />
                  ))}
              </td>
              <td className="border border-gray-300 p-2">{item.status}</td>
              <td className="border border-gray-300 p-2">
                <span onClick={() => handleSetItem(item)}>Edit</span>
              </td>
              <td
                onClick={() => handleDeleteItem(index)}
                className="border border-gray-300 p-2 cursor-pointer text-red-600"
              >
                Delete
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ItemTableList;
