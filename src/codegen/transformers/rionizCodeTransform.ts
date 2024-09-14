import ts from "typescript";
import { TransformerFunctions } from "./types.ts";

export const rionizTransformer =
    (transformerFunctions: TransformerFunctions) =>
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
        // Helper function to handle visiting each node
        const visit = (sourceFile: ts.Node): ts.Node =>
            ts.visitEachChild(sourceFile, node => convertNode(node), context);

        // Helper function to handle node conversion
        const convertNode = (node: ts.Node): ts.Node =>
            ts.visitEachChild(node, visitChild, context);

        // Helper function to handle child nodes
        const visitChild = (child: ts.Node): ts.Node | undefined => {
            if (ts.isJsxSelfClosingElement(child)) {
                const newChild = transformerFunctions.handleSelfClosingElement(child);
                return ts.visitEachChild(newChild, visitChild, context);
            }
            if (ts.isJsxElement(child)) {
                const newChild = transformerFunctions.handleJsxElement(child);
                return ts.visitEachChild(newChild, visitChild, context);
            }
            return ts.visitEachChild(child, visitChild, context);
        };

        return ts.visitNode(rootNode, visit);
    };
