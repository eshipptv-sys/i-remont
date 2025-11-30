import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: 20, background: "#000", color: "#fff" }}>
      <h2>i-Remont Shop</h2>
      <nav>
        <Link to="/" style={{ marginRight: 20, color: "#fff" }}>Главная</Link>
        <Link to="/catalog" style={{ color: "#fff" }}>Каталог</Link>
      </nav>
    </header>
  );
}