import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { deleteProduct, fetchProducts, updateAvailability } from '../api/products';
import { Product } from '../types';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts({ take: 50, search }).then((res) => setProducts(res.items));
  }, [search]);

  const ensureAuth = () => {
    if (!token) navigate('/admin');
    return token;
  };

  const toggleAvailability = async (id: number, value: boolean) => {
    const auth = ensureAuth();
    if (!auth) return;
    await updateAvailability(auth, id, value);
    fetchProducts({ take: 50, search }).then((res) => setProducts(res.items));
  };

  const handleDelete = async (id: number) => {
    const auth = ensureAuth();
    if (!auth) return;
    await deleteProduct(auth, id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="page">
      <Helmet>
        <title>Товары — админка i-Remont</title>
      </Helmet>
      <div className="page__header">
        <div>
          <p className="eyebrow">Управление</p>
          <h1>Товары</h1>
        </div>
        <Link to="/admin/products/new" className="button">
          + Новый товар
        </Link>
      </div>
      <div className="filters">
        <div className="filters__search">
          <input placeholder="Поиск по названию" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="admin-table">
        <div className="admin-table__header">
          <span>Название</span>
          <span>Цена</span>
          <span>Наличие</span>
          <span>Действия</span>
        </div>
        {products.map((product) => (
          <div key={product.id} className="admin-table__row">
            <div>
              <strong>{product.name}</strong>
              <p className="muted">{product.brand}</p>
            </div>
            <div>{product.price.toLocaleString('ru-RU')} ₽</div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={product.inStock}
                  onChange={(e) => toggleAvailability(product.id, e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>
            <div className="admin-table__actions">
              <Link to={`/admin/products/${product.slug}`} className="link">
                Редактировать
              </Link>
              <button className="link link--danger" onClick={() => handleDelete(product.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
