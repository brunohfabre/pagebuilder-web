import { Route, Routes } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { RenderRoute } from '../components/RenderRoute'
import { api } from '../lib/api'
import { NoMatch } from '../pages/NoMatch'

export type RouteType = {
  id: string
  name: string
  description?: string
  route: string
  node_id: string
}

export function AppRoutes() {
  const { data: routes, isLoading: isRoutesLoading } = useQuery(
    ['routes'],
    async () => {
      const response = await api.get<{ routes: RouteType[] }>('/routes')

      const filteredRoutes = response.data.routes.filter(
        (route) => !!route.node_id,
      )

      return filteredRoutes
    },
  )

  if (!routes && isRoutesLoading) {
    return (
      <div>
        <p>routes loading</p>
      </div>
    )
  }

  if (!routes?.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>no routes</p>
      </div>
    )
  }

  return (
    <Routes>
      {routes.map((route: RouteType) => (
        <Route
          key={route.id}
          path={route.route}
          element={<RenderRoute route={route} />}
        />
      ))}

      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
