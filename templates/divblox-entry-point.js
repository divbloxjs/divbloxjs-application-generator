// Get the divblox instance
const dx = require('../dx-app');

// Call initDx to setup divblox with all the correct configurations
dx.initDx();

// Assign the divblox instance to a global variable to be used where needed.
global.dx = dx;