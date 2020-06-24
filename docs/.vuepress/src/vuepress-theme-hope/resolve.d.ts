import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "./types";
/**
 * 处理 vuepress 配置
 *
 * @param config
 */
declare const resolveConfig: (config: HopeVuepressConfig) => ResolvedHopeVuepressConfig;
export = resolveConfig;
