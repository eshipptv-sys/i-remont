import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { MainLayout } from './layouts/MainLayout';
import HomePage from './pages/Home';
import CatalogPage from './pages/Catalog';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import ServicePage from './pages/Service';
import DeliveryPage from './pages/Delivery';
import WarrantyPage from './pages/Warranty';
import ContactsPage from './pages/Contacts';
import ThankYouPage from './pages/ThankYou';
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="warranty" element={<WarrantyPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
