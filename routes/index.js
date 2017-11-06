var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/',  passport.authenticate('jwt', { session: false }), function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send({
        "info": "setup is done",
        "user": req.user
    });
});

module.exports = router;
