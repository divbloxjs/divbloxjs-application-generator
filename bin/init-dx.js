#!/usr/bin/env node

//TODO: We are currently asking the application name, but not using it for anything. Ensure that we setup a proper
// npm package.

const fs = require("fs");
const fsAsync = require("fs").promises;
const path = require('path')
const dxUtils = require('dx-utils');
const divbloxRoot = "";
const divbloxConfigRoot = divbloxRoot+"divblox-config/";
const divbloxBinRoot = divbloxRoot+"bin/";
const divbloxRoutes = divbloxRoot+"divblox-routes/";
const dataModelFileName = divbloxConfigRoot+'data-model.json';
const dxConfigFileName = divbloxConfigRoot+'dxconfig.json';
const dxExampleScriptFileName = divbloxRoot+'dx-app.js';
const dxInitFileName = divbloxConfigRoot+'dx-init.js';
const dxEntryPointFileName = divbloxBinRoot+'divblox-entry-point.js';
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')
const foldersToCreate = {
    "Divblox config": divbloxRoot+"divblox-config/",
    "Divblox bin": divbloxRoot+"bin/",
    "Divblox routes": divbloxRoot+"divblox-routes/",
    "Divblox views": divbloxRoot+"views/",
    "Divblox public": divbloxRoot+"public/",
    "Public images": divbloxRoot+"public/images",
    "Public javascripts": divbloxRoot+"public/javascripts",
    "Public stylesheets": divbloxRoot+"public/stylesheets",
};
const filesToCreate = {
    "Package": {"location": divbloxRoot+"package.json",
                    "template": TEMPLATE_DIR+'/configs/package.json',
                    "tokens":["appName"]},
    "Data model": {"location": divbloxRoot+"divblox-config/data-model.json",
                    "template": TEMPLATE_DIR+'/configs/data-model.json'},
    "Divblox Config": {"location": divbloxRoot+"divblox-config/dxconfig.json",
                    "template": TEMPLATE_DIR+'/configs/dxconfig.json'},
    "Divblox Init": {"location": divbloxRoot+"divblox-config/dx-init.js",
                    "template": TEMPLATE_DIR+'/dx-init.js'},
    "Divblox Entry Point": {"location": divbloxRoot+"bin/divblox-entry-point.js",
                    "template": TEMPLATE_DIR+'/divblox-entry-point.js'},
    "Divblox App": {"location": divbloxRoot+"dx-app.js",
                    "template": TEMPLATE_DIR+'/dx-app.js'},
}

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
async function createDefaults(appName) {
    console.log("Initializing Divblox...");
    for (const folderDescription of Object.keys(foldersToCreate)) {
        if (!fs.existsSync(foldersToCreate[folderDescription])){
            console.log("Creating "+folderDescription+" directory...");
            fs.mkdirSync(foldersToCreate[folderDescription]);
        }
    }
    for (const fileDescription of Object.keys(filesToCreate)) {
        console.log("Creating "+fileDescription+"...");
        let fileContentStr = await fsAsync.readFile(filesToCreate[fileDescription].template);
        const tokensToReplace = {"appName": appName};
        const availableTokensToReplace = filesToCreate[fileDescription].tokens;
        if (typeof availableTokensToReplace !== "undefined") {
            for (const token of Object.keys(availableTokensToReplace)) {
                if (Object.keys(tokensToReplace).includes(token)) {
                    const search = '['+token+']';
                    const replacer = new RegExp(search, 'g');
                    fileContentStr = fileContentStr.toString().replace(replacer, tokensToReplace[token]);
                }

            }
        }

        await fsAsync.writeFile(filesToCreate[fileDescription].location, fileContentStr);
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
    const normalizedAppName = dxUtils.getCamelCaseSplittedToLowerCase(dxUtils.convertLowerCaseToCamelCase(appName, ' '),'-');
    console.log("Creating application '"+normalizedAppName+"' ");
    await createDefaults(appName);

    console.log("Installing divbloxjs...");
    const createResult = await dxUtils.executeCommand('npm install --save github:divbloxjs/divbloxjs');
    if ((typeof createResult === "undefined") || (createResult === null)) {
        console.error("Could not install divbloxjs. Please restart the installer.");
        return;
    }
    if (createResult.stdout.length > 0) {
        console.log('divbloxjs install result: '+createResult.stdout);
    } else {
        console.log('divbloxjs install failed: '+createResult.stderr);
    }

}


prepareApplication();
