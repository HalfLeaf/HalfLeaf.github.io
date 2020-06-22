"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_property_decorator_1 = require("vue-property-decorator");
let PageEncryptMixin = class PageEncryptMixin extends vue_property_decorator_1.Vue {
    constructor() {
        super(...arguments);
        this.passwordConfig = {};
    }
    /** 加密配置 */
    get encryptOptions() {
        return this.$themeConfig.encrypt || {};
    }
    /** 当前路径命中的键值 */
    get currentPathHitKeys() {
        if (this.encryptOptions && typeof this.encryptOptions.config === "object") {
            /** 配置键名 */
            const keys = Object.keys(this.encryptOptions.config);
            /** 命中键名 */
            const hitKeys = keys
                .filter((key) => this.$route.path.startsWith(key))
                .sort((a, b) => b.length - a.length);
            return hitKeys;
        }
        return [];
    }
    /** 路径是否加密 */
    get currentPathEncrypted() {
        if (this.currentPathHitKeys.length !== 0) {
            /** 配置项 */
            const { config } = this.encryptOptions;
            /** 正确键值 */
            const correctKeys = this.currentPathHitKeys.filter((key) => {
                const keyConfig = config[key];
                /** 命中的密码 */
                const hitPasswords = typeof keyConfig === "string" ? [keyConfig] : keyConfig;
                /** 比较结果 */
                const result = hitPasswords.filter((password) => this.passwordConfig[key] === password);
                return result.length !== 0;
            });
            return correctKeys.length === 0;
        }
        return false;
    }
    /** 设置密码 */
    setPassword(password) {
        const { config } = this.$themeConfig.encrypt;
        for (const hitKey of this.currentPathHitKeys) {
            /** 命中密码配置 */
            const hitPassword = config[hitKey];
            /** 命中密码列表 */
            const hitPasswordList = typeof hitPassword === "string" ? [hitPassword] : hitPassword;
            /** 比较结果 */
            const result = hitPasswordList.filter((item) => password === item);
            // 出现匹配
            if (result.length !== 0) {
                this.$set(this.passwordConfig, hitKey, password);
                localStorage.setItem("password", JSON.stringify(this.passwordConfig));
                break;
            }
        }
    }
    mounted() {
        const passwordConfig = localStorage.getItem("password");
        if (passwordConfig)
            this.passwordConfig = JSON.parse(passwordConfig);
    }
};
PageEncryptMixin = __decorate([
    vue_property_decorator_1.Component
], PageEncryptMixin);
exports.default = PageEncryptMixin;
