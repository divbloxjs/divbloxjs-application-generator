const dx = require('../../dx-app');

/**
 * This function wraps some example functions to see how we can use Divblox in a specific script
 * @return {Promise<void>}
 */
doExampleContent = async () => {
    if ((typeof dx === "undefined") || (dx === null)) {
        throw new Error("Divblox instance was not provided");
    }
    // Let's create a new row for the object of type "exampleEntity" in the database with some parameters
    const objId = await dx.create("exampleEntity", {"exampleDateTime":"2021-01-01 12:00:00","exampleString":"An example string","exampleNumber":123,"exampleText":"Example text"});
    if (objId === -1) {
        console.log("Failed to create new exampleEntity: "+JSON.stringify(dx.getError()));
    } else {
        // Divblox will always return the database table id for the newly created entry
        console.log("New exampleEntity created!");

        // Let's read the entry from the database. This basically performs a "SELECT from `exampleEntity` WHERE `id` = objId"
        const obj = await dx.read("exampleEntity", objId);
        if (obj !== null) {
            console.log("Found: "+JSON.stringify(obj, null, 2));
        } else {
            console.log("Not found: "+JSON.stringify(dx.getError()));
        }

        // Let's try and change something on this object using the "update" function
        if (!await dx.update("exampleEntity", {"id":objId, "exampleString":"An updated string", "exampleNumber":999})) {
            console.log("Error updating: "+JSON.stringify(dx.getError()));
        } else {
            console.log("Updated!");
        }

        //Let's try deleting an account using the "delete" function and specifying the exampleEntity's id
        if (!await dx.delete("exampleEntity", 2)) {
            console.log("Error deleting: "+JSON.stringify(dx.getError()));
        } else {
            console.log("Deleted!");
        }
    }
}

doExampleContent();

module.exports = {
    doExampleContent
};