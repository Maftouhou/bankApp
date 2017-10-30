var UserModel = require('../models/userModel');

var userDao = function(){

    /**
     * Search for spesific user
     * Or get all users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllUsers = function(req, res, next){
        if(typeof req.query.firstname === "string"){
            return UserModel.find({firstname: req.query.firstname}).then(function(user){
                res.status((user.length === 0) ? 204 : 200);
                res.send(user);
                res.end();
            }).catch(next);
        }else{
            return UserModel.find().then(function(user){
                res.status((user.length === 0) ? 204 : 200);
                res.send(user);
                res.end();
            }).catch(next);
        }
    };

    /**
     * Get one users
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getOneUser = function(req, res, next){
        
        UserModel.findOne({_id: req.params.id}).then(function(user){
            if(user !== null){
                res.status((user.length === 0) ? 204 : 200);
                res.send(user);
                res.end();
            }else{
                res.status(204).end();
            }
        }).catch(next);
    };

    /**
     * Create a user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateUser = function(req, res, next){
        
        UserModel.create(req.body).then(function(user){
            res.status(201);
            res.send(user);
            res.end();
        }).catch(next);
    };
    
    /**
     * Update a user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateUser = function(req, res, next){
            
        UserModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
            UserModel.findOne({_id: req.params.id}).then(function(user){
                if(user !== null){
                    res.status(200);
                    res.send(user);
                    res.end();
                }else{
                    res.status(204).end();
                }
            }).catch(next);
        }).catch(next);
    };
    
    /**
     * Delete a user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.DeleteUser = function(req, res, next){
            
        UserModel.findByIdAndRemove({_id: req.params.id}).then(function(user){
            if(user !== null){
                res.status(200);
                res.send(user);
                res.end();
            }else{
                res.status(204).end();
            }
        }).catch(next);
    };
};

module.exports = userDao;
