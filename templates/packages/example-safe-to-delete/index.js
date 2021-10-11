const dx = require('../../dx-app');
const divbloxPackageControllerBase = require('divbloxjs/dx-core-modules/package-controller-base');

class ExampleSafeToDelete extends divbloxPackageControllerBase {
    constructor() {
        super();
    }
    /**
     * This function wraps some example functions to see how we can use Divblox in a specific script
     * @return {Promise<void>}
     */
    doExampleCrud = async () => {
        if ((typeof dx === "undefined") || (dx === null)) {
            throw new Error("Divblox instance was not provided");
        }
        // Let's create a new row for the object of type "exampleEntityOne" in the database with some parameters
        const objId = await dx.create("exampleEntityOne", {"exampleOneTimeStamp":"2021-01-01 12:00:00","exampleOneStringWithoutNull":"Example String","exampleOneBigInt":123,"exampleOneText":"Example text"});
        if (objId === -1) {
            console.log("Failed to create new exampleEntityOne: "+JSON.stringify(dx.getError()));
        } else {
            // Divblox will always return the database table id for the newly created entry
            console.log("New exampleEntityOne created!");

            // Let's read the entry from the database. This basically performs a "SELECT from `exampleEntityOne` WHERE `id` = objId"
            const obj = await dx.read("exampleEntityOne", objId);
            if (obj !== null) {
                console.log("Found: "+JSON.stringify(obj, null, 2));
            } else {
                console.log("Not found: "+JSON.stringify(dx.getError()));
            }

            // Let's try and change something on this object using the "update" function
            if (!await dx.update("exampleEntityOne", {"id":objId, "exampleOneStringWithNull":"An updated string", "exampleOneBigInt":999})) {
                console.log("Error updating: "+JSON.stringify(dx.getError()));
            } else {
                console.log("Updated!");
            }

            //Let's try deleting an account using the "delete" function and specifying the exampleEntityOne's id
            if (!await dx.delete("exampleEntityOne", 2)) {
                console.log("Error deleting: "+JSON.stringify(dx.getError()));
            } else {
                console.log("Deleted!");
            }
        }
    }
}
const exampleSafeToDeleteInstance = new ExampleSafeToDelete();

module.exports = exampleSafeToDeleteInstance;