"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("md5");
/**
 * 处理密码配置
 *
 * @param encrypt 加密配置选项
 */
const resolveEncrypt = (encrypt) => {
    // 处理全局密码
    if (encrypt.global)
        if (typeof encrypt.global === "string")
            encrypt.global = md5(encrypt.global);
        else if (Array.isArray(encrypt.global))
            encrypt.global = encrypt.global.map((globalPassword) => md5(globalPassword));
        else
            throw new Error(`[vuepress-theme-hope]: You asked for global Encrtption but you did not specific valid global Password. 

Please add "global" option your "themeConfig.encrypt" config. It can be string or string[].`);
    // 处理密码配置
    const passwordConfig = encrypt.config || {};
    Object.keys(passwordConfig).forEach((key) => {
        const password = passwordConfig[key];
        if (typeof password === "string")
            passwordConfig[key] = md5(password);
        else if (Array.isArray(password))
            passwordConfig[key] = password.map((configPassword) => {
                if (typeof configPassword === "string")
                    return md5(configPassword);
                throw new Error(`[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 
        
Key ${key}'s value MUST be string or string[]. But it's type is ${typeof configPassword}. Please fix it`);
            });
        else
            throw new Error(`[vuepress-theme-hope]: You config "themeConfig.encrypt.config", but your config is invalid. 

The value of key ${key} MUST be string or string[]. But not it's ${typeof password}. Please fix it`);
    });
};
exports.default = resolveEncrypt;
