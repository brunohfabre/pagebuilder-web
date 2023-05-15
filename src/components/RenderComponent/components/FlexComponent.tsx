import clsx from 'clsx'

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
    <div
      className={clsx(
        'bg-blue-200 p-4 border border-dashed border-blue-500',
        node.attributes.flex,
        node.attributes.height,
      )}
    >
      {node.value}
      {nodes
        .filter((item) => item.parentId === nodeId)
        .map((item) => (
          <RenderComponent key={item.id} nodeId={item.id} nodes={nodes} />
        ))}
    </div>
  )
}
