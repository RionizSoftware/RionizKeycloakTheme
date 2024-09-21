import ts from "typescript";
import { HistoryOperationType, TransformerFunctions } from "./types.ts";
import { createStringAttributeForTag, getAttributeValue } from "./utility.ts";
import { TransformerHistory } from "../TransformerHistory.ts";

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
        handleSelfClosingElement: (node: ts.JsxSelfClosingElement): ts.Node => {
            const tagName = node.tagName.getText();
            for (const {
                elementToReplace,
                replacement,
                extraAttribute
            } of replacements) {
                if (tagName === elementToReplace) {
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
                        tagName,
                        node,
                        newNode
                    );
                    return newNode;
                }
            }
            return node;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (node: ts.JsxElement): ts.Node => {
            const openingElement = node.openingElement;
            const closingElement = node.closingElement;
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
            }
            return node;
        }
    };
};
