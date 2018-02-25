const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

var Client = require("./models/Client.js")
var config = require('./config.js');

module.exports = function(passport){
	passport.use(new Strategy(
		function(token,done){
			Client.findOne({
				token:token
			},function(err,user){
				if(err){
					return done(err);
				}
				if(!user){
					return done(null,false);
				}
				return done(null,user);
		});
	}))
}