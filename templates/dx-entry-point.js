// Get the divblox instance
const dx = require('../dx-app');

// Call initDx to setup divblox with all the correct configurations
const isSilent = typeof process.argv["is-silent"] !== "undefined";
dx.startDx(isSilent);