import { Notice } from "obsidian";
import { cleanUp } from "./AttachementFolder";

export const cleanUpAttachmentFolder = {
    id: "clean-up-attachment-folder",
    name: "Clean up Attachment folder",
    callback: async () => {
        return cleanUp()
            .then((removedFiles) => {
                new Notice(`Removed ${removedFiles} files`);
            })
            .catch((e) => {
                new Notice(`Error: ${e.message}`);
            });
    },
};
