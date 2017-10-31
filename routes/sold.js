var express = require('express');
var router = express.Router();
var SoldSvc = require('../dao/soldDao');

/**
 * Get one users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', function(req, res, next) {
    
    return new SoldSvc().getSold(req, res, next);
});

/**
 * return null to prevent stack err
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', function(req, res, next) {
    
    return new SoldSvc().getAllSold(req, res, next);
});

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    
    return new SoldSvc().CreateSold(req, res, next);
});

/**
 * Update a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', function (req, res, next) {
    
    return new SoldSvc().UpdateSoldTemps(req, res, next);
});

module.exports = router;
