import { TFile, TFolder, Vault } from "obsidian";
import { getThePlugin } from "./KevinUtilPlugin";
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

export const cleanUp = (): number => {
    const ThePlugin = getThePlugin();

    const attachmentFolder = getAttachmentFolder();
    const mentions = getAllAppMentions(ThePlugin.app);

    let removedFiles = 0;
    Vault.recurseChildren(attachmentFolder, (file) => {
        if (!(file instanceof TFile)) return;

        if (!mentions.has(file.path)) {
            ThePlugin.app.vault
                .trash(file, ThePlugin.settings.useSystemTrash)
                .then(() => {
                    removedFiles++;
                    console.log(`Removed ${file.name}`);
                });
        }
    });

    return removedFiles;
};
