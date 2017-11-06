var UserModel = require('../models/userModel');
var config = require('../config/main');
var jwt = require('jsonwebtoken');

var authDao = function(){
  
    /**
     * Authentificate the user
     * 
     * @param {Http} req
     * @param {Http} res
     * @param {Http} next
     */
    this.authUser = function(req, res, next){
        
        UserModel.findOne({email: req.body.email}).then(function(user){
            if(!user){
                // A ce niveau, renvoyé l'utilisateur à la page de connexion
                res.send({status:"fail", message: "Erreur d'autentification. Aucun utilisateur trouvé"});
            }else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    
                    if(isMatch && !err){
                        var token = jwt.sign({user: user}, config.secret, {
                            expiresIn: 604800 // in seconds
                        });
                        res.json({ success: true, token: 'JWT ' + token, user: user });
                    }else{
                        res.send({status:"fail", message: "Erreur d'autentification. Le mot de passe est incorrect."});
                    }
                });
            }
        }).catch(next);
    };
};

module.exports = authDao;
