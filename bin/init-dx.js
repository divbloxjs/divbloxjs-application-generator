#!/usr/bin/env node

const fs = require("fs");
const fsAsync = require("fs").promises;
const path = require("path");
const dxUtils = require("dx-utilities");
const divbloxRoot = "";
const TEMPLATE_DIR = path.join(__dirname, "..", "templates");
const foldersToCreate = {
    "Divblox config": divbloxRoot + "divblox-config/",
    "Divblox bin": divbloxRoot + "bin/",
    "Divblox routes": divbloxRoot + "divblox-routes/",
    "Divblox packages (local)": divbloxRoot + "divblox-packages-local/",
    "Divblox routes www": divbloxRoot + "divblox-routes/www/",
    "Divblox views": divbloxRoot + "divblox-views/",
    "Divblox public": divbloxRoot + "divblox-public/",
    "Public images": divbloxRoot + "divblox-public/images",
    "Public javascripts": divbloxRoot + "divblox-public/javascripts",
    "Public stylesheets": divbloxRoot + "divblox-public/stylesheets",
};
const filesToCreate = {
    Package: {
        location: divbloxRoot + "package.json",
        template: TEMPLATE_DIR + "/configs/package.json",
        tokens: ["appName"],
    },
    "Divblox Config": {
        location: divbloxRoot + "divblox-config/dxconfig.json",
        template: TEMPLATE_DIR + "/configs/dxconfig.json",
        tokens: ["appName"],
    },
    "Divblox Config Readme": {
        location: divbloxRoot + "divblox-config/dxconfig-readme.md",
        template: TEMPLATE_DIR + "/configs/dxconfig-readme.md",
        tokens: ["dxConfigExample"],
    },
    "Divblox Entry Point": {
        location: divbloxRoot + "bin/dx-entry-point.js",
        template: TEMPLATE_DIR + "/dx-entry-point.js",
    },
    "Divblox Dev Entry Point": {
        location: divbloxRoot + "bin/dx-run-dev.js",
        template: TEMPLATE_DIR + "/dx-run-dev.js",
        tokens: ["appName"],
    },
    "Docker Compose File": {
        location: divbloxRoot + "docker-compose.yml",
        template: TEMPLATE_DIR + "/docker-compose.yml",
        tokens: ["appName"],
    },
    "Divblox App": {
        location: divbloxRoot + "dx-app.js",
        template: TEMPLATE_DIR + "/dx-app.js",
    },
    "Divblox local packages readme": {
        location: divbloxRoot + "divblox-packages-local/packages.md",
        template: TEMPLATE_DIR + "/infos/dx-packages-readme.md",
    },
    "Divblox data models readme": {
        location: divbloxRoot + "divblox-packages-local/data-models.md",
        template: TEMPLATE_DIR + "/infos/data-models-readme.md",
    },
    "Divblox index route": {
        location: divbloxRoot + "divblox-routes/www/index.js",
        template: TEMPLATE_DIR + "/routes/www/index.js",
    },
    "Divblox additional example route": {
        location: divbloxRoot + "divblox-routes/www/additional-example.js",
        template: TEMPLATE_DIR + "/routes/www/additional-example.js",
    },
    "Divblox error view": {
        location: divbloxRoot + "divblox-views/error.pug",
        template: TEMPLATE_DIR + "/views/error.pug",
    },
    "Divblox index view": {
        location: divbloxRoot + "divblox-views/index.pug",
        template: TEMPLATE_DIR + "/views/index.pug",
    },
    "Divblox layout view": {
        location: divbloxRoot + "divblox-views/layout.pug",
        template: TEMPLATE_DIR + "/views/layout.pug",
    },
    "Divblox package register script": {
        location: divbloxRoot + "bin/dx-register-package.js",
        template: TEMPLATE_DIR + "/dx-register-package.js",
    },
    "Divblox package deregister script": {
        location: divbloxRoot + "bin/dx-deregister-package.js",
        template: TEMPLATE_DIR + "/dx-deregister-package.js",
    },
    "Divblox global identifier grouping management script": {
        location: divbloxRoot + "bin/dx-manage-identifier-groupings.js",
        template: TEMPLATE_DIR + "/dx-manage-identifier-groupings.js",
    },
};

/**
 * An async wrapper for the isEmptyDirectory function
 * @param directory The path to the directory
 * @return {Promise<boolean>} True if directory is empty
 */
async function isEmptyDirectoryAsync(directory) {
    return new Promise((accept, reject) => {
        isEmptyDirectory(directory, accept);
    });
}

/**
 * Checks whether a directory is empty
 * @param directory The path to the directory
 * @param fn The callback function that is called with the result
 */
function isEmptyDirectory(directory, fn) {
    fs.readdir(directory, function (err, files) {
        if (err && err.code !== "ENOENT") throw err;
        fn(!files || !files.length);
    });
}

/**
 * Normalizes an appName, fitting npm naming requirements.
 * Copied from https://github.com/expressjs/generator/blob/master/bin/express-cli.js
 * @param {String} appName
 */
function getNormalizeAppName(appName) {
    return appName
        .replace(/[^A-Za-z0-9.-]+/g, "-")
        .replace(/^[-_.]+|-+$/g, "")
        .toLowerCase();
}

/**
 * Creates the minimum configuration files needed for Divblox to be initiated
 * @returns {Promise<void>}
 */
async function createDefaults(appName) {
    dxUtils.printHeadingMessage("Initializing Divblox...");
    for (const folderDescription of Object.keys(foldersToCreate)) {
        if (!fs.existsSync(foldersToCreate[folderDescription])) {
            dxUtils.printInfoMessage("Creating " + folderDescription + " directory...");
            fs.mkdirSync(foldersToCreate[folderDescription]);
        }
    }
    for (const fileDescription of Object.keys(filesToCreate)) {
        dxUtils.printInfoMessage("Creating " + fileDescription + "...");
        let fileContentStr = await fsAsync.readFile(filesToCreate[fileDescription].template);
        let dxConfigExampleStr = await fsAsync.readFile(TEMPLATE_DIR + "/configs/dxconfig.json");
        fileContentStr = fileContentStr.toString();
        dxConfigExampleStr = dxConfigExampleStr.toString();
        const tokensToReplace = {
            appName: appName,
            dxConfigExample: dxConfigExampleStr,
        };
        const availableTokensToReplace = filesToCreate[fileDescription].tokens;
        if (typeof availableTokensToReplace !== "undefined") {
            for (const token of availableTokensToReplace) {
                if (Object.keys(tokensToReplace).includes(token)) {
                    const search = "[" + token + "]";
                    let done = false;
                    while (!done) {
                        done = fileContentStr.indexOf(search) === -1;
                        //TODO: This should be done with the replaceAll function
                        fileContentStr = fileContentStr.replace(search, tokensToReplace[token]);
                    }
                }
            }
        }

        await fsAsync.writeFile(filesToCreate[fileDescription].location, fileContentStr);
    }
    dxUtils.printSuccessMessage("Divblox initialization done!");
}

/**
 * Handles the command line input that is used to prepare the npm package for the new project
 * @return {Promise<void>}
 */
async function prepareApplication() {
    const appName = await dxUtils.getCommandLineInput("Application name:");
    const isDirectoryEmpty = await isEmptyDirectoryAsync(".");
    if (isDirectoryEmpty) {
        createApplication(appName);
    } else {
        const confirmed = await dxUtils.getCommandLineInput(
            "The destination is not empty. " + "Certain files might be overridden. Continue? [y/N]"
        );
        if (confirmed.toLowerCase() === "y") {
            process.stdin.destroy();
            createApplication(appName);
        } else {
            console.error("aborting");
            process.exit(1);
        }
    }
}

/**
 * Creates a new node package with the given name and installs divbloxjs
 * @param appName The appName provided via the command line
 * @return {Promise<void>}
 */
async function createApplication(appName) {
    const normalizedAppName = getNormalizeAppName(appName);
    dxUtils.printSubHeadingMessage("Creating application '" + normalizedAppName + "' ");
    await createDefaults(normalizedAppName);

    dxUtils.printInfoMessage("Installing divbloxjs...");
    const createResult = await dxUtils.executeCommand("npm install divbloxjs");
    if (typeof createResult === "undefined" || createResult === null) {
        console.error("Could not install divbloxjs. Please restart the installer.");
        return;
    }
    if (createResult.stdout.length > 0) {
        dxUtils.printSuccessMessage("divbloxjs install result: " + createResult.stdout);
        dxUtils.printInfoMessage("You can now start divblox with: ");
        dxUtils.printTerminalMessage("npm run dev");
        dxUtils.printInfoMessage("Note: this requires docker to be installed");
        dxUtils.printInfoMessage(
            "Alternatively, if you have your own database service configured, start your instance with"
        );
        dxUtils.printTerminalMessage("npm start");
        dxUtils.printInfoMessage("or: ");
        dxUtils.printTerminalMessage("npm run start-silent");
        dxUtils.printInfoMessage(
            "to ignore database checks " +
                "(Useful when running with a process manager like pm2 to ensure uninterrupted restarts).\n" +
                "To setup your environments, modify the file dxconfig.json located at divblox-config/dxconfig.json"
        );
    } else {
        dxUtils.printErrorMessage("divbloxjs install failed: " + createResult.stderr);
    }
}

// Script entry point
prepareApplication();
