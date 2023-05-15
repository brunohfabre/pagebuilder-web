import { RenderComponent } from '..'

import { NodeType } from '../../RenderRoute'

interface FlexComponentProps {
  nodeId: string
  nodes: NodeType[]
}

export function FlexComponent({ nodeId, nodes }: FlexComponentProps) {
  const node = nodes.find((item) => item.id === nodeId)

  if (!node) {
    return <div>node not defined</div>
  }

  return (
    <p className="bg-red-200 p-4 border border-dashed border-red-500">
      {node.value}
      {nodes
        .filter((item) => item.parentId === nodeId)
        .map((item) => (
          <RenderComponent key={node.id} nodeId={item.id} nodes={nodes} />
        ))}
    </p>
  )
}
