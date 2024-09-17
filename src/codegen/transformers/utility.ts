import ts from "typescript";

//Create attribute for a tag e.g. <tag name="value" />
export const createStringAttributeForTag = (name: string, value: string) => {
    return ts.factory.createJsxAttribute(
        ts.factory.createIdentifier(name),
        ts.factory.createStringLiteral(value)
    );
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

export const removeAttribute = (
    attributes: ts.NodeArray<ts.JsxAttribute | ts.JsxSpreadAttribute>,
    attributeName: string
): ts.JsxAttribute[] =>
    attributes.filter(attr => {
        if (ts.isJsxAttribute(attr)) {
            return attr.name.getText() !== attributeName;
        }
        return true;
    }) as ts.JsxAttribute[];
