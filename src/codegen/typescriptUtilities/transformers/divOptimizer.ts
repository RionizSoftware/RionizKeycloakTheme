import ts, { isJsxElement } from "typescript";
import { TransformerFunctions } from "./types.ts";

// Helper function to check if a div has only an id attribute
const isDivOrSpanWithNoClass = (element: ts.JsxElement): boolean => {
    const { tagName, attributes } = element.openingElement;
    if (ts.isIdentifier(tagName) && (tagName.text === "div" || tagName.text === "span")) {
        const hasOnlyId =
            attributes.properties.length == 0 ||
            (attributes.properties.length === 1 &&
                ts.isJsxAttribute(attributes.properties[0]) &&
                attributes.properties[0].name.getText() === "id");
        return hasOnlyId;
    }
    return false;
};
const isDivOrSpanWithNoClassSelfClosing = (
    element: ts.JsxSelfClosingElement
): boolean => {
    const { tagName, attributes } = element;
    if (ts.isIdentifier(tagName) && (tagName.text === "div" || tagName.text === "span")) {
        const hasOnlyId =
            attributes.properties.length == 0 ||
            (attributes.properties.length === 1 &&
                ts.isJsxAttribute(attributes.properties[0]) &&
                attributes.properties[0].name.getText() === "id");
        return hasOnlyId;
    }
    return false;
};
export const divOptimizerTransformer: TransformerFunctions = {
    handleSelfClosingElement: (
        element: ts.JsxSelfClosingElement
    ): ts.Node | undefined => {
        if (isDivOrSpanWithNoClassSelfClosing(element)) return undefined;
        return element;
    },
    handleJsxElement: (element: ts.JsxElement): ts.Node => {
        if (element.children.length == 0) {
            return element;
        }
        const optimizedChildren: ts.JsxChild[] = [];

        if (isDivOrSpanWithNoClass(element)) {
            let shouldKeepSearching = true;
            for (const child of element.children) {
                if (shouldKeepSearching && isJsxElement(child)) {
                    if (isDivOrSpanWithNoClass(child)) {
                        //Removing the tag
                        // add children of this child instead of the element itself
                        optimizedChildren.push(...child.children);
                    } else {
                        optimizedChildren.push(child);
                    }
                    shouldKeepSearching = false;
                } else {
                    optimizedChildren.push(child);
                }
            }
        } else {
            optimizedChildren.push(...element.children);
        }

        const updatedElement = ts.factory.updateJsxElement(
            element,
            element.openingElement,
            optimizedChildren,
            element.closingElement
        );
        return updatedElement;
    }
};
