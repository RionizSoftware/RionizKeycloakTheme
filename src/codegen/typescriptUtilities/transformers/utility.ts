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

export const getAttributeValue = (
    attributes: ts.NodeArray<ts.JsxAttribute | ts.JsxSpreadAttribute>,
    attributeName: string
): string | null => {
    const founded = attributes.filter(attr => {
        if (ts.isJsxAttribute(attr)) {
            return attr.name.getText() === attributeName;
        }
        return false;
    });
    return founded && founded.length > 0 ? founded[0].getText() : null;
};
export const getAllAttribute = (
    attributes: ts.NodeArray<ts.JsxAttribute | ts.JsxSpreadAttribute>
): Record<string, string> => {
    const attributesStringArray: { name: string; value: string }[] = attributes.map(
        attr => {
            if (ts.isJsxAttribute(attr)) {
                return { name: attr.name.getText(), value: attr.getText() };
            } else {
                return { name: "", value: "" };
            }
        }
    );
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
