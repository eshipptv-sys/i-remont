import { Link } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/product/${product.slug}`} className="card__image">
        <img src={product.mainImageUrl} alt={product.name} />
      </Link>
      <div className="card__content">
        <div className="card__meta">
          <span className="tag">{product.brand}</span>
          <span className={`tag ${product.inStock ? 'tag--success' : 'tag--muted'}`}>
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
        <Link to={`/product/${product.slug}`} className="card__title">
          {product.name}
        </Link>
        <p className="card__price">
          {product.oldPrice && <span className="old">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>}
          <span>{product.price.toLocaleString('ru-RU')} ₽</span>
        </p>
      </div>
    </div>
  );
};
