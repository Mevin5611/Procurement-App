import React from 'react'

const Supplier = ({supplier,handleSelectSupplier,handleDeletesupplier,newSupplier,setNewSupplier,handleAddSupplier,setIsSupplierModalOpen}) => {
  return (
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
  )
}

export default Supplier
