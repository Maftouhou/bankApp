var UserDao = require('../dao/userDao');

var userSvc = function(){

    /**
     * Search for spesific user
     * Or get all users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllUsers = function(req, res, next){

        return new UserDao().getAllUsers(req, res, next);
    };

    /**
     * Get one users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getOneUser = function(req, res, next){
        
        return new UserDao().getOneUser(req, res, next);
    };

    /**
     * Create a new user
     * 
     * @returns {undefined}
     */
    this.CreateUser = function(req, res, next){
        
        return new UserDao().CreateUser(req, res, next);
    };
    /**
     * Edit an existing user
     * 
     * @returns {undefined}
     */
    this.UpdateUser = function(req, res, next){
        
        return new UserDao().UpdateUser(req, res, next);
    };
    
    /**
     * Delete an existing user
     * 
     * @returns {undefined}
     */
    this.DeleteUser = function(req, res, next){
        
        return new UserDao().DeleteUser(req, res, next);
    };
};

module.exports = userSvc;

