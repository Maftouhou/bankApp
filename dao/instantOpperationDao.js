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
        if(typeof req.query.userId === "string"){
            
            getOpperationByUser(req, res, next);
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
     * Get Opperation by user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    var getOpperationByUser = function(req, res, next){
        
        OpperationModel
            .find({ $or:[{ "user_id": req.query.userId}, {"co_author_id": req.query.userId}] })
            .then(function(instantOpp){
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
            }else if(req.body.user_sold < req.body.amount){
                res.send({"status":"Errore de transaction", "message" : "solde insuffisant"}).end();
            }else {
                req.body.co_author_id = sold.user_id;
                delete req.body.account_num;
                delete req.body.user_sold;
                
                OpperationModel.create(req.body).then(function(instantOpp){
                    new SoldSvc().UpdateSold(req, res, next, instantOpp);
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
