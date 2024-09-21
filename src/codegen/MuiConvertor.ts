import * as path from "node:path";
import * as fs from "node:fs";
import ts, { SourceFile, TransformerFactory } from "typescript";
import prettier from "prettier";
import { rionizTsTransformer } from "./typescriptUtilities/RionizTsTransformer.ts";
import { styleRemoverTransformer } from "./typescriptUtilities/transformers/styleRemover.ts";
import { divOptimizerTransformer } from "./typescriptUtilities/transformers/divOptimizer.ts";
import { tagReplacerTransformer } from "./typescriptUtilities/transformers/tagReplacer.ts";
import { sxAdderTransformer } from "./typescriptUtilities/transformers/sxAdder.ts";
import { MuiAddImportTransformer } from "./typescriptUtilities/transformers/muImportAdder.ts";
import { createTsSourceFile } from "./typescriptUtilities/transformers/utility.ts";
import { addIdToAllTransformer } from "./typescriptUtilities/transformers/addIdToAll.ts";
import { TransformerHistory } from "./typescriptUtilities/TransformerHistory.ts";

const transformTemplateToMaterialUiFormat = async (
    content: string,
    transformerInputs: TransformerFactory<SourceFile>[]
): Promise<string> => {
    // let content = ``;

    const sourceFile = createTsSourceFile(content);
    const result = ts.transform(sourceFile, transformerInputs);
    const printer = ts.createPrinter();
    const transformedSourceFile = result.transformed[0] as ts.SourceFile;
    content = printer.printFile(transformedSourceFile);

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
    const styles: { [key: string]: object } = {};

    // Iterate over all matches and build the styles object.
    while ((match = regex.exec(content)) !== null) {
        const key = match[1]; // Get the captured group (e.g., Box_3, Box_4)
        styles[key] = {}; // Initialize an empty object for each matched style
    }

    const styleContent = `export const styles =${JSON.stringify(styles, null, 4)}`;
    fs.writeFileSync(outputLocation, styleContent);
};

const getVersionFromTerminal = (): string => {
    // Get all command-line arguments, excluding the first two
    const args = process.argv.slice(2);

    // Find the --version argument
    const versionIndex = args.indexOf("--version");

    if (versionIndex !== -1 && args[versionIndex + 1]) {
        return args[versionIndex + 1];
    } else {
        throw new Error("Version not provided");
    }
};
(async (): Promise<void> => {
    const version = getVersionFromTerminal();
    const inputsLocation = path.resolve(
        process.cwd(),
        "./ejectPageFiles/inputs",
        `./v${version}`
    );
    const pagesLocation = path.resolve(inputsLocation, "./pages");
    const outputLocation = path.resolve(
        process.cwd(),
        "./ejectPageFiles/outputs",
        `./v${version}`
    );
    const pagesOutputLocation = path.resolve(outputLocation, "./transformerOutputs");
    const stylesLocation = path.resolve(pagesOutputLocation, "./styles");
    const historyLocation = path.resolve(pagesOutputLocation, "./history");
    if (!fs.existsSync(pagesOutputLocation))
        fs.mkdirSync(pagesOutputLocation, { recursive: true });
    if (!fs.existsSync(stylesLocation)) fs.mkdirSync(stylesLocation, { recursive: true });
    if (!fs.existsSync(historyLocation))
        fs.mkdirSync(historyLocation, { recursive: true });
    fs.copyFileSync(
        path.resolve(inputsLocation, "./KcPage.tsx"),
        path.resolve(outputLocation, "./KcPage.tsx")
    );
    try {
        const files = fs.readdirSync(pagesLocation);
        for (const file of files) {
            const fileNameWithNoExtension = file.split(".")[0];
            const filePath = path.join(pagesLocation, file);
            let content = fs.readFileSync(filePath, "utf-8");

            const addIdToAll = rionizTsTransformer(
                addIdToAllTransformer(fileNameWithNoExtension)
            ) as TransformerFactory<SourceFile>;
            const styleRemover = rionizTsTransformer(
                styleRemoverTransformer
            ) as TransformerFactory<SourceFile>;
            const divOptimizer = rionizTsTransformer(
                divOptimizerTransformer
            ) as TransformerFactory<SourceFile>;
            const tagReplacer = rionizTsTransformer(
                tagReplacerTransformer([
                    {
                        elementToReplace: "div",
                        replacement: "Box",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "button",
                        replacement: "Button",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "a",
                        replacement: "Link",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "input",
                        replacement: "TextField",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "label",
                        replacement: "FormLabel",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "p",
                        replacement: "Typography",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "Fragment",
                        replacement: "Box",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "ul",
                        replacement: "List",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "li",
                        replacement: "ListItem",
                        extraAttribute: undefined
                    },
                    {
                        elementToReplace: "form",
                        replacement: "Box",
                        extraAttribute: [
                            {
                                name: "component",
                                value: "form"
                            }
                        ]
                    },
                    {
                        elementToReplace: "h2",
                        replacement: "Typography",
                        extraAttribute: [
                            {
                                name: "variant",
                                value: "h2"
                            },
                            {
                                name: "component",
                                value: "h2"
                            }
                        ]
                    },
                    {
                        elementToReplace: "h1",
                        replacement: "Typography",
                        extraAttribute: [
                            {
                                name: "variant",
                                value: "h1"
                            },
                            {
                                name: "component",
                                value: "h1"
                            }
                        ]
                    }
                ])
            ) as TransformerFactory<SourceFile>;
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
            const muiImportAdder = rionizTsTransformer(
                MuiAddImportTransformer(imports, "@mui/material")
            ) as TransformerFactory<SourceFile>;
            const styleImportAdder = rionizTsTransformer(
                MuiAddImportTransformer(
                    ["styles"],
                    `./styles/${fileNameWithNoExtension}.ts`
                )
            ) as TransformerFactory<SourceFile>;
            const sxAdder = rionizTsTransformer(
                sxAdderTransformer(fileNameWithNoExtension, imports)
            ) as TransformerFactory<SourceFile>;

            content = await transformTemplateToMaterialUiFormat(content, [addIdToAll]);
            TransformerHistory.initialize(
                content,
                path.resolve(historyLocation, `${fileNameWithNoExtension}.json`)
            );

            content = await transformTemplateToMaterialUiFormat(content, [
                styleRemover,
                //remove empty consecutive div and tags , do it 5 times so that upto 3 div can be removed
                //It can be better in future
                divOptimizer,
                divOptimizer,
                divOptimizer,
                divOptimizer,
                divOptimizer,
                tagReplacer,
                muiImportAdder,
                styleImportAdder
            ]);
            //For some unknown reason we need to run it separately to work
            content = await transformTemplateToMaterialUiFormat(content, [sxAdder]);

            content = await runPrettier(content);
            fs.writeFileSync(path.resolve(pagesOutputLocation, file), content);

            //e.g make ./styles/Login.ts
            makeStyleFile(
                content,
                path.resolve(stylesLocation, "./", `${fileNameWithNoExtension}.ts`)
            );
            fs.writeFileSync(path.resolve(pagesOutputLocation, file), content);
            TransformerHistory.writeHistory();
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
