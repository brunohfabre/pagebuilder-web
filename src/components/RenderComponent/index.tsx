import { NodeType } from '../RenderRoute'
import { FlexComponent } from './components/FlexComponent'

interface RenderComponentProps {
  nodeId: string
  nodes: NodeType[]
}

export function RenderComponent({ nodeId, nodes }: RenderComponentProps) {
  const node = nodes.find((item) => item.id === nodeId)

  if (!node) {
    return <div>node not defined</div>
  }

  if (node.type === 'flex') {
    return <FlexComponent nodeId={node.id} nodes={nodes} />
  }

  if (node.type === 'paragraph') {
    return (
      <p className="bg-red-200 p-4 border border-dashed border-red-500">
        {node.value}
        {nodes
          .filter((item) => item.parentId === nodeId)
          .map((item) => (
            <RenderComponent key={item.id} nodeId={item.id} nodes={nodes} />
          ))}
      </p>
    )
  }

  return (
    <div>
      <p>to be implemented</p>
    </div>
  )
}
