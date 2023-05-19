import { Node, Edge } from "reactflow";
import DroppableMessageNode from "../components/DroppableNodes/DroppableMessageNode";

export const initialNodes: Node[] = [
    {
        id: "node_0",
        type: "messageNode",
        position: { x: 0, y: 0 },
        data: { label: "" },
    },
];

export const initialEdges: Edge[] = [];

export const nodeTypes = {
    messageNode: DroppableMessageNode,
};
