import * as fs from "fs";
import { glob } from "glob";
import * as path from "path/posix";

const files = await glob(["./types/foundry/**/*.{ts,mts}", "./types/pf2e/**/*.{ts,mts}"], {
    dotRelative: true,
    posix: true,
});

for (const file of files) {
    const dir = path.parse(file).dir;
    let data = fs.readFileSync(file, "utf8");

    // Import - Double Quotes
    data = data.replace(/^import (.*?) from '(.*?)';$/gm, `import $1 from "$2";`);
    data = data.replace(/import\('(.*?)'\)/gm, `import\("$1"\)`);

    // Import - *.d.ts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.ts";$/gm, `import $1 from "$2.ts";`);

    // Import - *.d.mts
    data = data.replace(/^import (.*?) from "(.*?)\.d\.mts";$/gm, `import $1 from "$2.mjs";`);

    // Import - @actor
    data = data.replace(/"@actor"/gm, (_substring) => {
        const relative = path.relative(dir, "./types/pf2e/module/actor/index.ts");
        return `"./${relative}"`;
    });

    // Import - @actor/*
    data = data.replace(/"@actor\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/module/actor/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @item
    data = data.replace(/"@item"/gm, (_substring) => {
        const relative = path.relative(dir, "./types/pf2e/module/item/index.ts");
        return `"./${relative}"`;
    });

    // Import - @item/*
    data = data.replace(/"@item\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/module/item/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @scene
    data = data.replace(/"@scene"/gm, (_substring) => {
        const relative = path.relative(dir, "./types/pf2e/module/scene/index.ts");
        return `"./${relative}"`;
    });

    // Import - @scene/*
    data = data.replace(/"@scene\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/module/scene/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @system/*
    data = data.replace(/"@system\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/module/system/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @module/*
    data = data.replace(/"@module\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/module/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @scripts/*
    data = data.replace(/"@scripts\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/scripts/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @util
    data = data.replace(/"@util"/gm, (_substring) => {
        const relative = path.relative(dir, "./types/pf2e/util/index.ts");
        return `"./${relative}"`;
    });

    // Import - @util/*
    data = data.replace(/"@util\/(.*?)"/gm, (_substring, g1) => {
        const relative = path.relative(dir, "./types/pf2e/util/");
        return `"./${relative}/${g1}"`;
    });

    // Import - @client/*
    data = data.replace(/"@client\/(.*?)"/gm, `"#client/$1"`);

    // Import - @common/*
    data = data.replace(/"@common\/(.*?)"/gm, `"#common/$1"`);

    fs.writeFileSync(file, data, "utf8");
}
