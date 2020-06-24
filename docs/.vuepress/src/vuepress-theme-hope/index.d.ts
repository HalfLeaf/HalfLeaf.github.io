import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { ResolvedHopeThemeConfig } from "./types";
interface ThemeOptionAPI extends PluginOptionAPI {
    extend?: string;
}
declare const _default: (themeConfig: ResolvedHopeThemeConfig, ctx: Context) => ThemeOptionAPI;
export = _default;
