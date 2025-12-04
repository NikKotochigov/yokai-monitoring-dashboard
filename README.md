# Yokai Monitoring Dashboard

Дашборд для мониторинга японских духов (ёкаев) с отслеживанием уровня угрозы в реальном времени.

## Технологии

- Next.js 15 (App Router)
- React 19
- TypeScript
- TanStack React Query
- Server-Sent Events (SSE)
- Feature-Sliced Design (FSD)
- Tailwind CSS / shadcn/ui

## Основной функционал

- Список ёкаев с карточками
- Обновление уровня угрозы в реальном времени через SSE
- Захват ёкая с оптимистичным обновлением UI
- Адаптивный дизайн

## Архитектура

Проект следует FSD методологии:

```
app/                  # Next.js роуты
src/
  ├── app/            # Провайдеры, глобальная логика
  ├── pages/          # Композиция страниц
  ├── widgets/        # Блоки страниц
  ├── features/       # Фичи (захват ёкая)
  ├── entities/       # Бизнес-сущности (yokai)
  └── shared/         # UI-kit, утилиты, API
```

## Запуск проекта

### Локально

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

### Docker

```bash
docker-compose up
```

Пересборка с нуля:

```bash
docker-compose up
```

## API

### GET /api/yokai

Возвращает список всех ёкаев.

### POST /api/yokai/capture

Помечает ёкая как пойманного.

Body: `{ "yokaiId": "1" }`

### GET /api/yokai/stream

SSE-стрим с обновлениями уровня угрозы в реальном времени.

## Конфигурация

Интервал обновлений SSE:

```ts
// src/shared/config/constants.ts
export const SSE_UPDATE_INTERVAL = 3000; // мс
```

## Разработка

Проверка типов:

```bash
npm run type-check
```

Линтинг:

```bash
npm run lint
```

Сборка:

```bash
npm run build
```
