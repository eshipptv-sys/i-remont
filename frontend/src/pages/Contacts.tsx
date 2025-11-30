const ContactsPage: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
    <h1 className="text-3xl font-bold">Контакты</h1>
    <div className="card p-5 grid md:grid-cols-2 gap-4">
      <div className="space-y-2 text-slate-700">
        <p className="text-lg font-semibold">Москва, Бутырский Вал 68, стр. 1</p>
        <p>Ежедневно 10:00–21:00</p>
        <p>
          Телефон: <a href="tel:+74951234567" className="text-accent font-semibold">+7 (495) 123-45-67</a>
        </p>
        <p>
          Telegram: <a href="https://t.me/i_remont" className="text-accent">@i_remont</a>
        </p>
        <p>Email: <a href="mailto:hello@i-remont.com" className="text-accent">hello@i-remont.com</a></p>
      </div>
      <div className="space-y-2 text-slate-600 text-sm">
        <p>Как добраться: 5 минут пешком от станции метро Савеловская.</p>
        <p>Для диагностики и ремонта запись не нужна, но можно предупредить в мессенджере.</p>
        <p>Парковка: гостевая парковка БЦ, уточняйте на ресепшене.</p>
      </div>
    </div>
  </div>
);

export default ContactsPage;
