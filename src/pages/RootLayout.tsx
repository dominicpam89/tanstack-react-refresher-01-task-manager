import { Outlet } from 'react-router'

export default function RootLayoutPage() {
  return (
    <div className="w-full min-w-75 max-w-2xl p-2 sm:p-8 m-auto flex flex-col gap-2">
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  )
}
