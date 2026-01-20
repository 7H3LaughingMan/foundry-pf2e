1. `git clone --branch pf2e-7.9.1 https://github.com/foundryvtt/pf2e pf2e-7.9.1`
2. `npm ci`
3. `npm i -D unplugin-dts`
4. Edit `vite.config.ts`
    - `import dts from "unplugin-dts/vite";`
    - `dts({ outDirs: "dts", pathsToAliases: false })`
5. `npm run build:system`
    - You will get errors, just click on the file to take you to the line in question and change `propertySymbol.parent.flags` to `propertySymbol?.parent?.flags`. This will need to be repeated untill it no longer errors out.
6. Delete `types/pf2e/module`, `types/pf2e/scripts`, `types/pf2e/util`, and `types/pf2e/global.d.ts` in this project. Then copy `dts/src/module`, `dts/src/scripts`, `dts/src/util`, and `dts/src/global.d.ts` from the working folder into this project in the same place you deleted files from.
7. In this project run `node .\build\regex.js` followed by `node .\build\exports.js`
8. `npm run eslint:fix`
9. Edit `types/pf2e/global.d.ts`
    - `interface ClientSettingsPF2e extends fh.ClientSettings` to `export interface ClientSettingsPF2e extends fh.ClientSettings`
    - `interface GamePF2e extends Game` to `export interface GamePF2e extends Game`
10. Search for `_base`, you will need to fix any classes that extend the same class with `_base` at the end.
    - Mostly you will just need to find the same class in the PF2e GitHub and copy the signature, you will also need to remove `protected` from any methods for `SvelteApplicationMixin`
11. You will need to search for `[SYSTEM_ID]` in the PF2e folder, you will need to locate any flags `interface`/`types` that use it and copy them into the equivalent here.
