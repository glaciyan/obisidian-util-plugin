import { Notice, TFile, TFolder, Vault } from "obsidian";
import { getThePlugin } from "./KUtilPlugin";
import { getAllAppMentions } from "./Mentions";

export const getAttachmentFolder = () => {
    const ThePlugin = getThePlugin();

    const attachmentFolder = ThePlugin.app.vault.getAbstractFileByPath(
        ThePlugin.settings.attachmentFolder
    ) as TFolder;

    if (attachmentFolder === null) {
        throw new Error("No Attachment folder found!");
    }

    return attachmentFolder;
};

export const cleanUp = async (): Promise<number> => {
    const ThePlugin = getThePlugin();

    const attachmentFolder = getAttachmentFolder();
    const mentions = getAllAppMentions(ThePlugin.app);

    const trashPromises: Promise<void>[] = [];

    let removedFiles = 0;
    Vault.recurseChildren(attachmentFolder, (file) => {
        if (!(file instanceof TFile)) return;

        if (!mentions.has(file.path)) {
            trashPromises.push(
                ThePlugin.app.vault
                    .trash(file, ThePlugin.settings.useSystemTrash)
                    .then(() => {
                        removedFiles++;
                        console.log(
                            `Removed ${file.name}`
                        );
                    })
                    .catch((e) => {
                        new Notice(`Trash Error: couldn't delete ${file.name}`);
                        console.error(e);
                    })
            );
        }
    });

    await Promise.all(trashPromises);
    console.log(`Done: deleted ${removedFiles} files`);

    return removedFiles;
};
