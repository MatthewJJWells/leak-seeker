const controller = require('./controller.js');
const router = require('express').Router();

// GET ALL - FOR TESTING
router.get('/getallfaults', (req, res) => controller.getFunction(req, res));

// GET SPECIFIC FAULTS
router.get('/search/:reg', (req, res) => controller.getFaultsFromReg(req, res));

router.post('/addfault', (req, res) => controller.addFault(req, res));

module.exports = router;
