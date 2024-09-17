import * as path from "node:path";
import * as fs from "node:fs";
import ts, { SourceFile, TransformerFactory } from "typescript";
import prettier from "prettier";
import { rionizTransformer } from "./transformers/rionizCodeTransform.ts";
import { styleRemoverTransformer } from "./transformers/styleRemover.ts";
import { divOptimizerTransformer } from "./transformers/divOptimizer.ts";
import { tagReplacerTransformer } from "./transformers/tagReplacer.ts";

const transformTemplateToMaterialUiFormat = async (
    content: string,
    transformerInput: TransformerFactory<SourceFile>,
    reIterateCount: number = 1
): Promise<string> => {
    // let content = ``;

    for (let i = 0; i < reIterateCount; i += 1) {
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
        content = printer.printFile(transformedSourceFile);
    }

    return content;
};
//Remove unused variable and imports
const runPrettier = async (content: string): Promise<string> => {
    // Run Prettier for formatting
    return await prettier.format(content, {
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
};

(async (): Promise<void> => {
    const pagesLocation = path.resolve(process.cwd(), "./transformerInputs");
    const outputLocation = path.resolve(process.cwd(), "./src/login/outputs");
    if (!fs.existsSync(outputLocation)) fs.mkdirSync(outputLocation);
    try {
        const files = fs.readdirSync(pagesLocation);
        for (const file of files) {
            const filePath = path.join(pagesLocation, file);
            let content = fs.readFileSync(filePath, "utf-8");

            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    styleRemoverTransformer
                ) as TransformerFactory<SourceFile>
            );
            //remove empty consecutive div and tags and just keep 1
            //Do this 8 times means that it can handle upto 8 of this empty consecutive tags (one at each time)
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    divOptimizerTransformer
                ) as TransformerFactory<SourceFile>,
                8
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("div", "Box")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("button", "Button")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("a", "Link")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("input", "TextField")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("label", "FormLabel")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await runPrettier(content);
            fs.writeFileSync(path.resolve(outputLocation, file), content);
            //break;
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
