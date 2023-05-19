import { Node, Edge } from "reactflow";

type NavbarProps = {
    nodes: Node[];
    edges: Edge[];
};

import { handleSaveChanges } from "../../utils/NavbarUtils";
const Navbar = ({ nodes, edges }: NavbarProps) => {
    return (
        <div className={`px-4 py-2 flex justify-end items-center bg-gray-100`}>
            <button
                className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded"
                onClick={() => handleSaveChanges(nodes, edges)}
            >
                Save Changes
            </button>
        </div>
    );
};

export default Navbar;
