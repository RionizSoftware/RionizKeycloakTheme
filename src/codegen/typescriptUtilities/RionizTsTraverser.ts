import ts from "typescript";
import { TraverserFunctions } from "./transformers/types.ts";

export const rionizTsTraverser = (
    node: ts.Node,
    traverserFunction: TraverserFunctions
): void => {
    if (traverserFunction.handleSelfClosingElement && ts.isJsxSelfClosingElement(node)) {
        traverserFunction.handleSelfClosingElement(node);
    }
    if (traverserFunction.handleJsxElement && ts.isJsxElement(node)) {
        traverserFunction.handleJsxElement(node);
    }
    node.forEachChild(child => rionizTsTraverser(child, traverserFunction));
};
