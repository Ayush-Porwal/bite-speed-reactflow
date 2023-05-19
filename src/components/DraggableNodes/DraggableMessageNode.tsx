type DraggableMessageNodeProps = {
    handleOnDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: string
    ) => void;
};

const DraggableMessageNode = ({
    handleOnDragStart,
}: DraggableMessageNodeProps) => {
    return (
        <div
            draggable
            className="py-2 flex flex-col items-center w-1/2 my-4 mx-2 text-blue-700 font-semibold border border-blue-700 rounded"
            onDragStart={(event) => handleOnDragStart(event, "messageNode")}
        >
            <img src="message.svg" className="h-6 w-6 text-blue-700" />
            <span>Message</span>
        </div>
    );
};

export default DraggableMessageNode;
