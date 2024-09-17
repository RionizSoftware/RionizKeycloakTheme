import ts, { SyntaxKind } from "typescript";
import { TransformerFunctions } from "./types.ts";
import {
    createStringAttributeForTag,
    createSxForTag,
    removeAttribute
} from "./utility.ts";

export const sxAdderTransformer = (materialTagsInUse: string[]): TransformerFunctions => {
    const tagsCount: Map<string, number> = new Map<string, number>();

    const isMaterialUiTag = (tag: string) => {
        return materialTagsInUse.includes(tag);
    };
    return {
        // Handle self-closing JSX elements
        handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
            return element;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const openingElementTag = element.openingElement.tagName.getText();
            const tagCount = tagsCount.get(openingElementTag) || 0;
            const tagId = `${openingElementTag}_${tagCount + 1}`;
            tagsCount.set(openingElementTag, tagCount + 1);
            let sxAttribute: ts.JsxAttribute | undefined;
            let idAttribute: ts.JsxAttribute | undefined;
            const attributes = element.openingElement.attributes.properties;
            if (isMaterialUiTag(openingElementTag)) {
                //assign a new id to element

                idAttribute = createStringAttributeForTag("id", tagId);
                sxAttribute = createSxForTag(tagId);
            }
            if (sxAttribute && idAttribute) {
                const newOpeningElement = ts.factory.updateJsxOpeningElement(
                    element.openingElement,
                    element.openingElement.tagName,
                    element.openingElement.typeArguments,
                    ts.factory.createJsxAttributes([
                        ...removeAttribute(attributes, "id"),
                        idAttribute,
                        sxAttribute
                    ])
                );

                const updatedElement = ts.factory.updateJsxElement(
                    element,
                    newOpeningElement,
                    element.children,
                    element.closingElement
                );

                return updatedElement;
            }
            return element;
        }
    };
};
