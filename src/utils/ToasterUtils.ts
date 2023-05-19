import toast from "react-hot-toast";

export function sendSuccess() {
    return toast.success("Changes Saved 😍 ", {
        position: "bottom-right",
        duration: 3000,
        style: {
            color: "green",
            background: "#e6ffe6",
        },
    });
}

export function sendError() {
    return toast.error("All source nodes are not connected 😒", {
        position: "bottom-right",
        duration: 3000,
        style: {
            color: "red",
            background: "#FFCCCB",
        },
    });
}
