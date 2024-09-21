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
    getAttributeValue,
    getTagName
} from "./transformers/utility.ts";

export class TransformerHistory {
    private static historyDatas: ArrayKeyMap<HistoryData> =
        new ArrayKeyMap<HistoryData>();

    private static createHistoryState(
        operation: HistoryOperationType,
        tag: string,
        node: ts.JsxSelfClosingElement | ts.JsxElement,
        index?: number | undefined
    ) {
        const historyState: HistoryState = {
            tag: tag,
            currentIndex: index !== undefined ? `${index}` : "NOT_CHANGED",
            operation: operation,
            props: getAllAttribute(node)
        };

        return historyState;
    }

    private static outputPath: string | undefined;

    public static initialize(content: string, outputPath: string) {
        TransformerHistory.reset();
        TransformerHistory.outputPath = outputPath;
        const sourceFile = createTsSourceFile(content);

        let index = 0;
        const historyInitializerTransform: TraverserFunctions = {
            handleSelfClosingElement: (node: ts.JsxSelfClosingElement) => {
                const id = getAttributeValue(node, "id");
                if (!id)
                    throw new Error("History can not work unless all element have id");
                TransformerHistory.historyDatas.add(id, {
                    historyStates: [
                        TransformerHistory.createHistoryState(
                            HistoryOperationType.Loaded,
                            getTagName(node),
                            node,
                            index
                        )
                    ]
                });
                index += 1;
            },
            handleJsxElement: (node: ts.JsxElement) => {
                const id = getAttributeValue(node, "id");
                if (!id)
                    throw new Error("History can not work unless all element have id");
                TransformerHistory.historyDatas.add(id, {
                    historyStates: [
                        TransformerHistory.createHistoryState(
                            HistoryOperationType.Loaded,
                            getTagName(node),
                            node,
                            index
                        )
                    ]
                });
                index += 1;
            }
        };
        rionizTsTraverser(sourceFile, historyInitializerTransform);
        //Traverse through file using a transformer and add all initialized states using ArrayKeyMap
    }

    public static addHistoryState(
        operationType: HistoryOperationType,
        id: string | null,
        tag: string,
        nodeBeforeChange: ts.JsxSelfClosingElement | ts.JsxElement,
        newNode?: ts.JsxSelfClosingElement | ts.JsxElement | undefined,
        index?: number | undefined
    ) {
        if (id === null)
            throw new Error("History can not work unless all element have id");

        if (operationType === HistoryOperationType.IdChanged) {
            if (!newNode) throw new Error("New node can not be undefined");

            const prevId = getAttributeValue(nodeBeforeChange, "id");
            if (!prevId)
                throw new Error("History can not work unless all element have id");
            this.historyDatas.addKey(prevId, id);
        }
        const data = this.historyDatas.get(id);
        if (!data) throw new Error("History data not found");
        if (operationType === HistoryOperationType.OptimizedAndRemoved) {
            data.historyStates.push(
                this.createHistoryState(operationType, tag, nodeBeforeChange, index)
            );
        } else {
            if (!newNode) throw new Error("New node can not be undefined");

            data.historyStates.push(
                this.createHistoryState(operationType, tag, newNode, index)
            );
        }
    }
    public static reset() {
        TransformerHistory.historyDatas.clear();
    }

    public static writeHistory() {
        if (!TransformerHistory.outputPath) throw new Error("Please initialize first");
        const content = [];
        for (const [tags, data] of TransformerHistory.historyDatas) {
            const historyStates: HistoryState[] = data.historyStates;
            content.push({ tags: Array.from(tags), historyStates: historyStates });
        }
        fs.writeFileSync(TransformerHistory.outputPath, JSON.stringify(content, null, 2));
    }
}
