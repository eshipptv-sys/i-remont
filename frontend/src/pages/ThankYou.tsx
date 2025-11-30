import { useLocation, Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as { orderId?: number; total?: number };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="text-4xl">✅</div>
      <h1 className="text-3xl font-bold">Спасибо! Заявка принята</h1>
      <p className="text-slate-600">
        Менеджер свяжется с вами в ближайшее время для подтверждения заказа.
        {state.orderId && ` Номер заявки: ${state.orderId}.`}
      </p>
      {state.total && <div className="text-lg font-semibold">Сумма: {state.total.toLocaleString('ru-RU')} ₽</div>}
      <div className="flex justify-center gap-3">
        <Link to="/catalog" className="button-primary">
          Вернуться в каталог
        </Link>
        <Link to="/" className="px-4 py-2 border border-accent text-accent rounded-md font-semibold">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
