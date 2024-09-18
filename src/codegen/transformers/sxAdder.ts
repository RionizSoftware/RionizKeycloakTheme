import ts from "typescript";
import { TransformerFunctions } from "./types.ts";
import {
    createStringAttributeForTag,
    createSxForTag,
    removeAttribute
} from "./utility.ts";
import { addImports } from "./muImportAdder.ts";

export const sxAdderTransformer = (materialTagsInUse: string[]): TransformerFunctions => {
    const tagsCount: Map<string, number> = new Map<string, number>();

    const isMaterialUiTag = (tag: string) => {
        return materialTagsInUse.includes(tag);
    };

    const addSxAndId = (
        element: ts.JsxElement | ts.JsxSelfClosingElement
    ): ts.JsxAttributes => {
        const tag = ts.isJsxElement(element)
            ? element.openingElement.tagName.getText()
            : element.tagName.getText();

        const tagCount = tagsCount.get(tag) || 0;
        const tagId = `${tag}_${tagCount + 1}`;
        tagsCount.set(tag, tagCount + 1);
        let sxAttribute: ts.JsxAttribute | undefined;
        let idAttribute: ts.JsxAttribute | undefined;
        const attributes = ts.isJsxElement(element)
            ? element.openingElement.attributes
            : element.attributes;

        const properties = attributes.properties;
        if (isMaterialUiTag(tag)) {
            //assign a new id to element
            idAttribute = createStringAttributeForTag("id", tagId);
            sxAttribute = createSxForTag(tagId);
        }
        return sxAttribute && idAttribute
            ? ts.factory.createJsxAttributes([
                  ...removeAttribute(properties, "id"),
                  idAttribute,
                  sxAttribute
              ])
            : attributes;
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
            const attributes = addSxAndId(element);
            return ts.factory.updateJsxSelfClosingElement(
                element,
                element.tagName,
                element.typeArguments,
                attributes
            );
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const attributes = addSxAndId(element);
            const newOpeningElement = ts.factory.updateJsxOpeningElement(
                element.openingElement,
                element.openingElement.tagName,
                element.openingElement.typeArguments,
                attributes
            );

            return ts.factory.updateJsxElement(
                element,
                newOpeningElement,
                element.children,
                element.closingElement
            );
        }
    };
};
