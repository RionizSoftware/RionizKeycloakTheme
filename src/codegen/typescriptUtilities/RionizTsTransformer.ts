import ts from "typescript";
import { TransformerFunctions } from "./transformers/types.ts";

export const rionizTsTransformer =
    (transformerFunctions: TransformerFunctions) =>
    <T extends ts.Node>(context: ts.TransformationContext) =>
    (rootNode: T) => {
        const visit = (sourceFile: ts.Node): ts.Node => {
            if (transformerFunctions.addImports) {
                sourceFile = transformerFunctions.addImports(sourceFile);
            }
            return ts.visitEachChild(sourceFile, node => convertNode(node), context);
        };

        // Helper function to handle node conversion
        const convertNode = (node: ts.Node): ts.Node => {
            return ts.visitEachChild(node, visitChild, context);
        };

        // Helper function to handle child nodes
        const visitChild = (child: ts.Node): ts.Node | undefined => {
            if (ts.isJsxSelfClosingElement(child)) {
                const newChild = transformerFunctions.handleSelfClosingElement
                    ? transformerFunctions.handleSelfClosingElement(child)
                    : child;
                return ts.visitEachChild(newChild, visitChild, context);
            }
            if (ts.isJsxElement(child)) {
                const newChild = transformerFunctions.handleJsxElement
                    ? transformerFunctions.handleJsxElement(child)
                    : child;
                return ts.visitEachChild(newChild, visitChild, context);
            }
            return ts.visitEachChild(child, visitChild, context);
        };

        return ts.visitNode(rootNode, visit);
    };
