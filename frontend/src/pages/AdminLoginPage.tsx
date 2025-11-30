import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { login } from '../api/products';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@i-remont.ru');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      navigate('/admin/products');
    } catch (err) {
      setError((err as Error).message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="page page--narrow">
      <Helmet>
        <title>Вход в админку — i-Remont</title>
      </Helmet>
      <h1>Админ-панель</h1>
      <p className="muted">Авторизация по логину и паролю.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Пароль
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
