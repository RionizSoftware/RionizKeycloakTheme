import ts, { isJsxElement } from "typescript";
import { HistoryOperationType, TransformerFunctions } from "./types.ts";
import { TransformerHistory } from "../TransformerHistory.ts";
import { getAttributeValue, getTagName } from "./utility.ts";

// Helper function to check if a div has only an id attribute
const isDivOrSpanWithNoClass = (
    element: ts.JsxElement | ts.JsxSelfClosingElement
): boolean => {
    const { tagName, attributes } = ts.isJsxElement(element)
        ? element.openingElement
        : element;
    if (ts.isIdentifier(tagName) && (tagName.text === "div" || tagName.text === "span")) {
        return (
            attributes.properties.length == 0 ||
            (attributes.properties.length === 1 &&
                ts.isJsxAttribute(attributes.properties[0]) &&
                attributes.properties[0].name.getText() === "id")
        );
    }
    return false;
};
export const divOptimizerTransformer: TransformerFunctions = {
    handleSelfClosingElement: (node: ts.JsxSelfClosingElement): ts.Node | undefined => {
        if (isDivOrSpanWithNoClass(node)) {
            TransformerHistory.addHistoryState(
                HistoryOperationType.OptimizedAndRemoved,
                getAttributeValue(node, "id"),
                getTagName(node),
                node
            );
            return undefined;
        }
        return node;
    },
    handleJsxElement: (node: ts.JsxElement): ts.Node => {
        if (node.children.length == 0) {
            return node;
        }
        const optimizedChildren: ts.JsxChild[] = [];

        if (isDivOrSpanWithNoClass(node)) {
            let shouldKeepSearching = true;
            for (const child of node.children) {
                if (shouldKeepSearching && isJsxElement(child)) {
                    if (isDivOrSpanWithNoClass(child)) {
                        //Removing the tag
                        // add children of this child instead of the element itself
                        optimizedChildren.push(...child.children);
                        TransformerHistory.addHistoryState(
                            HistoryOperationType.OptimizedAndRemoved,
                            getAttributeValue(child, "id"),
                            getTagName(child),
                            child
                        );
                    } else {
                        optimizedChildren.push(child);
                    }
                    shouldKeepSearching = false;
                } else {
                    optimizedChildren.push(child);
                }
            }
        } else {
            optimizedChildren.push(...node.children);
        }

        return ts.factory.updateJsxElement(
            node,
            node.openingElement,
            optimizedChildren,
            node.closingElement
        );
    }
};
