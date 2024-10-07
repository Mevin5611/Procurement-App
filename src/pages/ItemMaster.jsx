import React, { useEffect, useState } from "react";
import Additem from "../components/Additem";
import Edititem from "../components/Edititem";
import Supplier from "../components/Supplier";
import ItemTableList from "../components/ItemTableList";
import { suppliers } from "../constant/data";

const ItemMaster = () => {
  
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [newSupplier, setNewSupplier] = useState("");
  const [supplier, setSupplier] = useState([]);

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

  useEffect(() => {
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
  }, [isEditModalOpen]);

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

  const handleSetItem = (item) => {
    setFormData({
      itemNo: item.itemNo,
      itemName: item.itemName,
      inventoryLocation: item.inventoryLocation,
      brand: item.brand,
      category: item.category,
      supplier: item.supplier,
      stockUnit: item.stockUnit,
      unitPrice: item.unitPrice,
      status: item.status,
      images: item.images,
    });

    setIsEditModalOpen(true);
  };

  const handleEditItem = (formdata) => {
    let storedItems = JSON.parse(localStorage.getItem("sampleItems") || "[]");

    const itemIndex = storedItems.findIndex(
      (item) => item.itemNo === formdata.itemNo
    );

    if (itemIndex !== -1) {
      storedItems[itemIndex] = { ...storedItems[itemIndex], ...formdata };

      localStorage.setItem("sampleItems", JSON.stringify(storedItems));

      console.log("Item updated successfully.");
      setIsEditModalOpen(false);
    } else {
      console.log("Item not found.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 ms-10">Item Master</h1>
      <button
        className={
          " ms-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        }
        onClick={() => setActive(active === 0 ? 1 : 0)}
      >
        {active ? "Cancel" : "Add Item"}
      </button>

      <Additem
        active={active}
        handleAddItem={handleAddItem}
        handleChange={handleChange}
        formData={formData}
        selectedSupplier={selectedSupplier}
        setIsSupplierModalOpen={setIsSupplierModalOpen}
        handleImageUpload={handleImageUpload}
      />

      {isEditModalOpen && (
        <Edititem
          setIsEditModalOpen={setIsEditModalOpen}
          formData={formData}
          handleChange={handleChange}
          selectedSupplier={selectedSupplier}
          setIsSupplierModalOpen={setIsSupplierModalOpen}
          handleImageUpload={handleImageUpload}
          handleEditItem={handleEditItem}
        />
      )}

      {isSupplierModalOpen && (
        <Supplier
          supplier={supplier}
          handleSelectSupplier={handleSelectSupplier}
          handleDeletesupplier={handleDeletesupplier}
          newSupplier={newSupplier}
          setNewSupplier={setNewSupplier}
          handleAddSupplier={handleAddSupplier}
          setIsSupplierModalOpen={setIsSupplierModalOpen}
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
        handleSetItem={handleSetItem}
        handleDeleteItem={handleDeleteItem}
        
      />
    </div>
  );
};

export default ItemMaster;
