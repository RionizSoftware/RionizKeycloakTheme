import * as path from "node:path";
import * as fs from "node:fs";
import ts, { SourceFile, TransformerFactory } from "typescript";
import prettier from "prettier";
import { rionizTransformer } from "./rionizCodeTransform.ts";
import { styleRemoverTransformer } from "./transformers/styleRemover.ts";
import { divOptimizerTransformer } from "./transformers/divOptimizer.ts";
import { tagReplacerTransformer } from "./transformers/tagReplacer.ts";
import { sxAdderTransformer } from "./transformers/sxAdder.ts";
import { MuiAddImportTransformer } from "./transformers/muImportAdder.ts";

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

const makeStyleFile = (content: string, outputLocation: string) => {
    // Regular expression to find all sx={...} matches.
    const regex = /sx=\{styles\.([a-zA-Z0-9_]+)\}/g;

    let match;
    const styles: { [key: string]: {} } = {};

    // Iterate over all matches and build the styles object.
    while ((match = regex.exec(content)) !== null) {
        const key = match[1]; // Get the captured group (e.g., Box_3, Box_4)
        styles[key] = {}; // Initialize an empty object for each matched style
    }

    const styleContent = `export const styles =${JSON.stringify(styles, null, 4)}`;
    fs.writeFileSync(outputLocation, styleContent);
};

(async (): Promise<void> => {
    const pagesLocation = path.resolve(process.cwd(), "./transformerInputs");
    const outputLocation = path.resolve(process.cwd(), "./transformerOutputs");
    const stylesLocation = path.resolve(outputLocation, "./styles");
    if (!fs.existsSync(outputLocation)) fs.mkdirSync(outputLocation);
    if (!fs.existsSync(stylesLocation)) fs.mkdirSync(stylesLocation);
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
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("p", "Typography")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("Fragment", "Box")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("Fragment", "Box")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("ul", "List")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("li", "ListItem")
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("form", "Box", [
                        {
                            name: "component",
                            value: "form"
                        }
                    ])
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("h2", "Typography", [
                        {
                            name: "variant",
                            value: "h2"
                        },
                        {
                            name: "component",
                            value: "h2"
                        }
                    ])
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    tagReplacerTransformer("h1", "Typography", [
                        {
                            name: "variant",
                            value: "h1"
                        },
                        {
                            name: "component",
                            value: "h1"
                        }
                    ])
                ) as TransformerFactory<SourceFile>,
                1
            );
            const imports = [
                "Box",
                "Button",
                "Link",
                "TextField",
                "FormLabel",
                "Typography",
                "List",
                "ListItem"
            ];
            //Add all MUI imports
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    MuiAddImportTransformer(imports, "@mui/material")
                ) as TransformerFactory<SourceFile>,
                1
            );

            //Add import { styles } from "./styles/Login.ts";
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    MuiAddImportTransformer(
                        ["styles"],
                        `./styles/${file.replace("tsx", "ts")}`
                    )
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await transformTemplateToMaterialUiFormat(
                content,
                rionizTransformer(
                    sxAdderTransformer(imports)
                ) as TransformerFactory<SourceFile>,
                1
            );
            content = await runPrettier(content);
            fs.writeFileSync(path.resolve(outputLocation, file), content);

            //e.g make ./styles/Login.ts
            makeStyleFile(
                content,
                path.resolve(stylesLocation, "./", file.replace("tsx", "ts"))
            );
            fs.writeFileSync(path.resolve(outputLocation, file), content);
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
