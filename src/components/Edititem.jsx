import React from "react";

const Edititem = ({
  setIsEditModalOpen,
  handleEditItem,
  handleImageUpload,
  selectedSupplier,
  formData,
  handleChange,
  setIsSupplierModalOpen,
  handleEditclose
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md  m-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">Edit Item</h2>
          <span
            className="font-bold text-lg text-red-700 cursor-pointer rounded-md"
            onClick={handleEditclose}
          >
            x
          </span>
        </div>
        <form className={"space-y-4 "}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Inventory Location
              </label>
              <input
                type="text"
                name="inventoryLocation"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter location"
                value={formData.inventoryLocation}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Supplier
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="supplier"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Select supplier"
                  value={selectedSupplier || formData.supplier}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-blue-500"
                  onClick={() => setIsSupplierModalOpen(true)}
                >
                  search
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Stock Unit
              </label>
              <select
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                name="stockUnit"
                value={formData.stockUnit}
                onChange={handleChange}
              >
                <option></option>
                <option>Piece</option>
                <option>Box</option>
                <option>Carton</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Unit Price
              </label>
              <input
                type="number"
                name="unitPrice"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter unit price"
                value={formData.unitPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Item Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Status
              </label>
              <select
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={formData.status}
                onChange={handleChange}
                name="status"
              >
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className=" flex items-end">
              <button
                type="button"
                onClick={() => handleEditItem(formData)}
                className="bg-blue-500 text-white w-full p-2 border rounded-md focus:outline-none    "
              >
                Edit Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edititem;
