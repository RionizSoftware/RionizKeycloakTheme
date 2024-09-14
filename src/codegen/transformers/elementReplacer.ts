import ts from "typescript";
import { TransformerFunctions } from "./types.ts";

export const elementReplacerTransformer: TransformerFunctions = {
    // Handle self-closing JSX elements (though <div> typically isn't self-closing)
    handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
        if (element.tagName.getText() === "div") {
            const updatedElement = ts.factory.updateJsxSelfClosingElement(
                element,
                ts.factory.createIdentifier("Box"),
                element.typeArguments,
                element.attributes
            );
            return updatedElement;
        }
        return element;
    },

    // Handle regular JSX elements like <div>...</div>
    handleJsxElement: (element: ts.JsxElement): ts.Node => {
        const openingElement = element.openingElement.tagName.getText();

        if (openingElement === "div") {
            // Create new opening and closing tags with Box
            const newOpeningElement = ts.factory.updateJsxOpeningElement(
                element.openingElement,
                ts.factory.createIdentifier("Box"),
                element.openingElement.typeArguments,
                element.openingElement.attributes
            );

            const newClosingElement = ts.factory.updateJsxClosingElement(
                element.closingElement,
                ts.factory.createIdentifier("Box")
            );

            // Return a new JSX element with <Box> instead of <div>
            const updatedElement = ts.factory.updateJsxElement(
                element,
                newOpeningElement,
                element.children,
                newClosingElement
            );

            return updatedElement;
        }

        return element;
    }
};
