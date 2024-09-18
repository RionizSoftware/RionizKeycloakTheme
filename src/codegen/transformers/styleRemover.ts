import ts from "typescript";
import { TransformerFunctions } from "./types.ts";
import { removeAttribute } from "./utility.ts";

// Function to remove `className` attribute from attributes list
export const styleRemoverTransformer: TransformerFunctions = {
    handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
        const updatedAttributes = removeAttribute(
            element.attributes.properties,
            "className"
        );
        const newElement = ts.factory.updateJsxSelfClosingElement(
            element,
            element.tagName,
            element.typeArguments,
            ts.factory.createJsxAttributes(updatedAttributes)
        );
        return newElement;
    },
    handleJsxElement: (element: ts.JsxElement): ts.Node => {
        const updatedAttributes = removeAttribute(
            element.openingElement.attributes.properties,
            "className"
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
