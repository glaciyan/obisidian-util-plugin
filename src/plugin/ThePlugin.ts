import { App } from "obsidian";
import { KevinUtilPluginSettings } from "plugin/KUtilSettings";

export interface KPlugin {
    app: App;
    settings: KevinUtilPluginSettings;
}
