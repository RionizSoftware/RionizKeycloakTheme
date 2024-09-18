import ts from "typescript";

export type TransformerFunctions = {
    addImports?: (sourceFile: ts.Node) => ts.Node;
    handleSelfClosingElement?: (element: ts.JsxSelfClosingElement) => ts.Node | undefined;
    handleJsxElement?: (element: ts.JsxElement) => ts.Node;
};
