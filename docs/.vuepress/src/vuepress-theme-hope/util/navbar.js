"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveNavLinkItem = void 0;
exports.resolveNavLinkItem = (navbarLink, beforeprefix = "") => {
    const prefix = beforeprefix + (navbarLink.prefix || "");
    const navbarItem = Object.assign({}, navbarLink);
    if (prefix) {
        if (navbarItem.link !== undefined)
            navbarItem.link = prefix + navbarItem.link;
        delete navbarItem.prefix;
    }
    if (navbarItem.items && navbarItem.items.length)
        Object.assign(navbarItem, {
            type: "links",
            items: navbarItem.items.map((item) => exports.resolveNavLinkItem(item, prefix)),
        });
    else
        navbarItem.type = "link";
    return navbarItem;
};
