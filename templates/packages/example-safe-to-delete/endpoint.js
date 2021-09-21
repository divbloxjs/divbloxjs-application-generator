const dx = require('../../dx-app');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class ExampleSafeToDelete extends divbloxEndpointBase {
    constructor() {
        super();
    }
}
const ExampleSafeToDeleteInstance = new ExampleSafeToDelete();
module.exports = ExampleSafeToDeleteInstance;