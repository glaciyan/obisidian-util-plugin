import { App } from "obsidian";
import { KevinUtilPluginSettings } from "plugin/KevinUtilSettings";


export interface KPlugin {
    app: App;
    settings: KevinUtilPluginSettings;
}

