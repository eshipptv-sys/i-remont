# i-Remont — монорепозиторий

Интернет-магазин техники и сервисного центра i-Remont на React + Express + PostgreSQL.

## Структура
- `frontend/` — клиент на React, TypeScript, Vite, React Router.
- `backend/` — API на Node.js, Express, Prisma, JWT.
- `docs/` — документация и инструкции.

## Предварительные требования
- Node.js 18+
- npm
- Docker (для быстрого подъема PostgreSQL)

## Шаги запуска
### 1. Клонирование и зависимости
```bash
npm install --workspaces
```

### 2. База данных
Запустить PostgreSQL через Docker Compose:
```bash
docker-compose up -d db
```

Переменная подключения задается в `.env` (см. `.env.example`).

### 3. Миграции и Prisma Client
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Запуск API
```bash
cd backend
npm run dev
```
API будет доступен на `http://localhost:${PORT_BACKEND}` (по умолчанию 4000).

### 5. Запуск фронтенда
```bash
cd frontend
npm run dev
```
Клиент доступен на `http://localhost:5173`.

### Полезные команды
- `npm run build` (в папке frontend) — сборка клиентской части.
- `npm run build` (в папке backend) — компиляция TypeScript API.
- `npm run lint` — быстрая проверка типов для каждого пакета.

### Переменные окружения
Скопируйте `.env.example` в `.env` и заполните:
- `DATABASE_URL` — строка подключения PostgreSQL.
- `PORT_BACKEND` — порт сервера Express.
- `FRONTEND_URL` — адрес фронтенда для CORS.
- `JWT_SECRET` — секрет для подписи JWT.

## Данные для проверки
Seed-скрипт создает администратора `admin@i-remont.ru / admin123`, категории (iPhone, iPad, Watch, AirPods, Accessories) и примеры товаров (iPhone 15 Pro, AirPods Pro 2). После `npx prisma db seed` откройте `/catalog` или `/product/:slug` для проверки. Админ-панель — `/admin`.
