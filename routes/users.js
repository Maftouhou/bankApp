var express = require('express');
var router = express.Router();
var UserSvc = require('../services/userSvc');
var passport = require('passport');

// var UserModel = require('../models/userModel');

/**
 * Get one users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new UserSvc().getOneUser(req, res, next);
});

/**
 * Search for spesific user
 * Or get all users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new UserSvc().getAllUsers(req, res, next);
});

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    console.log(req.body);
    return new UserSvc().CreateUser(req, res, next);
});

/**
 * Update a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new UserSvc().UpdateUser(req, res, next);
});

/**
 * Delete a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    return new UserSvc().DeleteUser(req, res, next);
});

module.exports = router;
