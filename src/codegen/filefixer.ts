import * as path from "node:path";
import * as fs from "node:fs";

const removeStyles = async (content: string): Promise<string> => {
    return content.replace(/className={\S+}/, "");
};
(async (): Promise<void> => {
    const pagesLocation = path.resolve(process.cwd(), "./inputs");
    const outputLocation = path.resolve(process.cwd(), "./src/login/outputs");
    if (!fs.existsSync(outputLocation)) fs.mkdirSync(outputLocation);
    try {
        const files = fs.readdirSync(pagesLocation);
        for (const file of files) {
            const filePath = path.join(pagesLocation, file);
            let content = fs.readFileSync(filePath, "utf-8");

            content = await removeStyles(content);
            console.log(`Content of ${file}:\n${content}`);

            fs.writeFileSync(path.resolve(outputLocation, file), content);
        }
    } catch (err) {
        console.error("Error reading files:", err);
    }
})();
