var scheduledOppDao = require('../dao/scheduledOpperationDao');

var scheduledOppSvc = function(){

    /**
     * Search for spesific user
     * Or get all users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperation = function(req, res, next){
        
        return new scheduledOppDao().getAllOpperation(req, res, next);
    };

    /**
     * Get one users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getOneOpperation = function(req, res, next){
        
        return new scheduledOppDao().getOneOpperation(req, res, next);
    };

    /**
     * Create a new user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateOpperation = function(req, res, next){
        
        return new scheduledOppDao().CreateOpperation(req, res, next);
    };
    /**
     * Edit an existing user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateOpperation = function(req, res, next){
        
        return new scheduledOppDao().UpdateOpperation(req, res, next);
    };
    
    /**
     * Delete an existing user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.DeleteOpperation = function(req, res, next){
        
        return new scheduledOppDao().DeleteOpperation(req, res, next);
    };
};

module.exports = scheduledOppSvc;


