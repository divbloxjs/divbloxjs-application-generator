#!/usr/bin/env node

const fs = require("fs");
const fsAsync = require("fs").promises;
const divbloxRoot = "";
const divbloxConfigRoot = divbloxRoot+"divblox-config/";
const dataModelFileName = divbloxConfigRoot+'data-model.json';
const dxConfigFileName = divbloxConfigRoot+'dxconfig.json';
const dxExampleScriptFileName = divbloxRoot+'divblox-example.js';
const dxInitFileName = divbloxConfigRoot+'dx-init.js';

/**
 * Creates the minimum configuration files needed for Divblox to be initiated
 * @returns {Promise<void>}
 */
async function createDefaults() {
    console.log("Initializing Divblox...");
    if (!fs.existsSync(divbloxConfigRoot)){
        console.log("Creating Divblox config directory...");
        fs.mkdirSync(divbloxConfigRoot);
    }
    if (!fs.existsSync(dataModelFileName)) {
        console.log("Creating Divblox data model...");
        const dxDataModelDefaultStr = await fsAsync.readFile('./templates/data-model.json');
        await fsAsync.writeFile(dataModelFileName, dxDataModelDefaultStr);
    }
    if (!fs.existsSync(dxConfigFileName)) {
        console.log("Creating Divblox default config file...");
        const dxConfigDefaultStr = await fsAsync.readFile('./templates/dxconfig.json');
        await fsAsync.writeFile(dxConfigFileName, dxConfigDefaultStr);
    }
    if (!fs.existsSync(dxInitFileName)) {
        console.log("Creating Divblox custom init file...");
        const dxInitStr = await fsAsync.readFile('./templates/dx-init.js');
        await fsAsync.writeFile(dxInitFileName, dxInitStr);
    }
    if (!fs.existsSync(dxExampleScriptFileName)) {
        console.log("Creating Divblox example script...");
        const dxExampleScriptStr = await fsAsync.readFile('./templates/divblox-example.js');
        await fsAsync.writeFile(dxExampleScriptFileName, dxExampleScriptStr);
    }
    console.log("Done!");
}
createDefaults();