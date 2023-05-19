import { Node, Edge } from "reactflow";
import { sendError, sendSuccess } from "./ToasterUtils";

export const handleSaveChanges = (nodes: Node[], edges: Edge[]) => {
    const nodeIds = nodes.map((node) => node.id);
    const edgeSourceIds = edges.map((edge) => edge.source);
    let freeSource = 0;
    for (let item of nodeIds) {
        if (!edgeSourceIds.includes(item)) freeSource++;
    }
    if (freeSource >= 2) {
        sendError();
    } else {
        sendSuccess();
    }
};
