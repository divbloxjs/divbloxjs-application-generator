const express = require('express');
const router = express.Router();
const dx = require('../dx-app');

router.all('/', async (req, res, next) => {
    //TODO: This must be updated to look nicer
    res.render('index', { title: 'Divblox API Root' });
});

for (const packageName of Object.keys(dx.packages)) {
    const packageObj = dx.packages[packageName];
    const packageEndpoint = require('../'+packageObj.packageRoot+"/endpoint");
    for (const operation of packageEndpoint.declaredOperations) {
        router.all('/'+packageName+'/'+operation, async (req, res, next) => {
            await packageEndpoint.executeOperation(operation, {"headers":req.headers,"body":req.body,"query":req.query});
            res.send(packageEndpoint.result);
        });
    }
}

module.exports = router;