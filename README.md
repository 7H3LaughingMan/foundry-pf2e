# PF2e/Foundry TypeScript Types

This is a rather simple library for TypeScript that declares various classes, enums, functions, interfacts, namespaces, type aliases, variables, etc. for both Foundry VTT and it's Pathfinder Second Edition game system.
The main purpose of this library is to provide a single unified library that can be used by modules developed using TypeScript.

## Usage

In order to use this library you will need to install it, at the moment it can only be installed using a direct link to the GitHub repository using the below command.

```
npm install https://github.com/7H3LaughingMan/foundry-pf2e
```

This will install the library using the latest available commit. You will also need to add `foundry-pf2e` to `types` in your `tsconfig.json` in order to use the PF2e/Foundry types. If you would like to use the types from a third party module like (PF2e Toolbelt)[https://github.com/reonZ/pf2e-toolbelt] you will need to include `foundry-pf2e/pf2e-toolbelt` to your `types` in `tsconfig.json`.

If there are any updates to the library you will have to manually update using the below command to get the latest version.

```
npm update foundry-pf2e
```

## Contributing

People are more than welcome to contribute to this project; however, there are a few restrictions/requirements.

1. Any requests to update PF2e types will be denied. These are automatically generated using the `vite-plugin-dts` plugin along with a couple of scripts including in the repository, this means any types from PF2e should be 100% accurate. If there is a problem with them than chances are it's a problem with the PF2e game system and you will need to submit either an Issue or Pull Request with them.
2. Any requests to update Foundry types should follow the below guidelines.
     - Please double check Foundry's code as it contains a lot of documentation regarding the stucture of various classes/functions/etc.
     - Please make sure whatever you are adding/editing is in the right folder/file, they should be in the same folder/file layout as Foundry.
     - Please do not add any extra interfaces/classes not referenced in Foundry's code. That means if there are several functions that use the same complex type for a parameter/return do not create a new interface. Or if you see a parameter/return that is an object that could possibly be the same as an existing class/interface/type do not use the existing one. There are several instances where it looks like this should be the case but if you use the wrong one for a specific class/function it will cause errors.
     - The above guidelines are strict, but you might notice instances where they aren't being followed. This Foundry types come from the built-in Foundry types used by the PF2e game system, these are rather old and haven't been updated for v12. Some of these things aren't touched by the PF2e game system so they don't come up but rear their ugly heads for modules as they might actually use them.
3. You are more than welcome to submit types for 3rd-party modules that are used for other modules, please try and look at the existing types for a good idea on how to do them.
