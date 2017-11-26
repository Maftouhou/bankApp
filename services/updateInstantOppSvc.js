var scheduledOppDao = require('../dao/scheduledOpperationDao');
var schedulOpperationModel = require('../models/scheduledOpperationModel');
var instantOpperationModel = require('../models/instantOpperationModel');
var SoldModel = require('../models/soldModel');
var SoldSvc = require('../services/soldSvc');

var updateInstantOppSvc = function(){

    /**
     * Get all undone opperation from all scheduled opperation
     * and premare them to run
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     */
    this.getAllOpperations = function(req, res, next){
        var undoneOpp = [];
        
        schedulOpperationModel.find().then(function(data){
            if(data !== null){
                for(let i = 0; i < data.length; i++){
                    if(data[i].statusOpperation === "undone"){
                        undoneOpp.push(data[i]);
                    }
                }
                prepareDataForUpdate(req, res, next, undoneOpp);
            }else{
                res.status(204).end();
            }
        });
        // res.end();
    };
    
    /**
     * Insert all pending opperation to the data base
     * 
     * @param {Http} req 
     * @param {Http} res 
     * @param {Http} next 
     * @param {Object} data
     */
    var prepareDataForUpdate = function(req, res, next, data){
        let newOpperation = {};
        for(let i = 0; i < data.length; i++){
            newOpperation.user_id = data[i].user_id;
            newOpperation.co_author_id = data[i].co_author_id;
            newOpperation.description = data[i].description;
            newOpperation.amount = data[i].amount;
            newOpperation.dateOpperation = data[i].dateOpperation;
            
            updateInstantOpp(req, res, next, data[i]._id, data[i].user_id, data[i].co_author_id, data[i].description, data[i].amount, data[i].dateOpperation);
        }
    };
    
    var updateInstantOpp = function(req, res, next, schOppId, schOppUserId, schOppCo_author_id, schOppDescription, schOppAmount, schOppDateOpperation){
        var newOpperation = {
            user_id : schOppUserId,
            co_author_id : schOppCo_author_id,
            description : schOppDescription,
            amount : schOppAmount,
            dateOpperation : schOppDateOpperation
        };
        
        
        SoldModel.findOne({user_id: newOpperation.user_id}).then(function(sold){
            
            if(newOpperation.dateOpperation.toLocaleString() <= new Date().toLocaleString()){
                // console.log(newOpperation.dateOpperation.toLocaleString() <= new Date().toLocaleString());
                if(sold.amount < schOppAmount){
                    let errUpdateInfo = {
                        "statusRepport.status":"Fail", 
                        "statusRepport.comment" : "solde insuffisant"};
                    schedulOpperationModel.findOneAndUpdate({_id: schOppId}, errUpdateInfo).then(function(){});
                }else {
                    let successUpdateInfo = {
                        "statusOpperation":"done",
                        "statusRepport.status":"success", 
                        "statusRepport.comment" : "transaction effectué"};
                    instantOpperationModel.create(newOpperation).then(function(instantOpp){
                        new SoldSvc().UpdateSold(req, res, next, instantOpp);
                        schedulOpperationModel.findOneAndUpdate({_id: schOppId}, successUpdateInfo).then(function(){});
                    }).catch(next);
               }
            }/**/
        });
    };
    
    var updateStatusScheduledOpp = function(data){
        console.log(data);
    };

};

module.exports = updateInstantOppSvc;


