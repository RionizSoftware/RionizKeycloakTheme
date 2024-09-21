/**
 * ArrayKeyMap allows storing values with arrays of strings as keys,
 * and provides fast lookup based on any element in the key array.
 *
 * @template T - The type of the values stored in the map.
 *
 * Example Usage:
 *  const map = new ArrayKeyMap<number>();
 *  map.add(['test', 'example'], 100);
 *  map.add(['sample', 'demo'], 200);
 *
 *  console.log(map.get('test'));    // Output: 100
 *  console.log(map.get('example')); // Output: 100
 *  console.log(map.get('sample'));  // Output: 200
 */
export class ArrayKeyMap<T> implements Iterable<[Set<string>, T]> {
    private elementToKeyArrayMap: Map<string, Set<string>> = new Map();
    private keyArrayToValueMap: Map<Set<string>, T> = new Map();

    /**
     * Adds a key (array of strings) and a corresponding value to the map.
     *
     * @param key - The array of strings to be used as the key.
     * @param value - The value associated with the key.
     */
    public add(key: string, value: T): void {
        let keyArray = this.elementToKeyArrayMap.get(key);
        if (!keyArray) {
            // key array not exist we need to add it to elementToKeyArrayMap first
            keyArray = new Set<string>();
            keyArray.add(key);
            this.elementToKeyArrayMap.set(key, keyArray);
        }

        this.keyArrayToValueMap.set(keyArray, value);
    }

    public addKey(previousKey: string, newKey: string): void {
        const keyArray = this.elementToKeyArrayMap.get(previousKey);
        if (!keyArray) throw new Error("Previous key not found !");
        keyArray.add(newKey);
    }

    /**
     * Clears all entries in the map.
     */
    public clear(): void {
        this.elementToKeyArrayMap.clear();
        this.keyArrayToValueMap.clear();
    }

    /**
     * Retrieves the value associated with a key array,
     * by looking up any element within the array.
     *
     * @param element - A string element to be used for lookup.
     * @returns The value associated with the array containing the element, or undefined if not found.
     */
    public get(element: string): T | undefined {
        const keyArray = this.elementToKeyArrayMap.get(element);
        if (keyArray) {
            return this.keyArrayToValueMap.get(keyArray);
        }
        return undefined;
    }

    /**
     * Implements the iterable protocol so that the map can be iterated over.
     * Returns an iterator that yields key-value pairs in the map.
     *
     * @returns An iterator of key-value pairs.
     */
    [Symbol.iterator](): Iterator<[Set<string>, T]> {
        return this.keyArrayToValueMap.entries();
    }
}
