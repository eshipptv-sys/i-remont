import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FREE_DELIVERY_THRESHOLD = 70000;

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, total } = useCart();
  const missingForFreeDelivery = Math.max(FREE_DELIVERY_THRESHOLD - total, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Корзина</h1>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-600">Корзина пуста. Загляните в каталог!</p>
          <Link to="/catalog" className="button-primary inline-block mt-4">
            В каталог
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="card p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-2">Товар</th>
                  <th className="pb-2">Цена</th>
                  <th className="pb-2">Количество</th>
                  <th className="pb-2">Сумма</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <tr key={item.product.id} className="align-middle">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`${item.product.mainImageUrl}?auto=format&fit=crop&w=100&q=80`}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <Link to={`/product/${item.product.slug}`} className="font-semibold text-brand">
                            {item.product.name}
                          </Link>
                          <div className="text-slate-500 text-xs">
                            {item.product.memory} · {item.product.color}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{item.product.priceCurrent.toLocaleString('ru-RU')} ₽</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          –
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 font-semibold">
                      {(item.product.priceCurrent * item.quantity).toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-red-500 text-sm" onClick={() => removeItem(item.product.id)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5 space-y-4 h-fit">
            <h2 className="text-lg font-semibold">Итого</h2>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Сумма за товары</span>
              <span>{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            {missingForFreeDelivery > 0 ? (
              <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                До бесплатной доставки осталось {missingForFreeDelivery.toLocaleString('ru-RU')} ₽
              </div>
            ) : (
              <div className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">Бесплатная доставка включена</div>
            )}
            <Link to="/checkout" className="button-primary w-full text-center block">
              Оформить заказ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
