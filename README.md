# i-Remont

Полноценный пример интернет-магазина мобильной техники и аксессуаров с публичной витриной и админ-панелью. Фронтенд — React + Vite, бэкенд — Express + Prisma, база — PostgreSQL. Дизайн вдохновлен appletrade.ru, но под брендом i-Remont.

## Стек
- **Frontend:** React 18, TypeScript, Vite, React Router, React Helmet
- **Backend:** Node.js, Express, Prisma, JWT, Zod
- **DB:** PostgreSQL (Docker Compose для локальной БД)

## Быстрый старт
1. Установите зависимости (монорепозиторий с workspace):
   ```bash
   npm install --workspaces
   ```
2. Поднимите базу данных:
   ```bash
   docker-compose up -d db
   ```
3. Создайте `.env` (по примеру `.env.example` в корне или `backend/.env`):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/i_remont"
   PORT_BACKEND=4000
   FRONTEND_URL="http://localhost:5173"
   JWT_SECRET="super-secret"
   ```
4. Примените миграции и заполните демо-данные:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. Запустите API:
   ```bash
   cd backend
   npm run dev
   ```
6. Запустите фронтенд:
   ```bash
   cd frontend
   npm run dev
   ```

Откройте:
- витрина: http://localhost:5173
- API: http://localhost:4000/api
- админ-панель: http://localhost:5173/admin (логин `admin@i-remont.ru`, пароль `admin123` из seed)

## Возможности
### Клиентская часть
- Главная страница с баннером, блоками «Популярные» и «Новинки».
- Каталог с фильтрами по бренду, категории, цене и сортировкой (цена ↑/↓, новизна).
- Страница товара с галереей, ценой/скидкой, наличием, характеристиками, SEO-мета и URL `/product/:slug`.
- Простая корзина (локально) с подсчетом итоговой суммы.

### Админ-панель
- Авторизация по логину/паролю (JWT).
- Список товаров с поиском и переключателем наличия.
- Создание/редактирование/удаление товаров, загрузка ссылок на фото и галерею, управление SEO-полями.

### API
- Публичные: `GET /api/products` (фильтры и пагинация), `GET /api/products/:slug`, `GET /api/categories`, `GET /api/search`.
- Админ: `POST /api/admin/auth/login`, CRUD товаров (`/api/admin/products`), быстрый PATCH статуса наличия.

## Структура
- `frontend/` — клиентская витрина и админка.
- `backend/` — REST API + Prisma схема и сиды.
- `docker-compose.yml` — PostgreSQL для локального запуска.
- `docs/` — дополнительная документация.

## Стили и SEO
- Минимализм в духе Apple: Inter, бело-черная палитра с голубым акцентом.
- Уникальные title/description/keywords из полей товара попадают в `<head>` через React Helmet.
- ЧПУ-URL на фронте `/product/:slug`, slug генерируется на сервере.
