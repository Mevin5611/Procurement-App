
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemMaster from './pages/ItemMaster';
import PurchaseOrder from './pages/PurchaseOrder';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemMaster />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

