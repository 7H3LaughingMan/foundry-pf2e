import * as fs from "fs";
import { glob } from "glob";

let files = await glob(["client/**/*", "client-esm/**/*", "common/**/*"], {
    cwd: "../FoundryVTT-12.331/resources/app",
    dotRelative: true,
    posix: true,
});

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

files = files.filter((value: string) => {
    return value.endsWith(".js") || value.endsWith(".mjs");
});

files.forEach((value: string, index: number, array: string[]) => {
    array[index] = `- [ ] \`${value}\``;
});

fs.writeFileSync("./build/output.txt", files.join("\n"));
