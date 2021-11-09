const dx = require('../../dx-app');
const exampleSafeToDeleteController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class ExampleSafeToDelete extends divbloxEndpointBase {
    constructor() {
        super();
        this.endpointName = "my-example";
        this.endpointDescription = "An example endpoint to demonstrate divblox api's";

        // We add a custom operation declaration here
        const testOperation = this.getOperationDefinition(
            {
                "operationName": "test",
                "allowedAccess": ["anonymous"],
                "operationDescription": "This sentence describes the operation",
                "parameters": [
                    this.getInputParameter({"name":"test","type":"header"}),
                    this.getInputParameter({"name":"test2","type":"path"})
                ],
                "requestType": "POST",
                "requestSchema": this.getSchema({"testAttr":"string","testAttr2":"boolean"}),
                "responseSchema": this.getSchema({"respAttr":"string","respAttr2":"boolean"})
            }
        );

        // An example of how to declare operations. You need to do this in order for the operation to be available on
        // the endpoint. Also, this declaration provides the necessary input for swagger ui present the docs for this
        this.declareOperations([testOperation]);

        // An example of how to declare entity schemas for swagger ui
        this.declareEntitySchemas(["globalIdentifier"]);
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