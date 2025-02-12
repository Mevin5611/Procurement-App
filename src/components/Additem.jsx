import React from "react";

const Additem = ({
  active,
  formData,
  handleChange,
  handleAddItemWithValidation,
  selectedSupplier,
  setIsSupplierModalOpen,
  handleImageUpload,
  errors
}) => {
  return (
    <div>
      <form className={active === 1 ? "space-y-4 " : "hidden"}>
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
            {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName}</p>}
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
            {errors.inventoryLocation && <p className="text-red-500 text-sm">{errors.inventoryLocation}</p>}
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
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
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
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
                onClick={() => setIsSupplierModalOpen(true)}
              />
              {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
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
            {errors.stockUnit && <p className="text-red-500 text-sm">{errors.stockUnit}</p>}
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
            {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice}</p>}
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

          <div className=" flex items-end">
            <button
              type="button"
              onClick={handleAddItemWithValidation}
              className="bg-blue-500 text-white w-full p-2 border rounded-md focus:outline-none"
            >
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Additem;
