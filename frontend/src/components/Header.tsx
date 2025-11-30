import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { to: '/catalog?category=IPHONE', label: 'iPhone' },
  { to: '/catalog?category=AIRPODS', label: 'AirPods' },
  { to: '/catalog?category=IPAD', label: 'iPad' },
  { to: '/catalog?category=MAC', label: 'Mac' },
  { to: '/catalog?category=WATCH', label: 'Watch' },
  { to: '/catalog?category=ACCESSORY', label: 'Аксессуары' },
  { to: '/catalog?category=OTHER', label: 'Другая техника' }
];

export const Header: React.FC = () => {
  const { items } = useCart();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-brand">
          <span className="bg-accent text-white px-2 py-1 rounded-md">i</span>
          <span>i-Remont</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hover:text-accent transition ${isActive ? 'text-accent' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <div className="hidden sm:flex flex-col text-right">
            <a href="tel:+74951234567" className="font-semibold text-brand">
              +7 (495) 123-45-67
            </a>
            <div className="text-xs text-slate-500">Без выходных 10:00–21:00</div>
          </div>
          <div className="flex items-center gap-2 text-accent" aria-label="Мессенджеры i-Remont">
            <span className="text-lg">💬</span>
            <span className="hidden md:inline text-sm text-slate-600">WhatsApp / Telegram</span>
          </div>
          <Link to="/cart" className="relative" aria-label="Корзина">
            <span className="text-2xl">🛒</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
