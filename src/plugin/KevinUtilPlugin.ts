import {Notice, Plugin, TFile, TFolder, Vault} from "obsidian";
import {
    DEFAULT_SETTINGS,
    KevinUtilPluginSettings,
    KevinUtilSettings,
} from "plugin/KevinUtilSettings";
import * as AppUtils from "./AppUtils"

export class KevinUtilPlugin extends Plugin {
    settings: KevinUtilPluginSettings;

    async onload() {
        await this.loadSettings();


        this.addCommand({
            id: "clean-up-attachment-folder",
            name: "Clean up Attachment folder",
            callback: async () => {
                const attachmentFolder = this.app.vault.getAbstractFileByPath(this.settings.attachmentFolder) as TFolder;
                if (attachmentFolder === null) {
                    new Notice("Error: No Attachment folder found!")
                    return;
                }

                const mentions = AppUtils.getMentions(this.app);

                let removedFiles = 0;
                Vault.recurseChildren(attachmentFolder, file => {
                    if (!(file instanceof TFile)) return;

                    if (!mentions.has(file.path)) {
                        this.app.vault.trash(file, this.settings.useSystemTrash);
                        removedFiles++;
                        console.log(`Removed ${file.name}`)
                    }
                })

                new Notice(`Removed ${removedFiles} files`)
            }
        })

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new KevinUtilSettings(this.app, this));
    }

    // onunload() {
    // }
    //
    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            (await this.loadData())?.settings
        );
    }

    async saveSettings() {
        await this.saveData({settings: this.settings});
    }
}
