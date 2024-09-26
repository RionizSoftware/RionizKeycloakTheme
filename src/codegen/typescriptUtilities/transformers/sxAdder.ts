import ts from "typescript";
import { HistoryOperationType, TransformerFunctions } from "./types.ts";
import {
    createStringAttributeForTag,
    createSxForTag,
    getTagName,
    removeAttributes
} from "./utility.ts";
import { TransformerHistory } from "../TransformerHistory.ts";

export const sxAdderTransformer = (
    fileName: string,
    materialTagsInUse: string[]
): TransformerFunctions => {
    const tagsCount: Map<string, number> = new Map<string, number>();

    const isMaterialUiTag = (tag: string) => {
        return materialTagsInUse.includes(tag);
    };

    const addSxAndId = (
        node: ts.JsxElement | ts.JsxSelfClosingElement
    ): { id: string; attributes: ts.JsxAttributes; sxAdded: boolean } => {
        const tag = ts.isJsxElement(node)
            ? node.openingElement.tagName.getText()
            : node.tagName.getText();

        const tagCount = tagsCount.get(tag) || 0;
        const tagId = `${fileName}_${tag}_${tagCount + 1}`;
        tagsCount.set(tag, tagCount + 1);
        let sxAttribute: ts.JsxAttribute | undefined;
        let idAttribute: ts.JsxAttribute | undefined;
        const attributes = ts.isJsxElement(node)
            ? node.openingElement.attributes
            : node.attributes;

        if (isMaterialUiTag(tag)) {
            //assign a new id to element
            idAttribute = createStringAttributeForTag("id", tagId);
            sxAttribute = createSxForTag(tagId);
        }

        const newAttributes =
            sxAttribute && idAttribute
                ? ts.factory.createJsxAttributes([
                      ...removeAttributes(node, ["id"]),
                      idAttribute,
                      sxAttribute
                  ])
                : attributes;
        return {
            id: tagId,
            attributes: newAttributes,
            sxAdded: sxAttribute != undefined && idAttribute != undefined
        };
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (node: ts.JsxSelfClosingElement): ts.Node => {
            const { id, attributes, sxAdded } = addSxAndId(node);
            const newNode = ts.factory.updateJsxSelfClosingElement(
                node,
                node.tagName,
                node.typeArguments,
                attributes
            );
            if (sxAdded) {
                TransformerHistory.addHistoryState(
                    HistoryOperationType.IdChanged,
                    id,
                    getTagName(node),
                    node,
                    newNode
                );
                TransformerHistory.addHistoryState(
                    HistoryOperationType.SxAdded,
                    id,
                    getTagName(node),
                    node,
                    newNode
                );
            }

            return newNode;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (node: ts.JsxElement): ts.Node => {
            const { id, attributes, sxAdded } = addSxAndId(node);
            const newOpeningElement = ts.factory.updateJsxOpeningElement(
                node.openingElement,
                node.openingElement.tagName,
                node.openingElement.typeArguments,
                attributes
            );

            const newNode = ts.factory.updateJsxElement(
                node,
                newOpeningElement,
                node.children,
                node.closingElement
            );
            if (sxAdded) {
                TransformerHistory.addHistoryState(
                    HistoryOperationType.IdChanged,
                    id,
                    getTagName(node),
                    node,
                    newNode
                );
                TransformerHistory.addHistoryState(
                    HistoryOperationType.SxAdded,
                    id,
                    getTagName(node),
                    node,
                    newNode,
                    undefined
                );
            }
            return newNode;
        }
    };
};
