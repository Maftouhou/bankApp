var AuthModel = require('../models/authModel');
var config = require('../config/main');
var jwt = require('jsonwebtoken');

var authDao = function(){

    /**
     * Create a user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateAuth = function(req, res, next){
        console.log(req.body);
        
        if(!req.body.email || !req.body.password){
            res.json({status:"fail", message: "veillez renseigner un email et un mot de passe."});
        }else {
            // let newUserAuth = { };
            AuthModel.create(req.body).then(function(authUser){
                
                res.send(authUser).end();
            }).catch(next);
        }
    };
    
    /**
     * Authentificate the user
     * 
     * @param {Http} req
     * @param {Http} res
     * @param {Http} next
     */
    this.authUser = function(req, res, next){
        console.log('We are here ');
        AuthModel.findOne({email: req.body.email}).then(function(user){
            if(!user){
                // A ce niveau, renvoyé l'utilisateur à la page de connexion
                res.send({status:"fail", message: "Erreur d'autentification. Aucun utilisateur trouvé"});
            }else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    
                    if(isMatch && !err){
                        let credential = {email: user.email, password: user.password};
                        var token = jwt.sign(credential, config.secret, {
                            expiresIn: 10080 // in seconds
                        });
                        res.json({ success: true, token: 'JWT ' + token });
                    }else{
                        res.send({status:"fail", message: "Erreur d'autentification. Le mot de passe est incorrect."});
                    }
                });
            }
        }).catch(next);
    };
    
};

module.exports = authDao;
