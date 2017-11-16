var express = require('express');
var router = express.Router();
var scheduledOppSvc = require('../services/scheduledOppSvc');
var updateInstantOppSvc = require('../services/updateInstantOppSvc');
var passport = require('passport');

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new scheduledOppSvc().getOneOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    // Executer les opperation programmer manuellement 
    // Action à prevoir pour une execution automatique
    // return new updateInstantOppSvc().getAllOpperations(req, res, next);
    
    // Processus normal de recuperation des opperation programmés
    return new scheduledOppSvc().getAllOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new scheduledOppSvc().CreateOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new scheduledOppSvc().UpdateOpperation(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    return new scheduledOppSvc().DeleteOpperation(req, res, next);
});

module.exports = router;
