import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../api/products';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { OrderModal } from '../components/OrderModal';

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [tab, setTab] = useState<'description' | 'specs'>('description');
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    fetchProductBySlug(slug)
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related);
        setActiveImage(`${data.product.mainImageUrl}?auto=format&fit=crop&w=900&q=80`);
      })
      .catch(() => setProduct(null));
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="card p-8 text-center text-slate-600">Товар не найден или временно недоступен.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="card overflow-hidden">
            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3 overflow-auto">
            {[product.mainImageUrl, ...(product.gallery || [])].slice(0, 5).map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(`${img}?auto=format&fit=crop&w=900&q=80`)}
                className={`h-20 w-20 rounded-lg overflow-hidden border ${activeImage.includes(img) ? 'border-accent' : 'border-slate-200'}`}
              >
                <img src={`${img}?auto=format&fit=crop&w=200&q=80`} alt="preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">{product.category}</p>
            <h1 className="text-3xl font-bold text-brand">{product.name}</h1>
            <p className="text-slate-600">{product.shortDescription}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{product.priceCurrent.toLocaleString('ru-RU')} ₽</span>
            {product.priceOld && <span className="text-lg text-slate-400 line-through">{product.priceOld.toLocaleString('ru-RU')} ₽</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="card p-3">
              <div className="text-xs text-slate-500">Память</div>
              <div className="font-semibold">{product.memory}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-slate-500">Цвет</div>
              <div className="font-semibold">{product.color}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-slate-500">Состояние</div>
              <div className="font-semibold">{product.condition === 'NEW' ? 'Новый' : product.condition === 'LIKE_NEW' ? 'Как новый' : 'Б/У'}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-slate-500">Гарантия</div>
              <div className="font-semibold">6–12 месяцев i-Remont</div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="button-primary" onClick={() => addItem(product, 1)}>
              Добавить в корзину
            </button>
            <button
              className="px-4 py-2 rounded-md border border-accent text-accent font-semibold"
              onClick={() => setShowModal(true)}
            >
              Купить в один клик
            </button>
          </div>

          <div className="card p-4 space-y-3">
            <div className="flex gap-3 border-b pb-2">
              <button
                className={`font-semibold ${tab === 'description' ? 'text-accent' : 'text-slate-600'}`}
                onClick={() => setTab('description')}
              >
                Описание
              </button>
              <button
                className={`font-semibold ${tab === 'specs' ? 'text-accent' : 'text-slate-600'}`}
                onClick={() => setTab('specs')}
              >
                Характеристики
              </button>
            </div>
            {tab === 'description' ? (
              <p className="text-slate-600 leading-relaxed">{product.fullDescription}</p>
            ) : (
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong>Память:</strong> {product.memory}</li>
                <li><strong>Цвет:</strong> {product.color}</li>
                <li><strong>Состояние:</strong> {product.condition}</li>
                <li><strong>Комплектация:</strong> Кабель USB‑C, чек i-Remont</li>
                <li><strong>Гарантия:</strong> 6 месяцев сервис</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Похожие товары</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
          {related.length === 0 && <div className="text-slate-500">Пока нет рекомендаций.</div>}
        </div>
      </section>

      {showModal && <OrderModal product={product} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductPage;
