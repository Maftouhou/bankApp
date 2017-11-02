var express = require('express');
var router = express.Router();
var scheduledOppSvc = require('../services/scheduledOppSvc');
var updateInstantOppSvc = require('../services/updateInstantOppSvc');

/**
 * Get one users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/:id', function(req, res, next) {
    
    return new scheduledOppSvc().getOneOpperation(req, res, next);
});

/**
 * Search for spesific user
 * Or get all users
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.get('/', function(req, res, next) {
    
    // Executer les opperation programmer manuellement 
    // Action à prevoir pour une execution automatique
    // return new updateInstantOppSvc().getAllOpperations(req, res, next);
    
    // Processus normal de recuperation des opperation programmés
    return new scheduledOppSvc().getAllOpperation(req, res, next);
});

/**
 * Create a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.post('/', function (req, res, next) {
    
    return new scheduledOppSvc().CreateOpperation(req, res, next);
});

/**
 * Update a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.put('/:id', function (req, res, next) {
    
    return new scheduledOppSvc().UpdateOpperation(req, res, next);
});

/**
 * Delete a user
 * 
 * @param {Http} req 
 * @param {Http} res 
 * @param {Http} next 
 */
router.delete('/:id', function (req, res, next) {

    return new scheduledOppSvc().DeleteOpperation(req, res, next);
});

module.exports = router;
