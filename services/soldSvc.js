var SoldDao = require('../dao/soldDao');

var soldSvc = function(){

    /**
     * Get sold
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllSold = function(req, res, next){
        
        return new SoldDao().getAllSold(req, res, next);
    };
    /**
     * Search for spesific user
     * Or get all users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getSold = function(req, res, next){

        return new SoldDao().getSold(req, res, next);
    };

    /**
     * Get one users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateSold = function(req, res, next){
        
        return new SoldDao().CreateSold(req, res, next);
    };

    /**
     * Create a new user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateSoldTemps = function(req, res, next){
        
        return new SoldDao().UpdateSoldTemps()(req, res, next);
    };
    
    /**
     * Update sold from transaction
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     * @param {Object} instantOpp
     */
    this.UpdateSold = function(req, res, next, instantOpp){
        
        return new SoldDao().UpdateSold(req, res, next, instantOpp);
    };

};

module.exports = soldSvc;

