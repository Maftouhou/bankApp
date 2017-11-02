var SoldModel = require('../models/soldModel');
var db = require('../dao/db_connection');

var soldDao = function(){

    /**
     * Get all sold
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllSold = function(req, res, next){
        SoldModel.find().then(function(user){

            res.status((user.length === 0) ? 204 : 200);
            res.send(user);
            res.end();
        }).catch(next);
    };
    
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
     * @param {Object} data 
     */
    this.CreateSoldForUser = function(data){
        
        SoldModel.create(data).then(function(){ });
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
     * @param {Object} instantOpp
     */
    this.UpdateSold = function(req, res, next, instantOpp){
        
        SoldModel.findOne({user_id: (req.body.user_id === undefined ? instantOpp.user_id : req.body.user_id )})
                .then(function(sold){
            
            let soldDataField = {
                user_id: sold.user_id,
                co_author_id: (req.body.user_id === undefined ? instantOpp.co_author_id : req.body.co_author_id ),
                curentAmount: sold.amount,
                newAmount: (req.body.user_id === undefined ? instantOpp.amount : req.body.amount )
            };
            
            SoldModel.findOne({user_id: soldDataField.co_author_id}).then(function(soldToAdd){

                if(soldToAdd === null){
                    res.send({
                        "status":"Errore de transaction", 
                        "message" : "Aucun beneficiaire trouvé.. garde ton fric !!!"}).end();
                }else{
                    let amontWithdraw = {amount: soldDataField.curentAmount -  Number(soldDataField.newAmount)};
                    SoldModel.findOneAndUpdate({user_id: soldDataField.user_id}, amontWithdraw).then(function(){});

                    let amontAdd = {amount: soldToAdd.amount +  Number(soldDataField.newAmount)};
                    SoldModel.findOneAndUpdate({user_id: soldDataField.co_author_id}, amontAdd).then(function(){});
                    
                    if(req.body.user_id !== undefined){
                        res.status(201).send(instantOpp).end();
                    }
                }
            }).catch(next);
            
        }).catch(next);
    };
    
    /**
     * Delete sold for a spesific user
     * 
     * @param {String} userId 
     */
    this.DeleteSold = function(userId){

        SoldModel.findOneAndRemove({user_id: userId}).then(function(sold){});
    };
};

module.exports = soldDao;
