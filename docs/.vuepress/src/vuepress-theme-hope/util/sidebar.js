"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSidebarItems = exports.resolvePageforSidebar = exports.groupSidebarHeaders = void 0;
const path_1 = require("./path");
const groupHeader_1 = require("./groupHeader");
exports.groupSidebarHeaders = groupHeader_1.default;
/**
 * 处理侧边栏的分组的标题
 *
 * @param page 当前页面
 */
const resolveSidebarHeaders = (page) => {
    const headers = page.headers ? exports.groupSidebarHeaders(page.headers) : [];
    return [
        {
            type: "group",
            collapsable: false,
            title: page.title,
            icon: page.frontmatter.icon,
            path: "",
            children: headers.map((header) => (Object.assign(Object.assign({}, header), { type: "header", basePath: page.path, path: `${page.path}#${header.slug}`, children: header.children }))),
        },
    ];
};
/** 寻找匹配的侧边栏配置 */
const resolveMatchingConfig = (regularPath, config) => {
    // 数组意味着最简单的配置方式，直接返回
    if (Array.isArray(config))
        return {
            base: "/",
            config,
        };
    for (const base in config)
        if (path_1.ensureEndingSlash(regularPath).startsWith(encodeURI(base)))
            return {
                base,
                config: config[base],
            };
    console.warn(`${regularPath} 没有有效的侧边栏配置`);
    return false;
};
/**
 * 处理侧边栏项，为其合并页面配置
 *
 * @param pages
 * @param path 配置中的路径
 */
exports.resolvePageforSidebar = (pages, path) => {
    // 外部链接
    if (path_1.isExternal(path))
        return {
            type: "external",
            path,
        };
    /** 处理过的真实路径 */
    const realPath = path_1.normalize(path);
    // 在整个页面配置中寻找匹配
    for (const page of pages)
        if (path_1.normalize(page.regularPath) === realPath)
            // 返回合并了相应页面配置的侧边栏对象
            return Object.assign(Object.assign({}, page), { type: "page", path: path_1.ensureExt(page.path) });
    // 未找到匹配的侧边栏
    console.error(`Sidebar: "${realPath}" has no matching page`);
    return { type: "error", path: realPath };
};
const resolve = (prefix, path, base) => path_1.resolvePath(`${prefix}${path}`, base);
/**
 * 处理侧边栏项
 *
 * @param sidebarConfigItem 要处理的侧边栏配置项
 * @param pages 项目包含的页面配置
 * @param base 路径基
 */
const resolveItem = (sidebarConfigItem, pages, base, prefix = "") => {
    // 返回页面链接以及内部的标题链接
    if (typeof sidebarConfigItem === "string")
        return exports.resolvePageforSidebar(pages, resolve(prefix, sidebarConfigItem, base));
    // 自定义标题，格式为 ['路径', '自定义标题']
    if (Array.isArray(sidebarConfigItem))
        // 需要覆盖标题
        return Object.assign(exports.resolvePageforSidebar(pages, resolve(prefix, sidebarConfigItem[0], base)), {
            title: sidebarConfigItem[1],
        });
    // 对象不存在子项
    const children = sidebarConfigItem.children || [];
    if (children.length === 0 && sidebarConfigItem.path)
        // 覆盖标题
        return Object.assign(exports.resolvePageforSidebar(pages, resolve(prefix, sidebarConfigItem.path, base)), {
            title: sidebarConfigItem.title,
        });
    // 对每个子项递归处理再返回
    return Object.assign(Object.assign({}, sidebarConfigItem), { type: "group", path: sidebarConfigItem.path
            ? resolve(prefix, sidebarConfigItem.path, base)
            : "", children: children.map((child) => resolveItem(child, pages, base, `${prefix}${sidebarConfigItem.prefix || ""}`)), collapsable: sidebarConfigItem.collapsable !== false });
};
/**
 * 获得当前页面的侧边栏对象
 */
exports.resolveSidebarItems = (page, site, localePath) => {
    const { themeConfig, pages } = site;
    /** 本语言的配置 */
    const localeConfig = localePath && themeConfig.locales
        ? themeConfig.locales[localePath] || themeConfig
        : themeConfig;
    /** 侧边栏配置 */
    const themeSidebarConfig = localeConfig.sidebar ||
        themeConfig.sidebar;
    // 自动通过当前页面的标题生成
    if (page.frontmatter.sidebar === "auto" || themeSidebarConfig === "auto")
        return resolveSidebarHeaders(page);
    // 侧边栏被禁用
    if (!themeSidebarConfig)
        return [];
    const result = resolveMatchingConfig(page.regularPath, themeSidebarConfig);
    return result
        ? result.config.map((item) => resolveItem(item, pages, result.base))
        : [];
};
