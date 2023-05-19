import { Node } from "reactflow";

export function getUpdatedSelection(nodes: Node[], selectedNode: Node | null) {
    return nodes.map((node) => {
        if (selectedNode !== null && node.id === selectedNode.id) {
            node.selected = false;
        }
        return node;
    });
}

export function getUpdatedNodeData(
    nodes: Node[],
    selectedNode: Node | null,
    event: React.ChangeEvent<HTMLTextAreaElement>
) {
    return nodes.map((node) => {
        if (selectedNode !== null && node.id === selectedNode.id) {
            node.data = {
                ...node.data,
                label: event.target.value,
            };
        }
        return node;
    });
}
