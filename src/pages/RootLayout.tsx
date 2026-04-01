import { Outlet } from 'react-router'

export default function RootLayoutPage() {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  )
}
