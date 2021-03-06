'use strict';
var passport = require('passport');
var bcrypt=require('bcrypt');
var localStrategy= require('passport-local').Strategy;
const User= require('./../db/dbSetup');
passport.serializeUser((user,done)=>{
	done(null,user.id);
})
passport.deserializeUser((id,done)=>{
	User.findById(id,(err,user)=>{
		done(err,user);
	})
})
passport.use('local-login',new localStrategy((username,password,done)=>{
    User.findOne({ username: username }, function (err, user) {
		if(err) return done(err);
		if(!user) return done(null, false);
		if(!bcrypt.compareSync(password,user.password)) {
			console.log("User authentication failed!");
			console.log(password+"User authentication failed!"+user.password+" status: "+bcrypt.compareSync(password,user.password));
			return done(null, false);
		}
		return done(null, user);
	})
}));
module.exports=passport;