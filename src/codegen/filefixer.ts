import * as path from "node:path";
import * as fs from "node:fs";
import * as ts from "typescript";

const removeStyles = async (content: string): Promise<string> => {
    return content.replace(/className\s*=\s*{[^}]+}|className\s*=\s*"[^"]+"/g, "");
};
const replaceDuplicatedDivs = async (code: string): Promise<void> => {
    const sourceFile = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.ESNext);
    console.log(sourceFile);
};
(async (): Promise<void> => {
    const pagesLocation = path.resolve(process.cwd(), "./inputs");
    const outputLocation = path.resolve(process.cwd(), "./src/login/outputs");
    if (!fs.existsSync(outputLocation)) fs.mkdirSync(outputLocation);
    try {
        const files = fs.readdirSync(pagesLocation);
        for (const file of files) {
            const filePath = path.join(pagesLocation, file);
            const content = fs.readFileSync(filePath, "utf-8");

            // content = await removeStyles(content);
            await replaceDuplicatedDivs(filePath);
            fs.writeFileSync(path.resolve(outputLocation, file), content);
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
