"use strict";
const eject_1 = require("./lib/eject");
const plugins_1 = require("./lib/plugins");
const path_1 = require("path");
const getAlias = (themeConfig, ctx) => {
    const { siteConfig } = ctx;
    // Resolve algolia
    const isAlgoliaSearch = themeConfig.algolia ||
        Object.keys((siteConfig.locales && themeConfig.locales) || {}).some((base) => themeConfig.locales[base].algolia);
    const blogEnabled = themeConfig.blog !== false;
    const commentPluginEnabled = themeConfig.comment !== false;
    const commentEnabled = themeConfig.comment &&
        themeConfig.comment.type &&
        themeConfig.comment.type !== "disable";
    const themeColorEnabled = !(themeConfig.themeColor === false && themeConfig.darkmode === "disable");
    const noopModule = "vuepress-theme-hope/lib/noopModule.js";
    return {
        "@AlgoliaSearchBox": isAlgoliaSearch
            ? path_1.resolve(__dirname, "./components/AlgoliaSearchBox.vue")
            : noopModule,
        "@BlogInfo": blogEnabled
            ? path_1.resolve(__dirname, "./components/BlogInfo.vue")
            : noopModule,
        "@BlogPage": blogEnabled
            ? path_1.resolve(__dirname, "./components/BlogPage.vue")
            : noopModule,
        "@Comment": commentPluginEnabled && commentEnabled
            ? "@mr-hope/vuepress-plugin-comment/Comment.vue"
            : noopModule,
        "@PageInfo": commentPluginEnabled
            ? "@mr-hope/vuepress-plugin-comment/PageInfo.vue"
            : noopModule,
        "@ThemeColor": themeColorEnabled
            ? path_1.resolve(__dirname, "./components/ThemeColor.vue")
            : noopModule,
    };
};
module.exports = (themeConfig, ctx) => {
    const config = {};
    if (themeConfig.blog !== false)
        config.additionalPages = [
            {
                path: "/article/",
                frontmatter: { layout: "Blog" },
            },
            {
                path: "/timeline/",
                frontmatter: { layout: "Blog" },
            },
        ];
    config.alias = getAlias(themeConfig, ctx);
    config.plugins = plugins_1.default(themeConfig);
    config.extendCli = (cli) => {
        cli
            .command("eject-hope [targetDir]", "copy vuepress-theme-hope into .vuepress/theme for customization.")
            .option("--debug", "eject in debug mode")
            .action((dir = ".") => {
            void eject_1.default(dir);
        });
    };
    return config;
};
