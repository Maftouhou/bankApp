var express = require('express');
var router = express.Router();
var AuthDao = require('../dao/authDao');

// var UserModel = require('../models/userModel');

/**
 * Search for spesific user
 * Or get all users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', function(req, res, next) {

    return new AuthDao().getAllAccount(req, res, next);
});

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    
    if(!req.body.user_id){
        return new AuthDao().authUser(req, res, next);
    }else{
        return new AuthDao().CreateAuth(req, res, next);
    }
});

module.exports = router;
