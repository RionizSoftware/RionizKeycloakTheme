import ts from "typescript";
import { TransformerFunctions } from "./types.ts";

export const addImports = (
    sourceFile: ts.Node,
    identifiers: string[],
    importLocation: string
): ts.Node => {
    let hasImport = false;
    if (ts.isSourceFile(sourceFile)) {
        // Check existing imports and set the flag if `Box` import is found
        const updatedStatements = sourceFile.statements.map(statement => {
            if (
                ts.isImportDeclaration(statement) &&
                ts.isStringLiteral(statement.moduleSpecifier)
            ) {
                if (statement.moduleSpecifier.text === importLocation) {
                    hasImport = true;
                    // if (
                    //     statement.importClause &&
                    //     statement.importClause.namedBindings &&
                    //     ts.isNamedImports(statement.importClause.namedBindings)
                    // ) {
                    //     if (
                    //         statement.importClause.namedBindings.elements.some(
                    //             element => {
                    //                 return element.name.text === identifier;
                    //             }
                    //         )
                    //     ) {
                    //         hasImport = true;
                    //     }
                    // }
                }
            }
            return statement;
        });

        // Prepend the Box import at the beginning if it's missing
        if (!hasImport) {
            const lastImportIndex = sourceFile.statements.findIndex(
                stmt => !ts.isImportDeclaration(stmt)
            );
            const imports = createImportDeclaration(identifiers, importLocation);
            //Add new import after other imports
            sourceFile = ts.factory.updateSourceFile(sourceFile, [
                ...updatedStatements.slice(0, lastImportIndex),
                imports,
                ...updatedStatements.slice(lastImportIndex)
            ]);
        }
    }
    return sourceFile;
};

function createImportDeclaration(identifiers: string[], importLocation: string) {
    return ts.factory.createImportDeclaration(
        undefined, // decorators (none in this case)
        ts.factory.createImportClause(
            false, // not a type-only import
            undefined, // no default import
            ts.factory.createNamedImports(
                identifiers.map(identifier =>
                    ts.factory.createImportSpecifier(
                        false, // not a type-only import
                        undefined, // no alias
                        ts.factory.createIdentifier(identifier) // named import
                    )
                )
            )
        ),
        ts.factory.createStringLiteral(importLocation) // module specifier
    );
}

export const MuiAddImportTransformer = (
    imports: string[],
    importLocation: string
): TransformerFunctions => {
    return {
        addImports: (sourceFile: ts.Node): ts.Node => {
            return addImports(sourceFile, imports, importLocation);
        }
    };
};
