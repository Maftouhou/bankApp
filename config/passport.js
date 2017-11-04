var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var AuthUser = require('../models/authModel');
var config = require('../config/main');

module.exports = function(passport){
    var opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader(); // Old Version 
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        AuthUser.findone({id: jwt_payload.id}, function(err, authUser){
            if(err) return done(err, false);
            if(authUser) done(null, authUser);
            else done(null, false);
        });
    }));
};
