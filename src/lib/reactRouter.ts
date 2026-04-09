import { createHashRouter } from 'react-router'
import RootLayoutPage from '@/pages/RootLayout'
import HomePage from '@/pages/HomePage'
import TasksPage from '../pages/TasksPage'
import TaskDetailPage from '@/pages/TaskDetailPage'

export const router = createHashRouter([
  {
    path: '/',
    Component: RootLayoutPage,
    children: [
      { index: true, Component: HomePage },
      { path: 'tasks', Component: TasksPage },
      { path: 'tasks/:id', Component: TaskDetailPage },
    ],
  },
])
