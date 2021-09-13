#!/usr/bin/env node

const fs = require("fs");
const fsAsync = require("fs").promises;
const path = require('path')
const dxUtils = require('dx-utils');
const divbloxRoot = "";
const divbloxConfigRoot = divbloxRoot+"divblox-config/";
const dataModelFileName = divbloxConfigRoot+'data-model.json';
const dxConfigFileName = divbloxConfigRoot+'dxconfig.json';
const dxExampleScriptFileName = divbloxRoot+'divblox-example.js';
const dxInitFileName = divbloxConfigRoot+'dx-init.js';
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')


async function isEmptyDirectoryAsync (directory) {
    return new Promise((accept, reject) => {
        isEmptyDirectory(directory, accept);
    });
}

function isEmptyDirectory (directory, fn) {
    fs.readdir(directory, function (err, files) {
        if (err && err.code !== 'ENOENT') throw err
        fn(!files || !files.length)
    })
}
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
        const dxDataModelDefaultStr = await fsAsync.readFile(TEMPLATE_DIR+'/data-model.json');
        await fsAsync.writeFile(dataModelFileName, dxDataModelDefaultStr);
    }
    if (!fs.existsSync(dxConfigFileName)) {
        console.log("Creating Divblox default config file...");
        const dxConfigDefaultStr = await fsAsync.readFile(TEMPLATE_DIR+'/dxconfig.json');
        await fsAsync.writeFile(dxConfigFileName, dxConfigDefaultStr);
    }
    if (!fs.existsSync(dxInitFileName)) {
        console.log("Creating Divblox custom init file...");
        const dxInitStr = await fsAsync.readFile(TEMPLATE_DIR+'/dx-init.js');
        await fsAsync.writeFile(dxInitFileName, dxInitStr);
    }
    if (!fs.existsSync(dxExampleScriptFileName)) {
        console.log("Creating Divblox example script...");
        const dxExampleScriptStr = await fsAsync.readFile(TEMPLATE_DIR+'/divblox-example.js');
        await fsAsync.writeFile(dxExampleScriptFileName, dxExampleScriptStr);
    }
    console.log("Done!");
}

async function prepareApplication() {
    const appName = await dxUtils.getCommandLineInput("Application name:");
    const isDirectoryEmpty = await isEmptyDirectoryAsync('.');
    if (isDirectoryEmpty) {
        createApplication(appName)
    } else {
        const confirmed = await dxUtils.getCommandLineInput('The destination is not empty. If you ' +
            'continue divblox will clean the directory before starting. Continue? [y/N]');
        if (confirmed.toLowerCase() === 'y') {
            process.stdin.destroy();
            createApplication(appName);
        } else {
            console.error('aborting');
            process.exit(1);
        }
    }
}
async function createApplication(appName) {
    createDefaults();
}


prepareApplication();
