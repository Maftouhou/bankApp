var SoldModel = require('../models/soldModel');

var soldDao = function(){

    /**
     * Get one users
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
     * Create a user
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
     * Update a user
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.UpdateSold = function(req, res, next){
        
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
};

module.exports = soldDao;
