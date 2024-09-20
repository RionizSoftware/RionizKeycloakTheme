import ts from "typescript";
import { TransformerFunctions } from "./types.ts";
import { createStringAttributeForTag } from "./utility.ts";

export type TagReplacerExtraAttributeInput =
    | { name: string; value: string }[]
    | undefined;
export type TagReplacerInputType = {
    elementToReplace: string;
    replacement: string;
    extraAttribute?: TagReplacerExtraAttributeInput;
};
export const tagReplacerTransformer = (
    replacements: TagReplacerInputType[]
): TransformerFunctions => {
    const createAttributes = (
        extraAttribute: TagReplacerExtraAttributeInput
    ): ts.JsxAttribute[] => {
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
            const tagName = element.tagName.getText();
            for (const {
                elementToReplace,
                replacement,
                extraAttribute
            } of replacements) {
                if (tagName === elementToReplace) {
                    return ts.factory.updateJsxSelfClosingElement(
                        element,
                        ts.factory.createIdentifier(replacement),
                        element.typeArguments,
                        extraAttribute
                            ? ts.factory.createJsxAttributes([
                                  ...element.attributes.properties,
                                  ...createAttributes(extraAttribute)
                              ])
                            : element.attributes
                    );
                }
            }
            return element;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const openingElement = element.openingElement;
            const closingElement = element.closingElement;
            const openingElementTag = openingElement.tagName.getText();
            for (const {
                elementToReplace,
                replacement,
                extraAttribute
            } of replacements) {
                if (openingElementTag === elementToReplace) {
                    // Create new opening and closing tags with Box
                    const newOpeningElement = ts.factory.updateJsxOpeningElement(
                        openingElement,
                        ts.factory.createIdentifier(replacement),
                        element.openingElement.typeArguments,
                        extraAttribute
                            ? ts.factory.createJsxAttributes([
                                  ...openingElement.attributes.properties,
                                  ...createAttributes(extraAttribute)
                              ])
                            : openingElement.attributes
                    );

                    const newClosingElement = ts.factory.updateJsxClosingElement(
                        closingElement,
                        ts.factory.createIdentifier(replacement)
                    );

                    return ts.factory.updateJsxElement(
                        element,
                        newOpeningElement,
                        element.children,
                        newClosingElement
                    );
                }
            }
            return element;
        }
    };
};
