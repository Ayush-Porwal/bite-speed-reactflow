import { Node } from "reactflow";
import { getUpdatedSelection } from "../../utils/NodeUtilFunctions";
import DraggableMessageNode from "../DraggableNodes/DraggableMessageNode";

type RightPanelProps = {
    setNodes: React.Dispatch<
        React.SetStateAction<Node<any, string | undefined>[]>
    >;
    selectedNode: Node | null;
    setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
    handleTextAreaOnChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    handleOnDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: string
    ) => void;
};

const RightPanel = ({
    setNodes,
    selectedNode,
    setSelectedNode,
    handleOnDragStart,
    handleTextAreaOnChange,
}: RightPanelProps) => {
    return (
        <div className="border-l-2 border-l-gray-400">
            {selectedNode ? (
                <div className="py-2 flex flex-col my-4 mx-2 font-semibold border border-blue-500 rounded">
                    <div className="px-1 py-1 flex">
                        <img
                            src="back-arrow.svg"
                            className="h-6 w-6"
                            onClick={() => {
                                setNodes((nodes) =>
                                    getUpdatedSelection(nodes, selectedNode)
                                );
                                setSelectedNode(null);
                            }}
                        />
                        <span className="w-full text-md text-center">
                            Message
                        </span>
                    </div>
                    <textarea
                        value={selectedNode.data.label}
                        onChange={handleTextAreaOnChange}
                        className="border border-teal-200 rounded-md mx-2 px-2 py-1 focus:outline-blue-500"
                    />
                </div>
            ) : (
                <DraggableMessageNode handleOnDragStart={handleOnDragStart} />
            )}
        </div>
    );
};

export default RightPanel;
