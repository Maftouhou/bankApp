var UserModel = require('../models/userModel');
var SoldModel = require('../models/soldModel');
var SoldDao = require('../dao/soldDao');
var AuthDao = require('../dao/authDao');
var rendomStr = require('randomstring');

var userDao = function(){
  
    /**
     * Add user sold to user informations
     * 
     * @param {Oblect} user 
     * @param {Http} res
     */
    var addSoldToUser = function(user, res) {
        SoldModel.findOne({user_id: user[0] ? user[0]._id : user._id }).then(function(userSold){
            let userData = {
                userInfo: user,
                sold: { 
                    id: userSold ?  userSold._id : 'N/A', 
                    amount: userSold ?  userSold.amount : 0,
                    Account_num: userSold.account_num 
                }
            };

            res.status((user.length === 0) ? 204 : 200);
            res.send(userData).end();
        });
    };
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

                addSoldToUser(user, res);
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
                addSoldToUser(user, res);
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
        
        UserModel.findOne( {email: req.body.email} ).then(function(user){
            if(user !== null){
                res.send({
                    "status" : "Erreur de création", 
                    "message" : "Un utilisateur portant le même adresse email '"+req.body.email+ "' existe déjà !!!"
                }).end();
            }else{
                UserModel.create(req.body).then(function(user){
                    let data = {
                        user_id: user._id
                    };
                    new SoldDao().CreateSoldForUser(data);

                    res.status(201);
                    res.send(user);
                    res.end();
                }).catch(next);
            }
        });
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
                new SoldDao().DeleteSold(user._id);
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
