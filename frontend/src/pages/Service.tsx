const ServicePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Сервисный центр i-Remont</h1>
      <p className="text-slate-600 text-lg">
        Чиним технику так, как будто делаем это для себя. Оригинальные комплектующие, прозрачная диагностика и
        опытные инженеры с сертификатами Apple.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Диагностика за 20 минут</h3>
          <p className="text-sm text-slate-600">Быстро определяем проблему и согласуем стоимость до начала работ.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Оригинальные детали</h3>
          <p className="text-sm text-slate-600">Используем проверенных поставщиков, предоставляем отчет по запчастям.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Гарантия до 1 года</h3>
          <p className="text-sm text-slate-600">На каждый ремонт оформляем гарантийный талон i-Remont.</p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
