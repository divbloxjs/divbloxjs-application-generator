const dx = require('../dx-app');

async function run() {
    await dx.deregisterPackage();

    process.exit(0);
}

run();