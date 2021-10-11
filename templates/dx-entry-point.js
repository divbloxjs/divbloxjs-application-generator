// Get the divblox instance
const dx = require('../dx-app');

// Call initDx to setup divblox with all the correct configurations
const isSilent = process.argv.includes("is-silent");
dx.startDx(isSilent);