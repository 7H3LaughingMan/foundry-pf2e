import * as fs from "fs";
import { glob } from "glob";

let files = await glob("./pf2e/module/**/*.d.ts", {
    cwd: "./types",
    dotRelative: true,
    ignore: ["./pf2e/module/migration/**", "./pf2e/module/system/action-macros/**"],
    posix: true,
});

files.push(
    "./pf2e/global.d.ts",
    "./pf2e/module/system/action-macros/index.d.ts",
    "./pf2e/scripts/config/index.d.ts",
    "./pf2e/scripts/config/traits.d.ts",
);

files.sort((a, b) => {
    const a_parts = a.split("/");
    const b_parts = b.split("/");

    const a_folders = a_parts.slice(1, -1);
    const a_file = a_parts.at(-1) ?? "";

    const b_folders = b_parts.slice(1, -1);
    const b_file = b_parts.at(-1) ?? "";

    for (let index = 0; index < Math.max(a_folders.length, b_folders.length); index++) {
        const a_folder = a_folders[index];
        const b_folder = b_folders[index];

        if (!a_folder && !b_folder) {
            break;
        }

        if (!a_folder || !b_folder) {
            if (!a_folder) {
                return -1;
            }

            if (!b_folder) {
                return 1;
            }
        }

        const folder_compare = a_folder.localeCompare(b_folder);

        if (folder_compare !== 0) {
            return folder_compare;
        }
    }

    return a_file.localeCompare(b_file);
});

files = files.filter((value) => {
    return !value.endsWith(".svelte.d.ts");
});

files.forEach((value, index, array) => {
    array[index] = `export type * from "${value}";`;
});

files.unshift(
    'import "./foundry/index.d.ts";',
    'import "./pf2e/index.d.ts";',
    "",
    'export type { ActionCost } from "./pf2e/module/item/base/data/system.d.ts";',
    'export type { CompendiumBrowser } from "./pf2e/module/apps/compendium-browser/browser.d.ts";',
    'export type { HitPointsStatistic } from "./pf2e/module/actor/data/base.d.ts";',
    'export type { ItemFlagsPF2e } from "./pf2e/module/item/base/data/system.d.ts";',
    'export type { PrerequisiteTagData } from "./pf2e/module/item/feat/data.d.ts";',
    "",
);

files.push("");

fs.writeFileSync("./types/index.d.ts", files.join("\n"));
