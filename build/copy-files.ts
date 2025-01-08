import * as fs from "fs";

fs.copyFileSync("./build/files/browser.d.ts", "./types/pf2e/module/apps/compendium-browser/browser.d.ts");
fs.copyFileSync("./build/files/settings.d.ts", "./types/pf2e/module/apps/compendium-browser/settings.d.ts");
fs.copyFileSync("./build/files/mixin.svelte.ts", "./types/pf2e/module/sheet/mixin.svelte.ts");
