var SoldModel = require('../models/soldModel');
var db = require('../dao/db_connection');

var soldDao = function(){

    /**
     * Get sold
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getSold = function(req, res, next){
        
        SoldModel.findOne({_id: req.params.id}).then(function(sold){
            if(sold !== null){
                res.status((sold.length === 0) ? 204 : 200);
                res.send(sold);
                res.end();
            }else{
                res.status(204).end();
            }
        }).catch(next);
    };

    /**
     * Create sold
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.CreateSold = function(req, res, next){
        
        SoldModel.create(req.body).then(function(sold){
            res.status(201);
            res.send(sold);
            res.end();
        }).catch(next);
    };
    
    /**
     * Update sold on demande
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateSoldTemps = function(req, res, next){
        
        SoldModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
            SoldModel.findOne({_id: req.params.id}).then(function(sold){
                if(sold !== null){
                    res.status(200);
                    res.send(sold);
                    res.end();
                }else{
                    res.status(204).end();
                }
            }).catch(next);
        }).catch(next);
    };
    
    /**
     * Update sold from transaction
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.requestUpdateSold = function(req, res, next){
        SoldModel.findOne({user_id: req.body.user_id}).then(function(sold){
            let soldDataField = {
                user_id: sold.user_id,
                curentAmount: sold.amount,
                oppType: req.body.typeOpperation
            };
            
            if(soldDataField.oppType === 'vir'){
                if(req.body.amount > soldDataField.curentAmount){
                    let transactionErrMsg = {
                        status: "Solde insuffisant",
                        message: "Votre sold actuelle etant de " + soldDataField.curentAmount + " ne vous permet pas de faire un virement d'un montant de " + req.body.amount
                    };
                    
                }else{
                    let newAmont = {amount: soldDataField.curentAmount -  Number(req.body.amount)};
                    SoldModel.findOneAndUpdate({user_id: soldDataField.user_id}, newAmont).then(function(){});
                }
            }else if(soldDataField.oppType === 'vers'){
                let newAmont = {amount: soldDataField.curentAmount + Number(req.body.amount)};
                SoldModel.findOneAndUpdate({user_id: soldDataField.user_id}, newAmont).then(function(){});
            }
        }).catch(next);
    };
};

module.exports = soldDao;
