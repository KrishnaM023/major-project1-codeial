const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home); // home is exported from home_Controlle file
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

// For any further routes, access from here
// router.use('/routerName', require('./routerFile'));

module.exports = router;