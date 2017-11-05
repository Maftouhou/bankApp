var express = require('express');
var router = express.Router();
var AuthDao = require('../dao/authDao');

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    
    return new AuthDao().authUser(req, res, next);
});

module.exports = router;
