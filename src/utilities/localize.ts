import { MODULE } from "#utilities/module.ts";

import * as R from "remeda";

export function foundryLocalizeIfExist(key: string): string | undefined {
    if (game.i18n.has(key, true)) {
        return game.i18n.localize(key);
    }
    return undefined;
}

export function getLocalizeData(...args: LocalizeArgs): { path: string; data?: LocalizeData } {
    const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
    const path = localizePath(...(args as string[]));
    return { path, data };
}

export function localizeOrFormat(path: string, data?: LocalizeData): string {
    return R.isObjectType(data) ? game.i18n.format(path, data) : game.i18n.localize(path);
}

export function localize(...args: LocalizeArgs): string {
    const { data, path } = getLocalizeData(...args);
    return localizeOrFormat(path, data);
}

export function localizeIfExist(...args: LocalizeArgs): string | undefined {
    const { data, path } = getLocalizeData(...args);
    if (game.i18n.has(path, true)) {
        return localizeOrFormat(path, data);
    }
    return undefined;
}

export function localizePath(...path: string[]): string {
    return MODULE.path(...path);
}

export function notify(type: "info" | "warning" | "error" | "success", ...args: NotificationArgs): foundry.applications.ui.Notification {
    const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
    const message = localize(...(args as LocalizeArgs));
    return foundry.ui.notifications.notify(message, type, { permanent });
}

export function success(...args: NotificationArgs): foundry.applications.ui.Notification {
    return notify("success", ...args);
}

export function info(...args: NotificationArgs): foundry.applications.ui.Notification {
    return notify("info", ...args);
}

export function warning(...args: NotificationArgs): foundry.applications.ui.Notification {
    return notify("warning", ...args);
}

export function error(...args: NotificationArgs): foundry.applications.ui.Notification {
    return notify("error", ...args);
}

export type LocalizeData = Record<string, Maybe<string | number | boolean>>;

export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];

export type LocalizeArgs = string[] | [...string[], string | LocalizeData];
