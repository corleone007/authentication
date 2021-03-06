'use strict';
var mongoose= require('mongoose');
var bcrypt=require('bcrypt');
var config=require('./../config/config_users');

mongoose.connect(config.dburl);
var Schema=mongoose.Schema;
var userSchema=new Schema({
	name:{type:String,required:true},
	username:{type:String,required:true},
	password:{type:String,required:true},
	email:{type:String,required:true}
})
userSchema.methods.generateHash=(password)=>{
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

var user=mongoose.model('proj_users',userSchema);

module.exports=user;