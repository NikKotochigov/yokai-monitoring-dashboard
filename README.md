# 🏮 Yokai Monitoring Dashboard

Real-time spirit detection and capture system for Tokyo regions. A Single Page Application built with Next.js App Router, implementing Feature-Sliced Design architecture.

## ✨ Features

- **Real-time Monitoring**: Live updates of yokai (spirit) threat levels via Server-Sent Events (SSE)
- **Optimistic Updates**: Instant UI feedback when capturing spirits with automatic rollback on failure
- **30% Error Simulation**: Realistic error handling to demonstrate resilience
- **Feature-Sliced Design**: Strict architectural boundaries for maintainability
- **Full Type Safety**: TypeScript + Zod validation for all data
- **Modern Stack**: Next.js 15, React 18, TanStack Query v5

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)

### Running with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/NikKotochigov/yokai-monitoring-dashboard.git
cd yokai-monitoring-dashboard

# Start the application
docker-compose up
```

The application will be available at **http://localhost:3000/monitoring**

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **UI Library** | React 18 |
| **State Management** | TanStack Query v5 |
| **Styling** | SCSS Modules |
| **Validation** | Zod |
| **Type Safety** | TypeScript |
| **Architecture** | Feature-Sliced Design (FSD) |
| **Containerization** | Docker |

## 🏛️ Architecture

### Feature-Sliced Design Structure

```
src/
├── app/              # Application layer (providers, global styles)
├── pages/            # Pages layer (route compositions)
├── widgets/          # Widgets layer (autonomous UI blocks)
├── features/         # Features layer (user interactions)
├── entities/         # Entities layer (business models)
└── shared/           # Shared layer (reusable code)
```

### Layer Responsibilities

- **app**: Query providers, global styles, app configuration
- **pages**: Page compositions (monitoring dashboard)
- **widgets**: Self-contained UI blocks (yokai list)
- **features**: User actions (capture yokai)
- **entities**: Business entities (yokai model, API schemas)
- **shared**: UI kit, utilities, constants

## 📡 API Endpoints

### GET /api/yokai
Fetch list of all yokai spirits with their current status.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Kitsune",
    "threatLevel": "medium",
    "location": "Shibuya",
    "status": "active"
  }
]
```

### POST /api/yokai-capture
Attempt to capture a yokai spirit (30% failure rate).

**Request:**
```json
{
  "yokaiId": "1"
}
```

**Success Response:**
```json
{
  "success": true,
  "yokaiId": "1",
  "capturedAt": "2025-12-04T08:42:00.000Z"
}
```

**Error Response (30% probability):**
```json
{
  "error": "Capture failed - yokai escaped!"
}
```

### GET /api/yokai-stream
Server-Sent Events stream for real-time threat level updates (every 5 seconds).

**Event Data:**
```json
{
  "yokaiId": "2",
  "threatLevel": "critical",
  "timestamp": "2025-12-04T08:42:05.000Z"
}
```

## 🔧 Key Features Explained

### Optimistic Updates

When capturing a yokai, the UI updates immediately (optimistic update) before the server responds. If the capture fails (30% chance), the UI automatically rolls back to the previous state and shows an error notification.

**Implementation:** `src/features/capture-yokai/model/use-capture-yokai.ts`

```typescript
onMutate: async (yokaiId: string) => {
  // Snapshot previous state
  const previousYokaiList = queryClient.getQueryData(QUERY_KEYS.YOKAI_LIST);
  
  // Update UI optimistically
  queryClient.setQueryData(QUERY_KEYS.YOKAI_LIST, (old) =>
    old.map((yokai) =>
      yokai.id === yokaiId ? { ...yokai, status: 'captured' } : yokai
    )
  );
  
  return { previousYokaiList };
},
onError: (err, variables, context) => {
  // Rollback on error
  queryClient.setQueryData(QUERY_KEYS.YOKAI_LIST, context?.previousYokaiList);
}
```

### Real-time Updates (SSE)

The dashboard subscribes to Server-Sent Events to receive real-time threat level changes every 5 seconds.

**Implementation:** `src/widgets/yokai-list/model/use-yokai-stream.ts`

```typescript
useEffect(() => {
  const eventSource = new EventSource('/api/yokai-stream');
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Update threat level in real-time
    queryClient.setQueryData(QUERY_KEYS.YOKAI_LIST, (old) =>
      old.map((yokai) =>
        yokai.id === data.yokaiId
          ? { ...yokai, threatLevel: data.threatLevel }
          : yokai
      )
    );
  };
  
  return () => eventSource.close();
}, [queryClient]);
```

### Data Validation with Zod

All incoming data is validated using Zod schemas to ensure type safety at runtime.

**Implementation:** `src/entities/yokai/api/schemas.ts`

```typescript
export const yokaiSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string(),
  status: z.enum(['active', 'captured']),
});
```

## 🎨 Styling

The project uses **SCSS Modules** for component-scoped styling with CSS variables for theming.

**Theme Variables:**
```scss
:root {
  --color-bg: #0d1117;
  --color-surface: #161b22;
  --color-border: #30363d;
  --color-text: #e6edf3;
  --color-primary: #58a6ff;
  --color-success: #3fb950;
  --color-danger: #f85149;
  --color-warning: #d29922;
}
```

## 🐛 Testing the Application

1. **Navigate** to http://localhost:3000/monitoring
2. **Observe** the yokai cards with different threat levels (low, medium, high, critical)
3. **Click** "Capture" on any active yokai
4. **Watch** the optimistic update (card immediately shows as captured)
5. **See** either:
   - Success notification (70% probability)
   - Error notification with automatic rollback (30% probability)
6. **Wait** 5 seconds to see random threat level changes via SSE

## 📝 Project Structure

```
yokai-monitoring-dashboard/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── yokai/          # GET yokai list
│   │   ├── yokai-capture/  # POST capture yokai
│   │   └── yokai-stream/   # SSE stream
│   ├── monitoring/         # /monitoring route
│   └── layout.tsx          # Root layout
├── src/                    # Source code (FSD)
│   ├── app/                # App layer
│   ├── pages/              # Pages layer
│   ├── widgets/            # Widgets layer
│   ├── features/           # Features layer
│   ├── entities/           # Entities layer
│   └── shared/             # Shared layer
├── docker-compose.yml      # Docker composition
├── Dockerfile              # Container definition
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── next.config.js          # Next.js config
```

## 🔗 Links

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zod Validation](https://zod.dev/)
- [Server-Sent Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 📝 License

MIT

## 👤 Author

Nikolay Kotochigov
