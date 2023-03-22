import KUtilPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface KUtilPluginSettings {
    attachmentFolder: string;
    useSystemTrash: boolean;
}

export const DEFAULT_SETTINGS: KUtilPluginSettings = {
    attachmentFolder: "000 Media",
    useSystemTrash: false,
};

export class KUtilSettings extends PluginSettingTab {
    plugin: KUtilPlugin;

    constructor(app: App, plugin: KUtilPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Attachment Folder")
            .setDesc(
                "Choose a folder which should be scanned for unused media."
            )
            .addText((component) => {
                component
                    .setValue(this.plugin.settings.attachmentFolder)
                    .onChange(async (value) => {
                        this.plugin.settings.attachmentFolder = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Use System Trash")
            .setDesc(
                "Use System Trash or Obsidian .trash folder when removing files."
            )
            .addToggle((component) => {
                component
                    .setValue(this.plugin.settings.useSystemTrash)
                    .onChange(async (value) => {
                        this.plugin.settings.useSystemTrash = value;
                        await this.plugin.saveSettings();
                    });
            });
    }
}
