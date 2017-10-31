var OpperationModel = require('../models/instantOpperationModel');
var SoldModel = require('../models/soldModel');
var SoldSvc = require('../services/soldSvc');
var SoldDao = require('../dao/soldDao');

var instantOpperationDao = function(){

    /**
     * Get all Opperation in the database
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperation = function(req, res, next){
        
        if(typeof req.query.typeOpperation === "string"){
            OpperationModel.find({firstname: req.query.firstname}).then(function(instantOpp){
                res.status((instantOpp.length === 0) ? 204 : 200);
                res.send(instantOpp);
                res.end();
            }).catch(next);
        }else{
            OpperationModel.find().then(function(instantOpp){
                res.status((instantOpp.length === 0) ? 204 : 200);
                res.send(instantOpp);
                res.end();
            }).catch(next);
        }
    };

    /**
     * Get one Opperation  in the database
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getOneOpperation = function(req, res, next){
                
        OpperationModel.findOne({_id: req.params.id}).then(function(instantOpp){
            if(instantOpp !== null){
                res.status((instantOpp.length === 0) ? 204 : 200);
                res.send(instantOpp);
                res.end();
            }else{
                res.status(204).end();
            }
        }).catch(next);
    };

    /**
     * Create a new Opperation 
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateOpperation = function(req, res, next){

        SoldModel.findOne({user_id: req.body.user_id}).then(function(sold){
            if(req.body.typeOpperation === 'vir'){
                if(sold.amount < req.body.amount){
                    res.send({"status":"Errore de transaction", "message" : "solde insuffisant"}).end();
                }else {
                    OpperationModel.create(req.body).then(function(instantOpp){
                        new SoldSvc().UpdateSold(req, res, next);
                        res.status(201);
                        res.send(instantOpp);
                        res.end();
                    }).catch(next);
                }
            }else if(req.body.typeOpperation === 'vers'){
                OpperationModel.create(req.body).then(function(instantOpp){
                    new SoldSvc().UpdateSold(req, res, next);
                    res.status(201);
                    res.send(instantOpp);
                    res.end();
                }).catch(next);
            }
        });
    };
    
    /**
     * Edit an existing Opperation 
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateOpperation = function(req, res, next){
                    
        OpperationModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
            OpperationModel.findOne({_id: req.params.id}).then(function(instantOpp){
                if(instantOpp !== null){
                    res.status(200);
                    res.send(instantOpp);
                    res.end();
                }else{
                    res.status(204).end();
                }
            }).catch(next);
        }).catch(next);
    };
    
    /**
     * Delete an existing Opperation 
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next
     */
    this.DeleteOpperation = function(req, res, next){
                    
        OpperationModel.findByIdAndRemove({_id: req.params.id}).then(function(instantOpp){
            if(instantOpp !== null){
                res.status(200);
                res.send(instantOpp);
                res.end();
            }else{
                res.status(204).end();
            }
        }).catch(next);
    };
};

module.exports = instantOpperationDao;
