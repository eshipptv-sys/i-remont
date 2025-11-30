import { Link } from 'react-router-dom';

const menu = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Сервисный центр', to: '/service' },
  { label: 'Доставка и оплата', to: '/delivery' },
  { label: 'Гарантия', to: '/warranty' },
  { label: 'Контакты', to: '/contacts' }
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-bold text-xl mb-3">i-Remont</div>
          <p className="text-sm text-slate-200">
            Сервис продажи и бережного ремонта техники Apple и не только. Гарантия, доставка, забота
            о каждом устройстве.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Меню</div>
          <div className="flex flex-col gap-2 text-sm text-slate-200">
            {menu.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm text-slate-200 space-y-2">
          <div className="font-semibold text-white">Контакты</div>
          <a href="tel:+74951234567" className="block hover:text-accent">
            +7 (495) 123-45-67
          </a>
          <div>Москва, Бутырский Вал 68, стр. 1</div>
          <div>10:00–21:00 без выходных</div>
          <a href="https://t.me/i_remont" target="_blank" className="inline-flex items-center gap-2 hover:text-accent">
            <span>Наш Telegram</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
