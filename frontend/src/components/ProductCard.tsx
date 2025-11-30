import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="card p-4 flex flex-col">
      <Link to={`/product/${product.slug}`} className="mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
        <img src={`${product.mainImageUrl}?auto=format&fit=crop&w=600&q=80`} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 flex flex-col gap-2">
        <Link to={`/product/${product.slug}`} className="font-semibold text-brand hover:text-accent leading-tight">
          {product.name}
        </Link>
        <div className="text-sm text-slate-500">{product.memory} · {product.color}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{product.priceCurrent.toLocaleString('ru-RU')} ₽</span>
          {product.priceOld && (
            <span className="text-sm text-slate-400 line-through">{product.priceOld.toLocaleString('ru-RU')} ₽</span>
          )}
        </div>
      </div>
      <button
        onClick={() => addItem(product, 1)}
        className="mt-3 button-primary text-center"
        disabled={!product.isAvailable}
      >
        {product.isAvailable ? 'В корзину' : 'Нет в наличии'}
      </button>
    </div>
  );
};
