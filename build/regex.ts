import * as fs from "fs";
import { glob } from "glob";
import * as path from "path/posix";
import { execSync } from "child_process";

const files = await glob("./types/pf2e/**/*.d.ts", {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    const dir = path.parse(file).dir;

    let data = fs.readFileSync(file, "utf8");

    // Import - Double Quotes
    data = data.replace(/^import (.*?) from '(.*?)';$/gm, `import $1 from "$2";`);

    // Import - types/foundry
    data = data.replace(
        /^import (.*?) from "types\/foundry\/(.*?)";$/gm,
        (_substring: string, g1: string, g2: string) => {
            const relative = path.relative(dir, "./types/foundry/");
            return `import ${g1} from "${relative}/${g2}";`;
        },
    );

    // Import - @actor
    data = data.replace(/^import (.*?) from "@actor";$/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/actor/index.ts");
        return `import ${g1} from "./${relative}";`;
    });

    // Import - @item
    data = data.replace(/^import (.*?) from "@item";$/gm, (_substring: string, g1: string) => {
        const relative = path.relative(dir, "./types/pf2e/module/item/index.ts");
        return `import ${g1} from "./${relative}";`;
    });

    // Import - *.d.ts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.ts";$/gm, `import $1 from "$2.ts";`);

    fs.writeFileSync(file, data, "utf8");
}

execSync("code -r ./types/pf2e/global.d.ts");
execSync("code -r ./types/pf2e/module/actor/character/apps/abc-picker/app.svelte.d.ts");
execSync("code -r ./types/pf2e/module/actor/data/base.d.ts");
execSync("code -r ./types/pf2e/module/chat-message/data.d.ts");
execSync("code -r ./types/pf2e/module/item/deity/types.d.ts");
