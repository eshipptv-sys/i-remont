import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProducts } from '../api/products';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

const HomePage = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newest, setNewest] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({ featured: true, take: 4 }).then((res) => setFeatured(res.items));
    fetchProducts({ sort: 'newest', take: 4 }).then((res) => setNewest(res.items));
  }, []);

  return (
    <div className="page">
      <Helmet>
        <title>i-Remont — техника в стиле Apple</title>
        <meta name="description" content="Интернет-магазин i-Remont: iPhone, iPad, AirPods и аксессуары" />
      </Helmet>
      <section className="hero">
        <div>
          <p className="eyebrow">i-Remont / Mobile</p>
          <h1>Техника и сервис в стиле Apple</h1>
          <p className="subtitle">Магазин по образцу appletrade.ru с быстрыми фильтрами и минималистичным UI.</p>
          <div className="cta">
            <a className="button" href="/catalog">
              Смотреть каталог
            </a>
            <a className="button button--ghost" href="/admin">
              Админ-панель
            </a>
          </div>
        </div>
        <div className="hero__image" aria-hidden>
          <div className="hero__circle" />
          <img
            src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80"
            alt="iPhone showcase"
          />
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Популярное</p>
            <h2>Популярные модели</h2>
          </div>
          <a href="/catalog" className="link">
            В каталог →
          </a>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Новинки</p>
            <h2>Последние поступления</h2>
          </div>
        </div>
        <div className="grid">
          {newest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="seo">
        <h3>i-Remont — техника, как вы привыкли</h3>
        <p>
          Каталог, удобный как appletrade.ru: быстрые фильтры, аккуратные карточки, понятные цены и SEO-оптимизированные
          страницы под каждую модель. Управляйте ассортиментом через админ-панель с авторизацией, загружайте фото и
          обновляйте характеристики.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
