import ts, { JsxAttribute } from "typescript";

//Create attribute for a tag e.g. <tag name="value" />
export const createStringAttributeForTag = (
    name: string,
    value: string | boolean
): JsxAttribute => {
    if (typeof value === "string") {
        return ts.factory.createJsxAttribute(
            ts.factory.createIdentifier(name),
            ts.factory.createStringLiteral(value)
        );
    } else {
        return ts.factory.createJsxAttribute(
            ts.factory.createIdentifier(name),
            ts.factory.createJsxExpression(
                undefined,
                value ? ts.factory.createTrue() : ts.factory.createFalse()
            )
        );
    }
};
//Create sx attribute for a tag e.g. <tag sx={styles.value} />
export const createSxForTag = (value: string) => {
    return ts.factory.createJsxAttribute(
        ts.factory.createIdentifier("sx"),
        ts.factory.createJsxExpression(
            undefined, // No dotdotdot token (spread syntax)
            ts.factory.createPropertyAccessExpression(
                ts.factory.createIdentifier("styles"),
                ts.factory.createIdentifier(value)
            )
        )
    );
};

export const removeAttributes = (
    node: ts.JsxElement | ts.JsxSelfClosingElement,
    attributeNames: string[]
): ts.JsxAttribute[] => {
    const attributeProperties = ts.isJsxElement(node)
        ? node.openingElement.attributes.properties
        : node.attributes.properties;

    return attributeProperties.filter(attr => {
        if (ts.isJsxAttribute(attr)) {
            return !attributeNames.includes(attr.name.getText());
        }
        return true;
    }) as ts.JsxAttribute[];
};

export const getTagName = (node: ts.JsxElement | ts.JsxSelfClosingElement) => {
    return ts.isJsxElement(node)
        ? node.openingElement.tagName.getText()
        : node.tagName.getText();
};

export const getAttributeValue = (
    node: ts.JsxElement | ts.JsxSelfClosingElement,
    attributeName: string
): string | null => {
    const attributeProperties = ts.isJsxElement(node)
        ? node.openingElement.attributes.properties
        : node.attributes.properties;

    const founded = attributeProperties.filter(attr => {
        if (ts.isJsxAttribute(attr)) {
            return attr.name.getText() === attributeName;
        }
        return false;
    });
    let value = null;
    if (founded && founded.length > 0) {
        value = founded[0]
            .getText()
            .replace(`${attributeName}=`, "")
            .replace(/^"|"$/g, ""); //replace " at beginning or end of string "id"->id
    }
    return value;
};
export const getAllAttribute = (
    node: ts.JsxElement | ts.JsxSelfClosingElement
): Record<string, string> => {
    const attributeProperties = ts.isJsxElement(node)
        ? node.openingElement.attributes.properties
        : node.attributes.properties;
    const attributesStringArray: { name: string; value: string }[] =
        attributeProperties.map(attr => {
            if (ts.isJsxAttribute(attr)) {
                try {
                    return { name: attr.name.getText(), value: attr.getText() };
                } catch (e) {
                    //fallback method
                    if (ts.isIdentifier(attr.name)) {
                        if (attr.initializer && ts.isStringLiteral(attr.initializer)) {
                            return {
                                name: attr.name.escapedText as string,
                                value: attr.initializer.text
                            };
                        }
                        if (attr.initializer && ts.isJsxExpression(attr.initializer)) {
                            return {
                                name: attr.name.escapedText as string,
                                value: "SX_STYLE_NOT_FETCHED"
                            };
                        }
                    }
                }
                return { name: "", value: "" };
            } else {
                return { name: "", value: "" };
            }
        });
    return attributesStringArray.reduce(
        (acc, item) => {
            acc[item.name] = item.value;
            return acc;
        },
        {} as Record<string, string>
    );
};

export const createTsSourceFile = (content: string): ts.SourceFile => {
    return ts.createSourceFile(
        "temp.tsx",
        content,
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    );
};
