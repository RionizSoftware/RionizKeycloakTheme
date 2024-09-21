import ts from "typescript";
import { TransformerFunctions } from "./types.ts";
import { createStringAttributeForTag, getAttributeValue } from "./utility.ts";

//Id is necessary for history so we add id to all missing components
export const addIdToAllTransformer = (fileName: string): TransformerFunctions => {
    const tagsCount: Map<string, number> = new Map<string, number>();

    const addId = (
        element: ts.JsxElement | ts.JsxSelfClosingElement
    ): ts.JsxAttributes => {
        const tag = ts.isJsxElement(element)
                ? element.openingElement.tagName.getText()
                : element.tagName.getText(),
            tagCount = tagsCount.get(tag) || 0,
            tagId = `${fileName}_${tag}_${tagCount + 1}`;

        tagsCount.set(tag, tagCount + 1);

        let idAttribute: ts.JsxAttribute | undefined;
        const attributes = ts.isJsxElement(element)
            ? element.openingElement.attributes
            : element.attributes;

        const properties = attributes.properties;
        const id = getAttributeValue(properties, "id");
        if (!id) {
            //assign a new id to element
            idAttribute = createStringAttributeForTag("id", tagId);
        }
        return idAttribute ? ts.factory.createJsxAttributes([idAttribute]) : attributes;
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
            const attributes = addId(element);
            return ts.factory.updateJsxSelfClosingElement(
                element,
                element.tagName,
                element.typeArguments,
                attributes
            );
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const attributes = addId(element);
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
