import ts from "typescript";
import { HistoryOperationType, TransformerFunctions } from "./types.ts";
import { getAttributeValue, getTagName, removeAttributes } from "./utility.ts";
import { TransformerHistory } from "../TransformerHistory.ts";

// Function to remove `className` attribute from attributes list
export const styleRemoverTransformer: TransformerFunctions = {
    handleSelfClosingElement: (node: ts.JsxSelfClosingElement): ts.Node => {
        const haveClassName = getAttributeValue(node, "className");
        if (haveClassName) {
            const updatedAttributes = removeAttributes(node, ["className"]);

            const newNode = ts.factory.updateJsxSelfClosingElement(
                node,
                node.tagName,
                node.typeArguments,
                ts.factory.createJsxAttributes(updatedAttributes)
            );
            TransformerHistory.addHistoryState(
                HistoryOperationType.StyleRemoved,
                getAttributeValue(node, "id"),
                getTagName(node),
                node,
                newNode
            );
            return newNode;
        }
        return node;
    },
    handleJsxElement: (node: ts.JsxElement): ts.Node => {
        const haveClassName = getAttributeValue(node, "className");

        if (haveClassName) {
            const updatedAttributes = removeAttributes(node, ["className"]);
            const newOpeningElement = ts.factory.updateJsxOpeningElement(
                node.openingElement,
                node.openingElement.tagName,
                node.openingElement.typeArguments,
                ts.factory.createJsxAttributes(updatedAttributes)
            );
            const newNode = ts.factory.updateJsxElement(
                node,
                newOpeningElement,
                node.children,
                node.closingElement
            );
            TransformerHistory.addHistoryState(
                HistoryOperationType.StyleRemoved,
                getAttributeValue(node, "id"),
                getTagName(node),
                node,
                newNode
            );

            return newNode;
        }
        return node;
    }
};
