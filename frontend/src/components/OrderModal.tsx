import { useState } from 'react';
import { Product } from '../types';
import { createOrder } from '../api/orders';

interface Props {
  product: Product;
  onClose: () => void;
}

export const OrderModal: React.FC<Props> = ({ product, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'WHATSAPP' | 'TELEGRAM' | 'CALL'>('WHATSAPP');
  const [isSubmitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await createOrder({
        customerName: name,
        phone,
        contactMethod,
        deliveryType: 'PICKUP',
        items: [{ productId: product.id, quantity: 1 }]
      });
      setSuccess(`Заявка №${response.orderId} принята. Менеджер свяжется с вами.`);
    } catch (err) {
      setError('Не удалось отправить заказ. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button className="absolute right-3 top-3 text-slate-500" onClick={onClose}>
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-2">Купить в один клик</h3>
        <p className="text-sm text-slate-600 mb-4">{product.name}</p>

        {success ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">{success}</div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-slate-600">Имя</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Телефон</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Как связаться</label>
              <div className="flex gap-2">
                {['WHATSAPP', 'TELEGRAM', 'CALL'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setContactMethod(method as any)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      contactMethod === method ? 'bg-accent text-white' : 'bg-white'
                    }`}
                  >
                    {method === 'CALL' ? 'Перезвонить' : method}
                  </button>
                ))}
              </div>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button type="submit" className="button-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем...' : 'Оставить заявку'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
