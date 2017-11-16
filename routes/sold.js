var express = require('express');
var router = express.Router();
var SoldSvc = require('../dao/soldDao');
var passport = require('passport');

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new SoldSvc().getSold(req, res, next);
});

/**
 * return null to prevent stack err
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    return new SoldSvc().getAllSold(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new SoldSvc().CreateSold(req, res, next);
});

/**
 * 
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    
    return new SoldSvc().UpdateSoldTemps(req, res, next);
});

module.exports = router;
