import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/new" element={<AdminProductFormPage />} />
        <Route path="/admin/products/:id" element={<AdminProductFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
