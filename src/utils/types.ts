import type { Tabs } from "wxt/browser";

/**
 * Add last used attribute to @link Tabs.Tab.
 *
 * @param lastUsed - Date object marking when the tab was last used.
 */
export interface TimestampedTab extends Tabs.Tab {
	lastUsed: Date;
}
