import ts from "typescript";

export type TransformerFunctions = {
    addImports?: (sourceFile: ts.Node) => ts.Node;
    handleSelfClosingElement?:
        | ((element: ts.JsxSelfClosingElement) => ts.Node)
        | undefined;
    handleJsxElement?: ((element: ts.JsxElement) => ts.Node) | undefined;
};
export type TraverserFunctions = {
    handleSelfClosingElement?: ((element: ts.JsxSelfClosingElement) => void) | undefined;
    handleJsxElement?: ((element: ts.JsxElement) => void) | undefined;
};

export enum HistoryOperationType {
    Loaded = "Loaded",
    IdChanged = "IdChanged",
    TagReplaced = "TagReplaced",
    Removed = "Removed",
    SxAdded = "SxAdded",
    StyleRemoved = "StyleRemoved"
}
export type HistoryState = {
    tag: string;
    currentIndex: number;
    operation: HistoryOperationType;
    props: Record<string, string>;
};
export type HistoryData = {
    historyStates: HistoryState[];
};
