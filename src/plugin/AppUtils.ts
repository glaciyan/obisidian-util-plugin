import {App} from "obsidian";

export function getMentions(app: App) {
    const mentions: Map<string, { linkers: Set<string> }> = new Map();

    Object.entries(app.metadataCache.resolvedLinks).forEach(([linker, links]) => {
        Object.keys(links).forEach((linked) => {
            if (mentions.get(linked) === undefined) {
                const linkers: Set<string> = new Set();
                linkers.add(linker);
                mentions.set(linked, {linkers})

                return;
            }

            // false positive
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            mentions.get(linked)!.linkers!.add(linker);
        })
    })

    return mentions;
}