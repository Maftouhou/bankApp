var instantOppDao = require('../dao/instantOpperationDao');

var instantOppSvc = function(){

    /**
     * Search for spesific user
     * Or get all users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperation = function(req, res, next){
        
        return new instantOppDao().getAllOpperation(req, res, next);
    };

    /**
     * Get one users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getOneOpperation = function(req, res, next){
        
        return new instantOppDao().getOneOpperation(req, res, next);
    };

    /**
     * Create a new user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateOpperation = function(req, res, next){
        
        return new instantOppDao().CreateOpperation(req, res, next);
    };
    /**
     * Edit an existing user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateOpperation = function(req, res, next){
        
        return new instantOppDao().UpdateOpperation(req, res, next);
    };
    
    /**
     * Delete an existing user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.DeleteOpperation = function(req, res, next){
        
        return new instantOppDao().DeleteOpperation(req, res, next);
    };
};

module.exports = instantOppSvc;


