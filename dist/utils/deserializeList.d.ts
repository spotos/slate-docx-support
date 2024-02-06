export declare const getSiblings: (el: Element) => any[];
export declare const getListType: (el: Element) => "OL" | "UL";
export declare const getTextFromList: (el: Element) => any[];
export declare const deserializeList: (el: Element) => {
    list: HTMLElement;
    siblings: any[];
};
