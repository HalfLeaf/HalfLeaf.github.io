"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbind = exports.update = exports.bind = void 0;
/** 验证函数 */
const validate = (binding) => {
    if (typeof binding.value !== "function") {
        console.warn("[Vue-click-outside:] provided expression", binding.expression, "is not a function.");
        return false;
    }
    return true;
};
/** 是否是 Popup */
const isPopup = (popupItem, elements) => {
    if (!popupItem || !elements)
        return false;
    for (let i = 0, len = elements.length; i < len; i++)
        try {
            if (popupItem.contains(elements[i]))
                return true;
            if (elements[i].contains(popupItem))
                return false;
        }
        catch (err) {
            return false;
        }
    return false;
};
/** 是否是服务器端代码 */
const isServer = (vNode) => typeof vNode.componentInstance !== "undefined" &&
    vNode.componentInstance.$isServer;
exports.bind = (el, binding, vNode) => {
    if (!validate(binding))
        return;
    // Define Handler and cache it on the element
    const handler = (event) => {
        if (!vNode.context)
            return;
        // Some components may have related popup item, on which we shall prevent the click outside event handler.
        // eslint-disable-next-line
        const elements = 
        // eslint-disable-next-line
        event.path ||
            (event.composedPath ? event.composedPath() : []);
        if (elements && elements.length > 0)
            elements.unshift(event.target);
        if (el.contains(event.target) ||
            // eslint-disable-next-line
            isPopup(vNode.context.popupItem, elements))
            return;
        el.$vueClickOutside.callback(event);
    };
    // Add Event Listeners
    el.$vueClickOutside = {
        handler,
        callback: binding.value,
    };
    const clickHandler = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    if (!isServer(vNode))
        document.addEventListener(clickHandler, handler);
};
/** 更新命令 */
exports.update = (el, binding) => {
    if (validate(binding))
        el.$vueClickOutside.callback = binding.value;
};
/** 解绑命令 */
exports.unbind = (el, _binding, vNode) => {
    // Remove Event Listeners
    const clickHandler = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    if (!isServer(vNode) && el.$vueClickOutside)
        document.removeEventListener(clickHandler, el.$vueClickOutside.handler);
    delete el.$vueClickOutside;
};
exports.default = {
    bind: exports.bind,
    update: exports.update,
    unbind: exports.unbind,
};
