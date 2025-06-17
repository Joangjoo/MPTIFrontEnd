import AboutView from "./about/AboutView";
import HomeView from "./home/HomeView";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductView from "./produk/pages/ProductView";
import ProductDetailPage from "./produk/pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/products" element={<ProductView />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
