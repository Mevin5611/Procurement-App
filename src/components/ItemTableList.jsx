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
  selectedItems,
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
    <div className="">
      <h2 className="text-xl font-bold mb-4">Items List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Item No"
          value={searchItemNo}
          onChange={(e) => setSearchItemNo(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Search Item Name"
          value={searchItemName}
          onChange={(e) => setSearchItemName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Search Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Search Supplier"
          value={searchSupplier}
          onChange={(e) => setSearchSupplier(e.target.value)}
          className="border p-2"
        />
      </div>
      <table className="w-full border-collapse border border-gray-400">
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
            <th className="border border-gray-300 p-2">image</th>
            <th className="border border-gray-300 p-2">status</th>
            <th className="border border-gray-300 p-2">
              {isOrder ? "quantity" : "edit"}
            </th>
            {!isOrder && <th className="border border-gray-300 p-2">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {isOrder ? (
            <tr>
              <td colSpan={11} className="border border-gray-300">
                <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
                  <table className="w-full">
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
                          <td className="border border-gray-300 h-20 flex justify-center items-center">
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
                  className="border border-gray-300 p-2"
                >
                  delete
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTableList;
