import { Handle, Position } from "reactflow";

const MessageNode = ({ data }) => {
    return (
        <div className="w-64 border rounded-md bg-white shadow-sm">
            <div className="px-2 py-1 border rounded-md flex items-center justify-between gap-2 bg-teal-200">
                <div className="flex gap-2 items-center justify-center">
                    <img src="message.svg" className="h-6 w-6" />
                    <span>Send Message</span>
                </div>
                <img src="whatsapp.svg" className="h-8 w-8" />
            </div>
            <div className="w-full px-2 py-1">
                <textarea
                    readOnly
                    value={data.label}
                    placeholder="Type your message here..."
                    className="w-full border border-teal-200 rounded-md px-2 py-1"
                />
            </div>
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default MessageNode;
