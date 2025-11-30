const DeliveryPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <h1 className="text-3xl font-bold">Доставка и оплата</h1>
    <p className="text-slate-600 text-lg">
      Выберите удобный способ получения: курьер по Москве, отправка по России или самовывоз из сервисного центра.
      Все оплаты проходят через защищенные каналы, возможна рассрочка.
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Москва и область</h3>
        <ul className="text-sm text-slate-600 space-y-2">
          <li>• Курьер в день заказа или в удобный слот.</li>
          <li>• Оплата картой, наличными или переводом.</li>
          <li>• Бесплатно от 70 000 ₽.</li>
        </ul>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Россия</h3>
        <ul className="text-sm text-slate-600 space-y-2">
          <li>• Отправляем СДЭК/Boxberry, страховка посылки.</li>
          <li>• Предоплата 10% для брони устройства.</li>
          <li>• Отслеживание в личном кабинете службы доставки.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default DeliveryPage;
