const dx = require('../dx-app');

async function run(operation) {
    await dx.manageGlobalIdentifierGroupings(operation);

    process.exit(0);
}

function getOperation() {
    if (process.argv.includes("show")) {
        return "show";
    }

    if (process.argv.includes("create")) {
        return "create";
    }

    if (process.argv.includes("modify")) {
        return "modify";
    }

    if (process.argv.includes("remove")) {
        return "remove";
    }

    console.log("Provide an operation please show|create|modify|remove");
    return "show";
}

run(getOperation());

