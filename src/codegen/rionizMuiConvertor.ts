import * as path from "node:path";
import * as fs from "node:fs";
import ts, { SourceFile, TransformerFactory } from "typescript";
import prettier from "prettier";
import { rionizTransformer } from "./transformers/rionizCodeTransform.ts";
import { styleRemoverTransformer } from "./transformers/styleRemover.ts";

const transformTemplateToMaterialUiFormat = async (
    filePath: string,
    outputPath: string,
    transformerInput: TransformerFactory<SourceFile>
): Promise<void> => {
    const content = fs.readFileSync(filePath, "utf-8");

    const sourceFile = ts.createSourceFile(
        "temp.tsx",
        content,
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    );
    const result = ts.transform(sourceFile, [transformerInput]);

    const printer = ts.createPrinter();
    const transformedSourceFile = result.transformed[0] as ts.SourceFile;
    const transformedCode = printer.printFile(transformedSourceFile);
    const prettifiedCode = await prettier.format(transformedCode, {
        parser: "typescript",
        printWidth: 90,
        tabWidth: 4,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: "none",
        bracketSpacing: true,
        arrowParens: "avoid"
    });
    fs.writeFileSync(outputPath, prettifiedCode);
    console.log("Transformation complete, written to output.tsx");
};
(async (): Promise<void> => {
    const pagesLocation = path.resolve(process.cwd(), "./inputs");
    const outputLocation = path.resolve(process.cwd(), "./src/login/outputs");
    if (!fs.existsSync(outputLocation)) fs.mkdirSync(outputLocation);
    try {
        const files = fs.readdirSync(pagesLocation);
        for (const file of files) {
            const filePath = path.join(pagesLocation, file);

            // content = await removeStyles(content);
            await transformTemplateToMaterialUiFormat(
                filePath,
                path.resolve(outputLocation, file),
                rionizTransformer(
                    styleRemoverTransformer
                ) as TransformerFactory<SourceFile>
            );
            // fs.writeFileSync(path.resolve(outputLocation, file), content);
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
