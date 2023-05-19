// 3rd party packages
import { useRef, useState, useEffect, useCallback } from "react";
import ReactFlow, {
    Node,
    addEdge,
    Controls,
    Connection,
    Background,
    useEdgesState,
    useNodesState,
    ReactFlowInstance,
    ReactFlowProvider,
} from "reactflow";
import { Toaster } from "react-hot-toast";

// common components
import Navbar from "./components/Navbar/Navbar";
import RightPanel from "./components/RightPanel/RightPanel";

// utils
import { getUpdatedNodeData } from "./utils/NodeUtilFunctions";
import { initialNodes, initialEdges, nodeTypes } from "./utils/FlowUtils";

// styles
import "reactflow/dist/style.css";

// get id for each new node (we dont want its value to be redeclared thats why keeping it outside of component)
let id = 1;
const getId = () => `node_${id++}`;

export default function App() {
    const reactFlowWrapper = useRef<HTMLInputElement>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback((params: Connection) => {
        setEdges((edges) => {
            // if there is no outgoing edge from node's source, only then we add the edge
            if (
                edges.findIndex((edge) => edge.source === params.source) === -1
            ) {
                return addEdge(params, edges);
            }
            return edges;
        });
    }, []);

    const handleOnDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (
                reactFlowWrapper.current !== null &&
                reactFlowInstance !== null
            ) {
                const reactFlowBounds =
                    reactFlowWrapper.current.getBoundingClientRect();
                const type = event.dataTransfer.getData(
                    "application/reactflow"
                );

                // check if the dropped element is valid
                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });
                const newNode = {
                    id: getId(),
                    type,
                    position,
                    data: { label: `` },
                };

                setNodes((nds) => nds.concat(newNode));
            }
        },
        [reactFlowInstance]
    );

    useEffect(() => {
        const currentSelectedNode = nodes.findIndex((item) => item.selected);
        if (currentSelectedNode !== -1) {
            setSelectedNode(nodes[currentSelectedNode]);
        } else {
            setSelectedNode(null);
        }
    }, [nodes]);

    const handleOnDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        },
        []
    );

    const handleOnDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: string
    ) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleTextAreaOnChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (selectedNode === null) return;
        setNodes((nodes) => getUpdatedNodeData(nodes, selectedNode, event));
    };

    return (
        <>
            <Navbar nodes={nodes} edges={edges} />
            <div className="grid grid-cols-[80vw_20vw]">
                <ReactFlowProvider>
                    <div style={{ height: "90vh" }} ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            nodeTypes={nodeTypes}
                            onDrop={handleOnDrop}
                            onDragOver={handleOnDragOver}
                            fitView
                        >
                            <Controls />
                            <Background gap={12} size={1} />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
                <RightPanel
                    setNodes={setNodes}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    handleOnDragStart={handleOnDragStart}
                    handleTextAreaOnChange={handleTextAreaOnChange}
                />
            </div>
            <Toaster />
        </>
    );
}
