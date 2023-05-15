import { useQuery } from '@tanstack/react-query'

import { api } from '../lib/api'
import { RouteType } from '../routes/AppRoutes'
import { RenderComponent } from './RenderComponent'

export type NodeType = {
  id: string
  type: string
  value?: string
  parentId?: string
  attributes: { [key: string]: any }
}

interface RenderRouteProps {
  route: RouteType
}

export function RenderRoute({ route }: RenderRouteProps) {
  document.title = route.name

  const { data: nodes, isLoading: isNodesLoading } = useQuery(
    ['nodes', route.node_id],
    async () => {
      const response = await api.get<{ nodes: NodeType[] }>(
        `/nodes/${route.node_id}`,
      )

      return response.data.nodes
    },
  )

  if (!nodes && isNodesLoading) {
    return (
      <div>
        <p>nodes loading</p>
      </div>
    )
  }

  return <RenderComponent nodeId={route.node_id} nodes={nodes!} />
}
