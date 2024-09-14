import ts from "typescript";
import { TransformerFunctions } from "./types.ts";

export const AddImport = (
    sourceFile: ts.Node,
    identifier: string,
    importLocation: string
) => {
    let hasImport = false;
    if (ts.isSourceFile(sourceFile)) {
        // Check existing imports and set the flag if `Box` import is found

        const updatedStatements = sourceFile.statements.map(statement => {
            if (
                ts.isImportDeclaration(statement) &&
                ts.isStringLiteral(statement.moduleSpecifier)
            ) {
                if (statement.moduleSpecifier.text === importLocation) {
                    if (
                        statement.importClause &&
                        statement.importClause.namedBindings &&
                        ts.isNamedImports(statement.importClause.namedBindings)
                    ) {
                        if (
                            statement.importClause.namedBindings.elements.some(
                                element => {
                                    return element.name.text === identifier;
                                }
                            )
                        ) {
                            hasImport = true;
                        }
                    }
                }
            }
            return statement;
        });

        // Prepend the Box import at the beginning if it's missing
        if (!hasImport) {
            const boxImport = createImportDeclaration("Box", "@mui/material");
            sourceFile = ts.factory.updateSourceFile(
                sourceFile,
                [boxImport, ...updatedStatements] // Prepend the Box import
            );
        }
    }
    return sourceFile;
};

function createImportDeclaration(identifier: string, importLocation: string) {
    return ts.factory.createImportDeclaration(
        undefined, // decorators (none in this case)
        ts.factory.createImportClause(
            false, // not a type-only import
            undefined, // no default import
            ts.factory.createNamedImports([
                ts.factory.createImportSpecifier(
                    false, // not a type-only import
                    undefined, // no alias
                    ts.factory.createIdentifier(identifier) // named import
                )
            ])
        ),
        ts.factory.createStringLiteral(importLocation) // module specifier
    );
}

export const tagReplacerTransformer = (
    elementToReplace: string,
    replacement: string
): TransformerFunctions => {
    return {
        // Handle self-closing JSX elements (though <div> typically isn't self-closing)
        handleSelfClosingElement: (element: ts.JsxSelfClosingElement): ts.Node => {
            if (element.tagName.getText() === elementToReplace) {
                const updatedElement = ts.factory.updateJsxSelfClosingElement(
                    element,
                    ts.factory.createIdentifier(replacement),
                    element.typeArguments,
                    element.attributes
                );
                return updatedElement;
            }
            return element;
        },

        // Handle regular JSX elements like <div>...</div>
        handleJsxElement: (element: ts.JsxElement): ts.Node => {
            const openingElement = element.openingElement.tagName.getText();

            if (openingElement === "div") {
                // Create new opening and closing tags with Box
                const newOpeningElement = ts.factory.updateJsxOpeningElement(
                    element.openingElement,
                    ts.factory.createIdentifier(replacement),
                    element.openingElement.typeArguments,
                    element.openingElement.attributes
                );

                const newClosingElement = ts.factory.updateJsxClosingElement(
                    element.closingElement,
                    ts.factory.createIdentifier(replacement)
                );

                // Return a new JSX element with <Box> instead of <div>
                const updatedElement = ts.factory.updateJsxElement(
                    element,
                    newOpeningElement,
                    element.children,
                    newClosingElement
                );

                return updatedElement;
            }

            return element;
        }
    };
};
