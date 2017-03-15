var express = require('express');
var router = express.Router();
var method = require('./../../../model/method');


/* GET users listing. */
router.get('/api/v1/test', method.test);
router.get('/api/v1/list', method.list);

module.exports = router;
