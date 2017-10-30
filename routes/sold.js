var express = require('express');
var router = express.Router();
var SoldDao = require('../dao/soldDao');

/**
 * Get one users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', function(req, res, next) {
    
    return new SoldDao().getSold(req, res, next);
});

/**
 * return null to prevent stack err
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', function(req, res, next) {
    res.status(204).end();
    return;
});

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    
    return new SoldDao().CreateSold(req, res, next);
});

/**
 * Update a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', function (req, res, next) {
    
    return new SoldDao().UpdateSold(req, res, next);
});

module.exports = router;
