const controller = require('./controller.js');
const router = require('express').Router();

// Get all faults -> for testing
router.get('/getallfaults', (req, res) => controller.getFunction(req, res));

// Get specific faults
router.get('/search/:reg', (req, res) => controller.getFaultsFromReg(req, res));

router.post('/addfault', (req, res) => controller.addFault(req, res));

module.exports = router;
