import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

const advantages = [
  {
    title: 'Честная диагностика и гарантия',
    text: 'Каждое устройство проходит проверку инженерами i-Remont и получает гарантийный талон.'
  },
  {
    title: 'Доставка и самовывоз',
    text: 'Привезем по Москве за 2 часа или отправим по России удобной службой доставки.'
  },
  {
    title: 'Рассрочка и трейд-ин',
    text: 'Поможем обновить гаджет без переплат и учтем стоимость вашего старого устройства.'
  }
];

const HomePage: React.FC = () => {
  const [popular, setPopular] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({ limit: 4, sort: 'popular' })
      .then((data) => setPopular(data.items))
      .catch(() => setPopular([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-accent text-sm font-semibold">
            <span>⚡</span>
            <span>Продажа + ремонт премиум‑уровня</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand">i-Remont — техника, которой вы доверяете</h1>
          <p className="text-slate-600 text-lg">
            Помогаем выбрать идеальный iPhone, iPad, Mac или аксессуар, настроим под ключ и поддержим сервисом.
          </p>
          <div className="flex gap-3">
            <Link to="/catalog" className="button-primary">Каталог</Link>
            <Link to="/service" className="px-4 py-2 rounded-md border border-accent text-accent font-semibold">
              Сервисный центр
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-br from-accent/10 to-blue-100 rounded-3xl p-6 shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
            alt="iPhone showcase"
            className="rounded-2xl"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Популярные модели</h2>
          <Link to="/catalog" className="text-accent font-semibold">
            В каталог →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {advantages.map((item) => (
          <div key={item.title} className="card p-5 space-y-2">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
