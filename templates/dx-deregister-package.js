const dx = require('../dx-app');

async function run() {
    await dx.deregisterRemotePackage();

    process.exit(0);
}

run();