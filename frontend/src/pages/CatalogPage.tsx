import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchCategories, fetchProducts } from '../api/products';
import { Category, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);

  const load = async () => {
    const data = await fetchProducts({ brand, category, minPrice, maxPrice, sort });
    setProducts(data.items);
  };

  useEffect(() => {
    fetchCategories().then(setCategories);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, category, minPrice, maxPrice, sort]);

  return (
    <div className="page">
      <Helmet>
        <title>Каталог — i-Remont</title>
        <meta name="description" content="Каталог смартфонов, планшетов и аксессуаров i-Remont" />
      </Helmet>
      <div className="page__header">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1>Техника и аксессуары</h1>
        </div>
      </div>

      <div className="filters">
        <div>
          <label>Бренд</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Все</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Все</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filters__range">
          <label>Цена</label>
          <div className="filters__range-inputs">
            <input placeholder="от" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input placeholder="до" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>
        <div>
          <label>Сортировка</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">По новизне</option>
            <option value="price_asc">Цена ↑</option>
            <option value="price_desc">Цена ↓</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
