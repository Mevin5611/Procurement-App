import React, { useEffect, useState } from "react";

const ItemMaster = () => {
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    itemName: "",
    inventoryLocation: "",
    brand: "",
    category: "",
    supplier: "",
    stockUnit: "",
    unitPrice: "",
    status: "Enabled",
    images: [],
  });

  const [active, setActive] = useState(false);
  const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Supplier D"];
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [newSupplier, setNewSupplier] = useState("");
  const [supplier, setSupplier] = useState([]);

  const [editSupplierIndex, setEditSupplierIndex] = useState(null);
  const [editItemIndex, setEditItemIndex] = useState(null);

  useEffect(() => {
    console.log("hii");
    const storedItems = localStorage.getItem("sampleItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    const storedSuppliers = localStorage.getItem("supplier");
    if (storedSuppliers) {
      setSupplier(JSON.parse(storedSuppliers));
    } else {
      localStorage.setItem("supplier", JSON.stringify(suppliers));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    Promise.all(files.map((file) => convertToBase64(file)))
      .then((base64Images) => {
        setFormData({
          ...formData,
          images: base64Images,
        });
      })
      .catch((error) => console.error("Image conversion error:", error));
  };

  const handleAddItem = () => {
    const newItem = {
      ...formData,
      itemNo: "ITM00" + items.length + 1,
    };
    setItems([...items, newItem]);
    localStorage.setItem("sampleItems", JSON.stringify([...items, newItem]));

    setFormData({
      itemName: "",
      inventoryLocation: "",
      brand: "",
      category: "",
      supplier: "",
      stockUnit: "",
      unitPrice: "",
      status: "Enabled",
      images: [],
    });
  };

  const handleAddSupplier = () => {
    if (newSupplier && !suppliers.includes(newSupplier)) {
      const updatedSuppliers = [...supplier, newSupplier];
      setSupplier(updatedSuppliers);
      localStorage.setItem("supplier", JSON.stringify(updatedSuppliers));
      setNewSupplier("");
    }
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      ...formData,
      supplier: supplier,
    });
    setIsSupplierModalOpen(false);
  };

  const handleDeleteItem = (index) => {
    items.splice(index, 1);
    setItems([...items]);
    localStorage.setItem("sampleItems", JSON.stringify([...items]));
  };
  const handleDeletesupplier = (index) => {
    supplier.splice(index, 1);
    setSupplier([...supplier]);
    localStorage.setItem("supplier", JSON.stringify([...supplier]));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 ms-10">Item Master</h1>
      <button
        className={
          " ms-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        }
        onClick={() => setActive(!active)}
      >
        {active ? "Cancel" : "Add Item"}
      </button>

      <form className={active ? "space-y-4 " : "hidden"}>
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
              onClick={handleAddItem}
              className="bg-blue-500 text-white w-full p-2 border rounded-md focus:outline-none    "
            >
              Add Item
            </button>
          </div>
        </div>
      </form>

      {isSupplierModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Select Supplier</h2>
            <ul className="space-y-2">
              {supplier.map((sup, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-blue-100 p-2 rounded-md"
                  onClick={() => handleSelectSupplier(sup)}
                >
                  {sup}

                  <span
                    className="float-right text-red-500"
                    onClick={() => handleDeletesupplier(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Add New Supplier
              </label>
              <input
                type="text"
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter new supplier name"
              />
              <button
                type="button"
                onClick={handleAddSupplier}
                className="bg-green-500 text-white w-full mt-2 p-2 border rounded-md focus:outline-none"
              >
                Add Supplier
              </button>
            </div>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsSupplierModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 m-10">
        <h2 className="text-xl font-bold mb-4">Items List</h2>
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
              <th className="border border-gray-300 p-2">edit</th>
              <th className="border border-gray-300 p-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
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
                <td
                  /* onClick={() => handleEditItem(item)} */ className="border border-gray-300 p-2"
                >
                  Edit
                </td>
                <td
                  onClick={() => handleDeleteItem(index)}
                  className="border border-gray-300 p-2"
                >
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemMaster;
