'use strict';
var mongoose= require('mongoose');
var bcrypt=require('bcrypt');
var Schema=mongoose.Schema;
var userSchema=new Schema({
	name:{type:String,required:true,unique:true},
	username:{type:String,required:true},
	password:{type:String,required:true},
	email:{type:String,required:true}
}, {
    timestamps: true
});
userSchema.methods.generateHash=(password)=>{
	//return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
	return bcrypt.hashSync(password);
};

var user=mongoose.model('proj_members',userSchema);

module.exports=user;