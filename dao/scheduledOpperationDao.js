var OpperationModel = require('../models/scheduledOpperationModel');
var SoldModel = require('../models/soldModel');
var SoldSvc = require('../services/soldSvc');

var scheduledOpperationDao = function(){

    /**
     * Get all Opperation in the database
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperation = function(req, res, next){

        OpperationModel.find().then(function(scheduledOpp){
            res.status((scheduledOpp.length === 0) ? 204 : 200);
            res.send(scheduledOpp);
            res.end();
        }).catch(next);
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
        
        SoldModel.findOne({account_num: req.body.account_num}).then(function(sold){

            if(sold === null ){
                res.send({"status":"Errore de transaction", 
                    "message" : "Aucun bénéficiaire trouvé avec ce numéro de compte \""+ req.body.account_num +"\" !"}).end();
            }else {
                req.body.co_author_id = sold.user_id;
                delete req.body.account_num;
                delete req.body.user_sold;
                
                OpperationModel.create(req.body).then(function(scheduledOpp){
                    res.status(201).send(scheduledOpp).end();
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

module.exports = scheduledOpperationDao;
