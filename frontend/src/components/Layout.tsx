import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../state/CartContext';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="logo">
            i-Remont
          </Link>
          <nav className="nav">
            <NavLink to="/" end>
              Главная
            </NavLink>
            <NavLink to="/catalog">Каталог</NavLink>
            <NavLink to="/admin">Админ</NavLink>
            <NavLink to="/cart">Корзина ({cartCount})</NavLink>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
      <footer className="footer">
        <div className="container footer__content">
          <div>
            <p className="logo">i-Remont</p>
            <p>Техника и сервис в стиле Apple. Доставка по России.</p>
          </div>
          <div className="footer__links">
            <Link to="/catalog">Каталог</Link>
            <Link to="/admin">Админ-панель</Link>
            <a href="https://appletrade.ru" target="_blank" rel="noreferrer">
              Референс appletrade.ru
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
