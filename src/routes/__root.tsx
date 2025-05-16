import { Outlet, createRootRoute } from '@tanstack/react-router'
import "@styles/main.scss"
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
