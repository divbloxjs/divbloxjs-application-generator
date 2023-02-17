/**
 * This dx-app script allows us to setup some custom Divblox configuration and initializations that we will be able to
 * use anywhere in our project. Rather than redefine these for every script where we want to use Divblox
 */

const DivbloxBase = require("divbloxjs/divblox");
const DivbloxDataLayerBase = require("divbloxjs/dx-core-modules/data-layer");
const DivbloxWebServiceBase = require("divbloxjs/dx-core-modules/web-service");
const DivbloxJwtWrapperBase = require("divbloxjs/dx-core-modules/jwt-wrapper");

/**
 * This is an implementation of the DivbloxDataLayerBase class. We can use this class to override the core data layer
 * related functionality for Divblox. It is best practice to do this since the base classes can be updated via a
 * package manager.
 * We don't need to create this class if we don't want to and we are happy with the standard Divblox data layer.
 */
class DivbloxDataLayer extends DivbloxDataLayerBase {
    constructor(databaseConnector = null, dataModel = {}) {
        super(databaseConnector, dataModel);
        console.log("Custom data layer loaded");
    }
}

/**
 * This is an implementation of the DivbloxWebServiceBase class. We can use this class to override the web service
 * related functionality for Divblox. It is best practice to do this since the base classes can be updated via a
 * package manager.
 * We don't need to create this class if we don't want to and we are happy with the standard Divblox web service base.
 */
class DivbloxWebService extends DivbloxWebServiceBase {
    constructor(config = {}, dxInstance = null) {
        super(config, dxInstance);
        console.log("Custom web service loaded");
    }
}

/**
 * This is an implementation of the DivbloxJwtWrapperBase class. We can use this class to override the core jwt wrapper
 * related functionality for Divblox. It is best practice to do this since the base classes can be updated via a
 * package manager.
 * We don't need to create this class if we don't want to and we are happy with the standard Divblox jwt wrapper.
 */
class DivbloxJwtWrapper extends DivbloxJwtWrapperBase {
    constructor(jwtSecret = "secret", dxInstance = null) {
        super(jwtSecret, dxInstance);
        console.log("Custom JWT wrapper loaded");
    }
}

/**
 * Again, we create an implementation of the DivbloxBase class here in order to modify any core functionality if
 * required. It is best practice to do this since the base classes can be updated via a package manager
 */
class Divblox extends DivbloxBase {
    async startDx(mustSkipDatabaseSync = false, skipUserPrompts = false) {
        const successfulStart = await super.startDx(mustSkipDatabaseSync, skipUserPrompts);
        if (!successfulStart) {
            this.printLastError();
            return;
        }
        // Any after-start code you want to execute here...
    }
}

// Let's create an instance of Divblox. This requires a config path, a data model path and an optional datalayer
// implementation class
const dx = new Divblox({
    configPath: "./divblox-config/dxconfig.json",
    dataLayerImplementationClass: DivbloxDataLayer /*Can also be null if you want to use the default data layer*/,
    webServiceImplementationClass: DivbloxWebService /*Can also be null if you want to use the default web service*/,
    jwtWrapperImplementationClass: DivbloxJwtWrapper /*Can also be null if you want to use the default jwt wrapper*/,
});

module.exports = dx;
