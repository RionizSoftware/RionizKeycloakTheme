// Function to handle self-closing JSX elements
import ts from "typescript";
import { TransformerFunctions } from "./types.ts";

// Function to remove `className` attribute from attributes list
const removeClassNameAttribute = (
    attributes: ts.NodeArray<ts.JsxAttribute | ts.JsxSpreadAttribute>
): ts.JsxAttribute[] =>
    attributes.filter(attr => {
        if (ts.isJsxAttribute(attr)) {
            return attr.name.getText() !== "className";
        }
        return true;
    }) as ts.JsxAttribute[];

export const styleRemoverTransformer: TransformerFunctions = {
    handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
        const updatedAttributes = removeClassNameAttribute(element.attributes.properties);
        const newElement = ts.factory.updateJsxSelfClosingElement(
            element,
            element.tagName,
            element.typeArguments,
            ts.factory.createJsxAttributes(updatedAttributes)
        );
        return newElement;
    },
    handleJsxElement: (element: ts.JsxElement): ts.Node => {
        const updatedAttributes = removeClassNameAttribute(
            element.openingElement.attributes.properties
        );
        const newOpeningElement = ts.factory.updateJsxOpeningElement(
            element.openingElement,
            element.openingElement.tagName,
            element.openingElement.typeArguments,
            ts.factory.createJsxAttributes(updatedAttributes)
        );
        const updatedElement = ts.factory.updateJsxElement(
            element,
            newOpeningElement,
            element.children,
            element.closingElement
        );
        return updatedElement;
    }
};
