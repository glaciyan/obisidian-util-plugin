import { Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	KevinUtilPluginSettings,
	KevinUtilSettingTab,
} from "plugin/KevinUtilSettingTab";

export class KevinUtilPlugin extends Plugin {
	settings: KevinUtilPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new KevinUtilSettingTab(this.app, this));
	}

	onunload() {}

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
