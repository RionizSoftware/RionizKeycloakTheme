import ts from "typescript";

export type TransformerFunctions = {
    handleSelfClosingElement: (element: ts.JsxSelfClosingElement) => ts.Node;
    handleJsxElement: (element: ts.JsxElement) => ts.Node;
};
