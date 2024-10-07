export const sampleItems = [
    {
      itemNo: 'ITM001',
      itemName: 'Laptop',
      inventoryLocation: 'Warehouse 1',
      brand: 'Dell',
      category: 'Electronics',
      supplier: 'Supplier A',
      stockUnit: 'Piece',
      unitPrice: 50000,
      itemImages: ['image1.png', 'image2.png'],
      status: 'Enabled',
    },
    {
      itemNo: 'ITM002',
      itemName: 'Wireless Mouse',
      inventoryLocation: 'Warehouse 2',
      brand: 'Logitech',
      category: 'Accessories',
      supplier: 'Supplier B',
      stockUnit: 'Piece',
      unitPrice: 1500,
      itemImages: ['image3.png', 'image4.png'],
      status: 'Enabled',
    },
    {
      itemNo: 'ITM003',
      itemName: 'Monitor',
      inventoryLocation: 'Warehouse 1',
      brand: 'Samsung',
      category: 'Electronics',
      supplier: 'Supplier A',
      stockUnit: 'Piece',
      unitPrice: 12000,
      itemImages: ['image5.png'],
      status: 'Disabled',
    }
  ];
  
  export const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Supplier D"];
  

  export const samplePurchaseOrder = {
    orderNo: 'PO001',
    orderDate: new Date().toLocaleDateString(),
    supplierName: 'Supplier A',
    items: [
      {
        itemNo: 'ITM001',
        itemName: 'Laptop',
        stockUnit: 'Piece',
        unitPrice: 50000,
        packingUnit: 'Box',
        orderQty: 2,
        netAmount: 100000, // Calculated as orderQty * unitPrice
      },
      {
        itemNo: 'ITM002',
        itemName: 'Wireless Mouse',
        stockUnit: 'Piece',
        unitPrice: 1500,
        packingUnit: 'Box',
        orderQty: 5,
        netAmount: 7500,
      },
    ],
  };
  
  export const stockUnits = ['Piece', 'Box', 'Carton', 'Pack'];
