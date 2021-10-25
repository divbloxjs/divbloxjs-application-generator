const dx = require('../../dx-app');
const exampleSafeToDeleteController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class ExampleSafeToDelete extends divbloxEndpointBase {
    constructor() {
        super();
        // We add a custom operation declaration here
        const testOperation = {
            "operationName": "test",
            "allowedAccess": ["anonymous"]
        };
        this.declareOperations([testOperation]);
    }

    async executeOperation(operation, request, dxInstance = null) {
        if (!await super.executeOperation(operation, request, dxInstance)) {
            return false;
        }

        // Here we have to deal with our custom operations
        switch(operation) {
            case 'test': await this.test();
                break;
        }

        return true;
    }

    /**
     * Our custom operation's implementation
     * @return {Promise<void>}
     */
    async test() {
        await exampleSafeToDeleteController.doExampleCreate();
        this.setResult(true, "You called the test operation");
    }
}
const exampleSafeToDeleteInstance = new ExampleSafeToDelete();
module.exports = exampleSafeToDeleteInstance;