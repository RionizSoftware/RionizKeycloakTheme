import { ArrayKeyMap } from "./ArrayKeyMap.ts";
import ts from "typescript";
import fs from "node:fs";
import {
    HistoryData,
    HistoryOperationType,
    HistoryState,
    TraverserFunctions
} from "./transformers/types.ts";
import { rionizTsTraverser } from "./RionizTsTraverser.ts";
import {
    createTsSourceFile,
    getAllAttribute,
    getAttributeValue
} from "./transformers/utility.ts";

export class TransformerHistory {
    private static historyDatas: ArrayKeyMap<HistoryData> =
        new ArrayKeyMap<HistoryData>();

    private static createHistoryState(
        node: ts.JsxSelfClosingElement | ts.JsxElement,
        index: number
    ) {
        const isJSxElement = ts.isJsxElement(node);
        const historyState: HistoryState = {
            tag: isJSxElement
                ? node.openingElement.tagName.getText()
                : node.tagName.getText(),
            currentIndex: index,
            operation: HistoryOperationType.Loaded,
            props: getAllAttribute(
                isJSxElement
                    ? node.openingElement.attributes.properties
                    : node.attributes.properties
            )
        };

        return historyState;
    }

    private static outputPath: string | undefined;
    public static Initialize(content: string, outputPath: string) {
        TransformerHistory.outputPath = outputPath;
        const sourceFile = createTsSourceFile(content);

        let index = 0;
        const historyInitializerTransform: TraverserFunctions = {
            handleSelfClosingElement: (node: ts.JsxSelfClosingElement) => {
                const id = getAttributeValue(node.attributes.properties, "id");
                if (!id)
                    throw new Error("History can not work unless all element have id");
                TransformerHistory.historyDatas.add(id, {
                    historyStates: [TransformerHistory.createHistoryState(node, index)]
                });
                index += 1;
            },
            handleJsxElement: (node: ts.JsxElement) => {
                const id = getAttributeValue(
                    node.openingElement.attributes.properties,
                    "id"
                );
                if (!id)
                    throw new Error("History can not work unless all element have id");
                TransformerHistory.historyDatas.add(id, {
                    historyStates: [TransformerHistory.createHistoryState(node, index)]
                });
                index += 1;
            }
        };
        rionizTsTraverser(sourceFile, historyInitializerTransform);
        //Traverse through file using a transformer and add all initialized states using ArrayKeyMap
    }
    public static Reset() {
        TransformerHistory.historyDatas.clear();
    }

    public static WriteHistory() {
        if (!TransformerHistory.outputPath) throw new Error("Please initialize first");
        const content = [];
        for (const [tags, data] of TransformerHistory.historyDatas) {
            const historyStates: HistoryState[] = data.historyStates;
            content.push({ tags: Array.from(tags), historyStates: historyStates });
        }
        fs.writeFileSync(TransformerHistory.outputPath, JSON.stringify(content, null, 2));
    }
}
