"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickyMixin = exports.TimelineMixin = exports.ArticleMixin = void 0;
const vue_property_decorator_1 = require("vue-property-decorator");
const article_1 = require("./article");
let ArticleMixin = class ArticleMixin extends vue_property_decorator_1.Vue {
    /** 文章列表 */
    get $articles() {
        const { pages } = this.$site;
        // 先过滤再排序
        return article_1.sortArticle(article_1.filterArticle(pages));
    }
};
ArticleMixin = __decorate([
    vue_property_decorator_1.Component
], ArticleMixin);
exports.ArticleMixin = ArticleMixin;
let TimelineMixin = class TimelineMixin extends vue_property_decorator_1.Vue {
    /** 时间轴项目 */
    get $timelineItems() {
        const { pages } = this.$site;
        // 先过滤再排序
        return article_1.sortArticle(article_1.filterArticle(pages, (frontmatter) => (frontmatter.time || frontmatter.date) &&
            frontmatter.timeline !== false));
    }
    /** 时间轴列表 */
    get $timeline() {
        const timelineItems = [];
        // 先过滤再排序
        this.$timelineItems.forEach((article) => {
            const { frontmatter: { date, time = date }, } = article;
            const [year, month, day] = article_1.getDate(time);
            if (year && month && day) {
                if (!timelineItems[0] || timelineItems[0].year !== year)
                    timelineItems.unshift({ year, articles: [] });
                article.frontmatter.parsedDate = `${month}-${day}`;
                timelineItems[0].articles.push(article);
            }
        });
        return timelineItems.reverse();
    }
};
TimelineMixin = __decorate([
    vue_property_decorator_1.Component
], TimelineMixin);
exports.TimelineMixin = TimelineMixin;
let StickyMixin = class StickyMixin extends vue_property_decorator_1.Vue {
    /** 文章列表 */
    get $stickArticles() {
        const { pages } = this.$site;
        // 先过滤再排序
        return article_1.sortArticle(article_1.filterArticle(pages, (frontmatter) => Boolean(frontmatter.sticky)));
    }
};
StickyMixin = __decorate([
    vue_property_decorator_1.Component
], StickyMixin);
exports.StickyMixin = StickyMixin;
