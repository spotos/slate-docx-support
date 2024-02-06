// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const getSiblings = (el: Element) => {
    const siblings = [];
    while (
        el &&
        el.attributes.getNamedItem("class") &&
        el.attributes.getNamedItem("class")?.value.match(/MsoListParagraph/g)
    ) {
        const level = el.attributes
            ?.getNamedItem("style")
            ?.value.match(/level(\d+)/)?.[1];
        el.setAttribute("class", "done"); // we set this attribute to avoid getting stuck in an infinite loop
        el.setAttribute("style", level ?? "1");
        siblings.push(el);
        if (el) {
            el = el.nextElementSibling as Element;
        }
    }

    return siblings;
};

export const getListType = (el: Element) => {
    const val = el.textContent[0];
    const regex = /^\d+$/;
    return regex.test(val) ? "OL" : "UL";
};

export const getTextFromList = (el: Element) => {
    const children = Array.from(el.childNodes);
    const result = [];
    result.push(childred[children.length - 1]);
    return result;
};

export const deserializeList = (el: Element) => {
    const siblings = getSiblings(el);
    const type = getListType(el);
    const list_wrapper = document.createElement(type);
    for (let i = 0; i < siblings.length; i++) {
        const listElement = document.createElement("li");
        const sibling = siblings[i].innerText.replace(/[^a-zA-Z ]/g, "");
        siblings[i].classList.add("done");
        listElement.append(sibling);
        list_wrapper.appendChild(listElement);
    }

    return list_wrapper;
};
