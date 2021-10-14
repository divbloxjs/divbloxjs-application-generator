const dx = require('../../dx-app');
const exampleSafeToDeleteController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class ExampleSafeToDelete extends divbloxEndpointBase {
    constructor() {
        super();
        // We add a custom operation declaration here
        this.addOperations(["test"]);
    }

    async executeOperation(operation, request) {
        await super.executeOperation(operation, request);

        // Here we have to deal with our custom operations
        switch(operation) {
            case 'test': await this.test();
                break;
        }
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