const dx = require('../dx-app');

async function run() {
    await dx.registerRemotePackage();

    process.exit(0);
}

run();