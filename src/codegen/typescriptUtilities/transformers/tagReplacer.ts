import ts from "typescript";
import { HistoryOperationType, TransformerFunctions } from "./types.ts";
import { createStringAttributeForTag, getAttributeValue } from "./utility.ts";
import { TransformerHistory } from "../TransformerHistory.ts";

export type TagReplacerInputType = {
    elementToReplace: string;
    elementToReplaceProperties?: Record<string, string>;
    replacement: string;
    extraAttribute?: Record<string, string | boolean>;
};
export const tagReplacerTransformer = (
    replacements: TagReplacerInputType[]
): TransformerFunctions => {
    const createAttributes = (
        extraAttribute: Record<string, string | boolean>
    ): ts.JsxAttribute[] => {
        const attributes: ts.JsxAttribute[] = [];
        if (!extraAttribute) return [];
        for (const attributeKey in extraAttribute) {
            if (Object.prototype.hasOwnProperty.call(extraAttribute, attributeKey)) {
                attributes.push(
                    createStringAttributeForTag(
                        attributeKey,
                        extraAttribute[attributeKey]
                    )
                );
            }
        }
        return attributes;
    };
    const getReplacementIfTagExistInReplacementInputs = (
        node: ts.JsxSelfClosingElement | ts.JsxElement
    ): TagReplacerInputType | null => {
        const tagName = ts.isJsxSelfClosingElement(node)
            ? node.tagName.getText()
            : node.openingElement.tagName.getText();
        for (const replacementInput of replacements) {
            const { elementToReplace, elementToReplaceProperties } = replacementInput;
            ///Check tag name for replace is correct
            if (tagName === elementToReplace) {
                let hasAttrToCheck = false;
                for (const attrKeyToCheck in elementToReplaceProperties) {
                    hasAttrToCheck = true;
                    if (
                        Object.prototype.hasOwnProperty.call(
                            elementToReplaceProperties,
                            attrKeyToCheck
                        )
                    ) {
                        // check if it has attributes passed in e.g type="submit"
                        const attrValueToCheck =
                            elementToReplaceProperties[attrKeyToCheck];
                        const attrValue = getAttributeValue(node, attrKeyToCheck);
                        if (attrValue === attrValueToCheck) {
                            //Check if it doesn't have hidden attribute
                            const hiddenValue = getAttributeValue(node, "type");
                            if (hiddenValue !== "hidden") {
                                return replacementInput;
                            }
                        }
                    }
                }
                //If there is no attribute passed to check return element
                if (!hasAttrToCheck) {
                    const hiddenValue = getAttributeValue(node, "type");
                    if (hiddenValue !== "hidden") {
                        return replacementInput;
                    }
                }
            }
        }
        return null;
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (node: ts.JsxSelfClosingElement): ts.Node => {
            const replacementInput = getReplacementIfTagExistInReplacementInputs(node);
            if (replacementInput) {
                const { replacement, extraAttribute } = replacementInput;
                const newNode = ts.factory.updateJsxSelfClosingElement(
                    node,
                    ts.factory.createIdentifier(replacement),
                    node.typeArguments,
                    extraAttribute
                        ? ts.factory.createJsxAttributes([
                              ...node.attributes.properties,
                              ...createAttributes(extraAttribute)
                          ])
                        : node.attributes
                );

                TransformerHistory.addHistoryState(
                    HistoryOperationType.TagReplaced,
                    getAttributeValue(node, "id"),
                    node.tagName.getText(),
                    node,
                    newNode
                );
                return newNode;
            }
            return node;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (node: ts.JsxElement): ts.Node => {
            const openingElement = node.openingElement;
            const closingElement = node.closingElement;
            const openingElementTag = openingElement.tagName.getText();

            const replacementInput = getReplacementIfTagExistInReplacementInputs(node);

            if (replacementInput) {
                const { replacement, extraAttribute } = replacementInput;

                // Create new opening and closing tags with Box
                const newOpeningElement = ts.factory.updateJsxOpeningElement(
                    openingElement,
                    ts.factory.createIdentifier(replacement),
                    node.openingElement.typeArguments,
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

                const newNode = ts.factory.updateJsxElement(
                    node,
                    newOpeningElement,
                    node.children,
                    newClosingElement
                );
                TransformerHistory.addHistoryState(
                    HistoryOperationType.TagReplaced,
                    getAttributeValue(node, "id"),
                    openingElementTag,
                    node,
                    newNode
                );
                return newNode;
            }
            return node;
        }
    };
};
