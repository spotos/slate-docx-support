import { jsx } from "slate-hyperscript";

import { cleanDocxListElements } from "./utils/cleanDocxListElements";
import { cleanHtmlTextNodes } from "./utils/cleanHtmlTextNodes";
import { deserializeList } from "./utils/deserializeList";
import { deserializeText } from "./utils/deserializeText";
import { isDocxList } from "./utils/isDocxList";
import { preCleanHtml } from "./utils/preCleanHtml";

export const deserialize = (el: Element, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx("text", markAttributes, el.textContent);
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    // Removes all elements with the class "done" that is added to already serialized elements
    if (
        el.attributes &&
        el.attributes.getNamedItem("class") &&
        el.attributes.getNamedItem("class")?.value.match(/done/g)
    ) {
        return null;
    }

    const nodeAttributes: Record<string, boolean> = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
        case "B":
            nodeAttributes.bold = true;
            break;

        case "I":
            nodeAttributes.italic = true;
            break;

        case "U":
            nodeAttributes.underline = true;
            break;

        case "STRIKE":
            nodeAttributes.strikethrough = true;
            break;
    }

    const children = Array.from(el.childNodes)
        .map(node => deserialize(node as Element, nodeAttributes))
        .flat();

    if (children.length === 0) {
        children.push(jsx("text", nodeAttributes, ""));
    }

    if (isDocxList(el)) {
        const { list, siblings } = deserializeList(el);

        if (siblings.length > 0) {
            siblings.forEach(sibling => {
                sibling.remove();
            });
        }

        return deserialize(list, nodeAttributes);
    }

    return deserializeText(el, children);
};

export const withDocxDeserializer = (editor: any) => {
    const { insertData, isInline, isVoid, insertFragment } = editor;

    editor.insertFragment = element => {
        insertFragment(element);
    };

    editor.isInline = element => {
        return element.type === "link" ? true : isInline(element);
    };

    editor.isVoid = element => {
        return element.type === "image" ? true : isVoid(element);
    };

    editor.insertData = data => {
        const html = data.getData("text/html");

        if (html) {
            const document = new DOMParser().parseFromString(
                preCleanHtml(html),
                "text/html"
            );

            const { body } = document;

            cleanHtmlTextNodes(body);
            cleanDocxListElements(body);

            const fragment = deserialize(document.body);
            return editor.insertFragment(fragment);
        }

        insertData(data);
    };
    return editor;
};
