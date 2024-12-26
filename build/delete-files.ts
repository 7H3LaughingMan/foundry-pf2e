import * as fs from "fs";
import { glob } from "glob";

const files = await glob("./types/pf2e/**/*.d.ts", {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    if (file.endsWith(".svelte.d.ts")) {
        console.log(`Deleting ${file}`);

        fs.rmSync(file);
    }
}
