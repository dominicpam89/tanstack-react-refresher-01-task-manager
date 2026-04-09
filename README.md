# Task Manager - TanStack Refresher

A modern task management application built with React 19, TanStack Query, and TypeScript. This project demonstrates advanced React patterns including optimistic updates, type-safe API integration, and a beautiful UI built with Tailwind CSS v4 and shadcn/ui components.

# 🚀 Features

- ✅ Create, read, update, and delete tasks
- 🔄 Real-time cache invalidation with TanStack Query
- ⚡ Optimistic updates for delete operations
- 📱 Responsive design with Tailwind CSS v4
- 🎨 Accessible UI components from shadcn/ui
- 📋 Form validation with React Hook Form and Zod
- 🧭 Client-side routing with React Router v7
- 🗄️ Mock REST API using json-server (easily replaceable with a real backend)

# 🛠️ Tech Stack

| Category         | Technologies                                                                    |
| ---------------- | ------------------------------------------------------------------------------- |
| Frontend         | React 19, TypeScript, Vite                                                      |
| State Management | TanStack Query (React Query) v5                                                 |
| Routing          | React Router v7                                                                 |
| Forms            | React Hook Form + Zod + @hookform/resolvers                                     |
| Styling          | Tailwind CSS v4, tw-animate-css, class-variance-authority, clsx, tailwind-merge |
| UI Components    | shadcn/ui, Radix UI primitives, Vaul (drawer)                                   |
| Icons            | Lucide React                                                                    |
| API Clients      | Native fetch with error handling                                                |
| Mock Backends    | json-server (see db.json)                                                       |
| Dev Tools        | ESLint, Prettier, React Compiler (Babel plugin), TypeScript 5.9                 |

# 📦 Getting Started

## Prerequisites

- Node.js 20+ (or 22+)
- pnpm, npm, or yarn

## Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/your-username/tanstack-refresher-01-task-manager.git
   cd tanstack-refresher-01-task-manager
   ```
2. Install Dependencies:

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a .env file in the root directory:
   ```json
   VITE_API_URL=http://localhost:5400
   ```
   The app uses this base URL for all API requests.

## Running the Development Servers

You need two terminals:

### Terminal 1 – Start the mock backend (json-server):

    ```bash
    npx json-server --watch db.json --port 5400
    ```

This will serve the REST API at http://localhost:5400

### Terminal 2 – Start the Vite dev server:

    ```bash
    npm run dev
    ```

The app will open at http://localhost:5173.

> 💡 Alternative using Vite proxy:
> You can configure a proxy in vite.config.ts to forward /api requests to http://localhost:3000. Then you don't need to set VITE_API_URL and can keep the default http://localhost:5173/api.

# 📁 Project Structure

```text
src/
├── api/
│   └── task.ts                # fetch wrapper and API functions (getTasks, createTask, etc.)
├── features/
│   ├── tasks/
│   │   └── types.ts           # Zod schemas and inferred types for tasks
│   └── types.ts               # global Task, CreateTaskInput, UpdateTaskInput types
├── hooks/
│   └── useTasks.ts            # custom TanStack Query hooks (useTasks, useCreateTask, etc.)
├── pages/
│   ├── RootLayout.tsx         # layout with shared UI (header, sidebar, etc.)
│   ├── HomePage.tsx           # landing page
│   ├── TasksPage.tsx          # list of tasks with create/delete/update actions
│   └── TaskDetailPage.tsx     # individual task view and edit form
├── router.tsx                 # React Router configuration
└── main.tsx                   # entry point (sets up QueryClientProvider, RouterProvider)
```

# 🔌 API Integration

The API service (src/api/task.ts) provides a type-safe fetch wrapper and exports these functions:
| Function | HTTP Method | Endpoint | Description |
| ----------- | ------------- | -------- | --------------- |
| getTasks() | GET | /tasks | Fetch all tasks |
| getTask(id) | GET | /tasks/:id | Fetch a single task |
| createTask(data) | POST | /tasks | Create a new task |
| updateTask(id, data) | PATCH /tasks/:id | Partially update a task |
| deleteTask(id) | DELETE | /tasks/:id | Delete a task |

All functions throw detailed errors on failure.

# 🧩 TanStack Query Hooks

Custom hooks in src/hooks/useTasks.ts abstract data fetching and mutations:

| Hook            | Description                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| useTasks()      | Query for all tasks. Automatically caches and refetches.                                                                              |
| useTask(id)     | Query for a single task.                                                                                                              |
| useCreateTask() | Mutation to create a task. On success, invalidates the tasks list query.                                                              |
| useUpdateTask() | Mutation to update a task. Invalidates both the list and the specific task detail.                                                    |
| useDeleteTask() | utation to delete a task. Optimistic update: removes the task from cache immediately, then invalidates on success. Rollback on error. |

# 🧪 Example Usage

```tsx
import { useTasks, useCreateTask } from '@/hooks/useTasks'

function TaskList() {
  const { data: tasks, isLoading, error } = useTasks()
  const createMutation = useCreateTask()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
      <button
        onClick={() =>
          createMutation.mutate({
            title: 'New Task',
            description: 'Optional description',
            completed: false,
          })
        }
      >
        Add Task
      </button>
    </ul>
  )
}
```

# 📜 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| npm run dev     | Start Vite development server            |
| npm run build   | TypeScript build + Vite production build |
| npm run preview | Preview the production build locally     |
| npm run lint    | Run ESLint with auto-fix                 |
| npm run format  | Format all files with Prettier           |

# 📄 License

This project is for learning purposes. Feel free to use and modify it.

# 🙌 Acknowledgements

- TanStack Query
- shadcn/ui
- json-server
- Vite
