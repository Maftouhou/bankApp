var OpperationModel = require('../models/instantOpperationModel');

var instantOpperationDao = function(){

    /**
     * Get all Opperation in the database
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperation = function(req, res, next){
        console.log('instantOpp is here !!');
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
                    
        OpperationModel.create(req.body).then(function(instantOpp){
            res.status(201);
            res.send(instantOpp);
            res.end();
        }).catch(next);
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
