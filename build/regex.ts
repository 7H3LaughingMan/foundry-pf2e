import * as fs from "fs";
import { glob } from "glob";
// import * as path from "path/posix";

const files = await glob("./types/pf2e/**/*.d.ts", {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    // const dir = path.parse(file).dir;

    let data = fs.readFileSync(file, "utf8");

    // Import - Double Quotes
    data = data.replace(/^import (.*?) from '(.*?)';$/gm, `import $1 from "$2";`);

    console.log(data);
    // console.log(path.relative(dir, "./types/pf2e/module/actor/index.ts"));
}

/* let dir = path.parse("./types/pf2e/module/actor/party").dir;

console.log(dir);

console.log(path.relative("./types/pf2e/module/actor/party", "./types/foundry/common/data/fields.d.ts"));*/
