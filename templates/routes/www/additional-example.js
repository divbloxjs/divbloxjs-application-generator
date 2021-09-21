const express = require('express');
const router = express.Router();
const dx = require('../../dx-app');

router.get('/', async (req, res, next) => {
    // res.send('Test route served');
    res.render('index', { title: 'Divblox additional example Root' });
});

module.exports = router;
