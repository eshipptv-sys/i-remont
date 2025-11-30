import { Helmet } from 'react-helmet-async';
import { useCart } from '../state/CartContext';

const CartPage = () => {
  const { items, total, update, remove } = useCart();

  return (
    <div className="page">
      <Helmet>
        <title>Корзина — i-Remont</title>
      </Helmet>
      <h1>Корзина</h1>
      {items.length === 0 && <p>Корзина пуста.</p>}
      <div className="table">
        {items.map((item) => (
          <div key={item.product.slug} className="cart-row">
            <div className="cart-row__info">
              <img src={item.product.mainImageUrl} alt={item.product.name} />
              <div>
                <p className="card__title">{item.product.name}</p>
                <p className="muted">{item.product.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
            <div className="cart-row__actions">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => update(item.product.slug, Number(e.target.value))}
              />
              <button className="link" onClick={() => remove(item.product.slug)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="checkout">
          <p>Итого: {total.toLocaleString('ru-RU')} ₽</p>
          <button className="button" disabled>
            Оформить заказ (демо)
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
