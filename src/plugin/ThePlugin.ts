import { App } from "obsidian";
import { KUtilPluginSettings } from "plugin/KUtilSettings";

export interface KPlugin {
    app: App;
    settings: KUtilPluginSettings;
}
