import { ImageFilePath } from "#common/constants.mjs";
import { htmlQuery } from "#utilities/dom.ts";
import { localize, LocalizeData } from "#utilities/localize.ts";
import { MODULE } from "#utilities/module.ts";
import { joinString } from "#utilities/string.ts";

import { HelperDelegate, HelperOptions } from "handlebars";
import * as R from "remeda";

export function templatePath(...path: string[]): string {
    return `modules/${MODULE.id}/templates/${joinString("/", path)}.hbs`;
}

export function imagePath(...args: [...string[], ImageFilePath]): ImageFilePath {
    const file = args.pop() as ImageFilePath;
    return `modules/${MODULE.id}/images/${joinString("/", args)}/${file}`;
}

export function render<TData extends RenderTemplateDate>(template: string, data = {} as TData): Promise<string> {
    template = template.replace(/\./, "/");

    if (R.isString(data.i18n)) {
        data.i18n = templateLocalize(data.i18n);
    } else if (!("i18n" in data)) {
        data.i18n = templateLocalize(template.replace(/\//, "."));
    }

    data.systemId = game.system.id;
    data.systemPartial = (path: string) => `systems/${game.system.id}/templates/${path}`;

    const path = templatePath(template);
    return foundry.applications.handlebars.renderTemplate(path, data);
}

export function templateLocalize(...subKeys: string[]): (...args: Parameters<HelperDelegate>) => string {
    const fn = (...args: Parameters<HelperDelegate>) => {
        const { hash } = args.pop() as HelperOptions;
        return localize(...subKeys, ...(args as string[]), hash as LocalizeData);
    };

    Object.defineProperties(fn, {
        tooltip: {
            value: (...args: Parameters<HelperDelegate>) => {
                const { hash } = args.pop() as HelperOptions;
                return templateTooltip(...subKeys, ...(args as string[]), hash);
            },
            enumerable: false,
            configurable: false,
        },
        root: {
            value: (...args: Parameters<HelperDelegate>) => {
                const { hash } = args.pop() as HelperOptions;
                return localize(...(args as string[]), hash as LocalizeData);
            },
            enumerable: false,
            configurable: false,
        },
    });

    return fn;
}

export function templateTooltip(...args: [...string[], TemplateTooltipOptions]): string {
    const options = args[0] as TemplateTooltipOptions;
    const tooltip = options.localize !== false ? localize(...args) : args[0];
    return `data-tooltip="${tooltip}"`;
}

export function preSyncElement(newElement: HTMLElement, priorElement: Maybe<HTMLElement>, ...scrollable: string[]): SyncElementState {
    const state: SyncElementState = { focus: undefined, scrollPosition: [] };

    if (!priorElement) {
        return state;
    }

    const focus = priorElement.querySelector<HTMLInputElement>(":focus");

    if (focus?.name) {
        state.focus = `${focus.tagName}[name="${focus.name}"]`;
    } else if (focus?.dataset.itemId) {
        state.focus = `${focus.tagName}[data-item-id="${focus.dataset.itemId}"]`;
    }

    if (scrollable.length === 0) {
        scrollable.push("");
    }

    for (const selector of scrollable) {
        const el0 = selector === "" ? priorElement : htmlQuery(priorElement, selector);

        if (el0) {
            const el1 = selector === "" ? newElement : htmlQuery(newElement, selector);

            if (el1) {
                state.scrollPosition.push([el1, el0.scrollTop]);
            }
        }
    }
    return state;
}

export function postSyncElement(newElement: HTMLElement, state: SyncElementState): void {
    if (state.focus) {
        const newFocus = htmlQuery(newElement, state.focus);
        newFocus?.focus();
    }

    for (const [el, scrollTop] of state.scrollPosition) {
        el.scrollTop = scrollTop;
    }
}

export type SyncElementState = { focus?: string; scrollPosition: [HTMLElement, number][] };

export type RenderTemplateDate = Record<string, unknown> & {
    i18n?: string | TemplateLocalize;
    systemId?: string;
    systemPartial?: (path: string) => string;
};

export type TemplateLocalize = ReturnType<typeof templateLocalize>;

type TemplateTooltipOptions = LocalizeData & { localize?: boolean };
