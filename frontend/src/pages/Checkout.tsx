import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../api/orders';
import { useCart } from '../context/CartContext';
import { OrderPayload } from '../types';

type ContactMethod = 'WHATSAPP' | 'TELEGRAM' | 'CALL';
type DeliveryType = 'MOSCOW' | 'RUSSIA' | 'PICKUP';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    contactMethod: 'WHATSAPP' as ContactMethod,
    deliveryType: 'MOSCOW' as DeliveryType,
    city: 'Москва',
    addressLine: '',
    apartment: '',
    comment: '',
    agree: false
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-4">
        <h1 className="text-2xl font-bold">Оформление заказа</h1>
        <div className="card p-6">В корзине нет товаров. Вернитесь в каталог.</div>
        <Link to="/catalog" className="button-primary inline-block">К покупкам</Link>
      </div>
    );
  }

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      setError('Подтвердите согласие с политикой конфиденциальности');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const payload: OrderPayload = {
        customerName: form.customerName,
        phone: form.phone,
        email: form.email || undefined,
        contactMethod: form.contactMethod,
        deliveryType: form.deliveryType,
        city: form.deliveryType === 'PICKUP' ? undefined : form.city,
        addressLine: form.deliveryType === 'PICKUP' ? undefined : form.addressLine,
        apartment: form.deliveryType === 'PICKUP' ? undefined : form.apartment,
        comment: form.comment || undefined,
        items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))
      };

      const response = await createOrder(payload);
      clearCart();
      navigate('/thank-you', { state: { orderId: response.orderId, total: response.totalAmount } });
    } catch (err) {
      setError('Не удалось оформить заказ. Попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[2fr_1fr] gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="card p-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600">ФИО *</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Телефон *</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Как связаться</label>
              <div className="flex gap-2">
                {[
                  { value: 'WHATSAPP', label: 'WhatsApp' },
                  { value: 'TELEGRAM', label: 'Telegram' },
                  { value: 'CALL', label: 'Перезвонить' }
                ].map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleChange('contactMethod', option.value)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      form.contactMethod === option.value ? 'bg-accent text-white' : 'bg-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-4 space-y-3">
            <div className="font-semibold">Способ получения</div>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'MOSCOW', label: 'Доставка по Москве' },
                { value: 'RUSSIA', label: 'Доставка по России' },
                { value: 'PICKUP', label: 'Самовывоз из сервиса i-Remont' }
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => handleChange('deliveryType', option.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    form.deliveryType === option.value ? 'bg-accent text-white' : 'bg-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {form.deliveryType !== 'PICKUP' && (
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-600">Город</label>
                  <input
                    className="w-full border rounded-md px-3 py-2"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600">Улица, дом</label>
                  <input
                    className="w-full border rounded-md px-3 py-2"
                    value={form.addressLine}
                    onChange={(e) => handleChange('addressLine', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600">Квартира / офис</label>
                  <input
                    className="w-full border rounded-md px-3 py-2"
                    value={form.apartment}
                    onChange={(e) => handleChange('apartment', e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-600">Комментарий</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows={3}
                value={form.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => handleChange('agree', e.target.checked)}
              />
              Подтверждаю согласие с политикой конфиденциальности
            </label>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button className="button-primary w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем...' : 'Подтвердить заказ'}
            </button>
          </div>
        </form>
      </div>

      <div className="card p-5 space-y-4 h-fit">
        <h2 className="text-lg font-semibold">Ваш заказ</h2>
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.product.id} className="flex justify-between">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{(item.product.priceCurrent * item.quantity).toLocaleString('ru-RU')} ₽</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold text-brand">
          <span>Итого</span>
          <span>{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <p className="text-xs text-slate-500">Цена финальная: мы предварительно проверяем наличие и актуальную стоимость.</p>
      </div>
    </div>
  );
};

export default CheckoutPage;
