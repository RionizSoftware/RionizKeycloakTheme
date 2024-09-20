import ts from "typescript";
import { TransformerFunctions } from "./types.ts";
import { createStringAttributeForTag } from "./utility.ts";
export const tagReplacerTransformer = (
    elementToReplace: string,
    replacement: string,
    extraAttribute?: { name: string; value: string }[] | undefined
): TransformerFunctions => {
    const createAttributes = (): ts.JsxAttribute[] => {
        const attributes: ts.JsxAttribute[] = [];
        if (!extraAttribute) return [];
        for (const attribute of extraAttribute) {
            attributes.push(createStringAttributeForTag(attribute.name, attribute.value));
        }
        return attributes;
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
            if (element.tagName.getText() === elementToReplace) {
                const updatedElement = ts.factory.updateJsxSelfClosingElement(
                    element,
                    ts.factory.createIdentifier(replacement),
                    element.typeArguments,
                    extraAttribute
                        ? ts.factory.createJsxAttributes([
                              ...element.attributes.properties,
                              ...createAttributes()
                          ])
                        : element.attributes
                );
                return updatedElement;
            }
            return element;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const openingElement = element.openingElement.tagName.getText();

            if (openingElement === elementToReplace) {
                // Create new opening and closing tags with Box
                const newOpeningElement = ts.factory.updateJsxOpeningElement(
                    element.openingElement,
                    ts.factory.createIdentifier(replacement),
                    element.openingElement.typeArguments,
                    extraAttribute
                        ? ts.factory.createJsxAttributes([
                              ...element.openingElement.attributes.properties,
                              ...createAttributes()
                          ])
                        : element.openingElement.attributes
                );

                const newClosingElement = ts.factory.updateJsxClosingElement(
                    element.closingElement,
                    ts.factory.createIdentifier(replacement)
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
};
