import { useRef, useState, useEffect, useCallback } from "react";

import ReactFlow, {
    Node,
    Edge,
    addEdge,
    Controls,
    Connection,
    Background,
    useEdgesState,
    useNodesState,
    ReactFlowInstance,
    ReactFlowProvider,
} from "reactflow";

import MessageNode from "./components/nodes/message";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [
    {
        id: "node_0",
        type: "messageNode",
        position: { x: 0, y: 0 },
        data: { label: "1" },
    },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
    messageNode: MessageNode,
};

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
                    data: { label: `${type} node` },
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
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNode.id) {
                    node.data = {
                        ...node.data,
                        label: event.target.value,
                    };
                }
                return node;
            })
        );
    };
    return (
        <>
            <div className="px-4 py-2 flex justify-end items-center bg-gray-100">
                <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded">
                    Save Changes
                </button>
            </div>
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
                <div className="border-l-2 border-l-gray-400">
                    {selectedNode ? (
                        <div className="py-2 flex flex-col my-4 mx-2 font-semibold border border-blue-500 rounded">
                            <div className="px-1 py-1 flex">
                                <img
                                    src="back-arrow.svg"
                                    className="h-6 w-6"
                                    onClick={() => {
                                        // const currenSelectedNode =
                                        //     nodes.findIndex(
                                        //         (item) => item.selected
                                        //     );
                                        // nodes[currenSelectedNode].selected =
                                        //     false;
                                        setSelectedNode(null);
                                    }}
                                />
                                <span className="w-full text-md text-center">
                                    Message
                                </span>
                            </div>
                            <textarea
                                onChange={handleTextAreaOnChange}
                                defaultValue={selectedNode.data.label}
                                className="border border-teal-200 rounded-md mx-2 px-2 py-1 focus:outline-blue-500"
                            />
                        </div>
                    ) : (
                        <div
                            draggable
                            className="py-2 flex flex-col items-center w-1/2 my-4 mx-2 text-blue-700 font-semibold border border-blue-700 rounded"
                            onDragStart={(event) =>
                                handleOnDragStart(event, "messageNode")
                            }
                        >
                            <img
                                src="message.svg"
                                className="h-6 w-6 text-blue-700"
                            />
                            <span>Message</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
