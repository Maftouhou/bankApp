var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var AuthUser = require('../models/userModel');
var config = require('../config/main');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        AuthUser.findOne({_id: jwt_payload.user._id}, function(err, authUser){
            if(err) return done(err, false);
            if(authUser) done(null, authUser);
            else done(null, false);
        });
    }));
};
