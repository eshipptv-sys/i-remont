const WarrantyPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <h1 className="text-3xl font-bold">Гарантия i-Remont</h1>
    <p className="text-slate-600 text-lg">
      Мы уверены в технике, которую продаем и обслуживаем. На все устройства распространяется гарантия i-Remont,
      подтвержденная сервисным талоном.
    </p>
    <div className="card p-5 space-y-3">
      <h3 className="font-semibold text-lg">Условия</h3>
      <ul className="list-disc pl-5 text-slate-600 space-y-1 text-sm">
        <li>Проверка устройства при выдаче и акт приема-передачи.</li>
        <li>Гарантия 6–12 месяцев на технику и 90 дней на ремонтные работы.</li>
        <li>Сохранность пломб и отсутствие следов влаги обязательны.</li>
        <li>Поддержка в мессенджерах: объясним правила эксплуатации.</li>
      </ul>
    </div>
  </div>
);

export default WarrantyPage;
