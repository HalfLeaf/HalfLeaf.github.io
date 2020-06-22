"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_property_decorator_1 = require("vue-property-decorator");
let GlobalEncryptMixin = class GlobalEncryptMixin extends vue_property_decorator_1.Vue {
    constructor() {
        super(...arguments);
        /** 全局密码 */
        this.globalPassword = "";
    }
    /** 加密配置 */
    get encryptOptions() {
        return this.$themeConfig.encrypt || {};
    }
    /** 全局加密状态 */
    get globalEncrypted() {
        if (this.encryptOptions.status === "global" && this.encryptOptions.global) {
            const { global } = this.encryptOptions;
            /** 全局密码 */
            const globalPasswords = typeof global === "string" ? [global] : global;
            /** 全局密码匹配结果 */
            const result = globalPasswords.filter((globalPassword) => globalPassword === this.globalPassword);
            return result.length === 0;
        }
        return false;
    }
    mounted() {
        const passwordConfig = localStorage.getItem("globalPassword");
        if (passwordConfig)
            this.globalPassword = passwordConfig;
    }
    globalPasswordCheck(value) {
        const { global } = this.encryptOptions;
        /** 全局密码 */
        const globalPasswords = typeof global === "string" ? [global] : global;
        /** 全局密码匹配结果 */
        const result = globalPasswords.filter((globalPassword) => globalPassword === value);
        if (result.length !== 0) {
            this.globalPassword = value;
            localStorage.setItem("globalPassword", value);
        }
    }
};
GlobalEncryptMixin = __decorate([
    vue_property_decorator_1.Component
], GlobalEncryptMixin);
exports.default = GlobalEncryptMixin;
