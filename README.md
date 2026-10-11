# Обнаружение и классификация опор ЛЭП

Веб-приложение для загрузки фотографий опор линий электропередачи, их классификации по типу, материалу и состоянию, а также ведения истории обработки с поиском и фильтрацией.

В первом семестре реализуется интерфейс и серверная часть MVP. Модель машинного обучения для обнаружения и классификации опор в рамках первого семестра не разрабатывается — на этом этапе классификация представлена демонстрационными данными. Подключение реального алгоритма планируется отдельно.

## Пользовательские сценарии

1. Просмотр списка обработанных фотографий с превью и краткой информацией.
2. Просмотр деталей записи: большое изображение и полный набор атрибутов.
3. Загрузка новой фотографии с указанием типа опоры, материала и состояния.
4. Ручная корректировка классификации, если она определена неверно.
5. Поиск по имени файла и комментарию, фильтрация по типу опоры.
6. Вход в систему и просмотр профиля — разделы появятся в лабораторной работе №4.

## Экраны приложения

| Маршрут | Назначение |
| --- | --- |
| `/` | Список записей |
| `/photos/upload` | Загрузка новой фотографии |
| `/photos/:id` | Детали записи |
| `/photos/:id/edit` | Редактирование классификации |
| `/login` | Вход в систему (заглушка) |
| `/profile` | Профиль пользователя (заглушка) |
| `*` | Страница 404 |

## Модель данных

Основная сущность — запись об обработанной фотографии опоры.

Поля записи:

- `id` — идентификатор
- `imageUrl` — путь к изображению
- `fileName` — исходное имя файла
- `poleType` — тип опоры
- `material` — материал
- `condition` — состояние
- `confidence` — уверенность классификации (0..1)
- `latitude`, `longitude` — координаты (опционально)
- `comment` — комментарий
- `uploadedAt` — дата загрузки
- `uploadedBy` — идентификатор пользователя

Справочные перечисления:

- Тип опоры: анкерная, промежуточная, угловая, транспозиционная, ответвительная
- Материал: дерево, бетон, сталь, железобетон
- Состояние: исправна, требует ремонта, критическое состояние, не определено

Пользователь: `id`, `email`, `name`.

## Стек

- React 18 и TypeScript
- Vite
- React Router
- Mantine (библиотека UI-компонентов)
### Backend

- Python 3.12 + FastAPI
- PostgreSQL 16
- SQLAlchemy 2.0
- Pydantic 2
## Структура проекта

```
src/
├── components/     переиспользуемые компоненты
├── pages/          страницы приложения
├── data/           демонстрационные данные
├── types/          типы предметной области
├── utils/          словари подписей и вспомогательные функции
├── App.tsx         маршрутизация
└── main.tsx        точка входа и провайдеры
```

## Запуск frontend

Требуется Node.js версии 20 или выше.

Установка зависимостей:

```bash
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Приложение откроется по адресу http://localhost:5173.

Сборка production-версии и её предпросмотр:

```bash
npm run build
npm run preview
```

## Скриншоты

Список записей:

![Список записей](docs/screenshots/01-list.png)

Детали записи:

![Детали записи](docs/screenshots/02-details.png)

Загрузка фотографии:

![Загрузка фотографии](docs/screenshots/03-upload.png)

Редактирование классификации:

![Редактирование классификации](docs/screenshots/04-edit.png)

Страница входа:

![Страница входа](docs/screenshots/05-login.png)

Профиль пользователя:

![Профиль пользователя](docs/screenshots/06-profile.png)

Страница 404:

![Страница 404](docs/screenshots/07-not-found.png)

Мобильная версия списка:

![Мобильная версия](docs/screenshots/08-mobile-list.png)
---
## Backend

Серверная часть проекта реализована на FastAPI с использованием PostgreSQL и SQLAlchemy 2.0. Она предоставляет REST API для работы с пользователями и записями о фотографиях опор ЛЭП.

### Стек backend

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- PostgreSQL 16
- Pydantic 2 (валидация данных)
- Uvicorn (ASGI-сервер)

### Структура backend

```
backend/
├── app/
│   ├── main.py            точка входа FastAPI
│   ├── config.py          загрузка настроек из .env
│   ├── database.py        подключение к PostgreSQL, сессии SQLAlchemy
│   ├── models/            модели SQLAlchemy (таблицы)
│   │   ├── user.py
│   │   └── pole_photo.py
│   ├── schemas/           схемы Pydantic (валидация запросов и ответов)
│   │   ├── user.py
│   │   └── pole_photo.py
│   └── routers/           маршруты API
│       ├── users.py
│       └── pole_photos.py
├── requirements.txt       зависимости Python
├── .env.example           шаблон переменных окружения
└── .env                   реальные переменные (не коммитится)
```

### Модель данных

**users** — пользователи системы:

- `id` (PK, integer, autoincrement)
- `email` (unique, indexed, not null)
- `name` (not null)

**pole_photos** — записи об обработанных фотографиях опор:

- `id` (PK, integer, autoincrement)
- `image_url`, `file_name` (not null)
- `pole_type`, `material`, `condition` (not null, строковые коды)
- `confidence` (float, 0..1)
- `latitude`, `longitude` (nullable)
- `comment` (nullable)
- `uploaded_at` (datetime, server default = now)
- `uploaded_by` (FK → users.id, nullable)

### Эндпоинты API

**Пользователи:**

- `GET /users/` — список всех пользователей
- `GET /users/{user_id}` — один пользователь по id
- `POST /users/` — создать пользователя
- `DELETE /users/{user_id}` — удалить пользователя

**Фотографии:**

- `GET /photos/` — список записей с пагинацией и фильтром по типу
- `GET /photos/{photo_id}` — одна запись
- `POST /photos/` — создать запись
- `PUT /photos/{photo_id}` — обновить запись (только присланные поля)
- `DELETE /photos/{photo_id}` — удалить запись

Валидация входных данных реализована через Pydantic. Некорректные данные возвращают статус 422 с описанием ошибки; отсутствующие записи — 404; попытка создать дубликат email — 409.

### Настройка и запуск backend

**1. Установить PostgreSQL** (если ещё не установлен):

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

**2. Создать пользователя и базу данных:**

```bash
sudo -u postgres psql
```

В консоли psql:

```sql
CREATE USER lps_user WITH PASSWORD 'lps_password';
CREATE DATABASE lps_db OWNER lps_user;
GRANT ALL PRIVILEGES ON DATABASE lps_db TO lps_user;
\q
```

**3. Создать виртуальное окружение и установить зависимости:**

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**4. Настроить переменные окружения:**

Скопировать `.env.example` в `.env` и заполнить своим значением `DATABASE_URL`:

```bash
cp .env.example .env
```

Формат строки подключения:

```
DATABASE_URL=postgresql+psycopg2://lps_user:lps_password@localhost:5432/lps_db
```

**5. Запустить сервер:**

```bash
uvicorn app.main:app --reload
```

Таблицы создаются автоматически при первом запуске (`Base.metadata.create_all`).

**6. Открыть документацию API:**

Swagger UI доступен по адресу: http://localhost:8000/docs

### Проверка работы API

Через Swagger UI можно:

- создать пользователя (`POST /users/`);
- создать запись о фотографии (`POST /photos/`);
- получить список записей (`GET /photos/`);
- обновить запись (`PUT /photos/{id}`);
- удалить запись (`DELETE /photos/{id}`);
- проверить валидацию (например, `confidence > 1` вернёт 422);
- проверить обработку отсутствующих записей (несуществующий id вернёт 404).

Проверить данные в БД можно через psql:

```bash
psql -U lps_user -d lps_db -h localhost
```

```sql
SELECT id, email, name FROM users;
SELECT id, file_name, pole_type, condition FROM pole_photos;
```
Учебный проект. Первый семестр курса «Fullstack».