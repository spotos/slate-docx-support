import { jsx } from "slate-hyperscript";

export const deserializeText = (el: Element, children: Element) => {
    switch (el.nodeName) {
        case "BODY":
            return jsx("fragment", {}, children);
        case "SPAN":
            return jsx("fragment", {}, children);
        case "o:p":
            return jsx("fragment", {}, children);
        case "BR":
            return "\n";
        case "BLOCKQUOTE":
            return jsx("element", { type: "quote" }, children);
        case "P":
            return jsx("element", { type: "paragraph" }, children);
        case "UL":
            return jsx("element", { type: "bulleted-list" }, children);
        case "OL":
            return jsx("element", { type: "numbered-list" }, children);
        case "LI":
            return jsx("element", { type: "list-item" }, children);
        case "A":
            return jsx(
                "element",
                { type: "link", url: el.getAttribute("href") },
                children
            );
        default:
            return children;
    }
};
