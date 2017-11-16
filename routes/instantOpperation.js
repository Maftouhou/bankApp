var express = require('express');
var router = express.Router();
var InstantOppSvc = require('../services/instantOppSvc');
var instantOpp = require('../dao/instantOpperationDao');
var passport = require('passport');

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new InstantOppSvc().getOneOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new InstantOppSvc().getAllOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new InstantOppSvc().CreateOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new InstantOppSvc().UpdateOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    return new InstantOppSvc().DeleteOpperation(req, res, next);
});

module.exports = router;
