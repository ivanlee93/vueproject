var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var ClientSchema = new Schema({
  appid: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  appkey: {
    type: String,
    require: true // 不可为空约束
  },
  token: {
    type: String
  }
});


ClientSchema.pre('save',function(next){
	var client = this;
	if(this.isModified('appkey') || this.isNew){
		bcrypt.genSalt(10, function(err,salt){
			if(err){
				return next(err);
			}
			bcrypt.hash(client.appkey,salt,function(err,hash){
				if(err){
					return next(err);
				}
				client.appkey = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

ClientSchema.methods.comparePassword = function(passw,cb){
	bcrypt.compare(passw,this.appkey,(err,isMatch)=>{
		if(err){
			return cb(err);
		}
		cb(null,isMatch);
	});
};

module.exports = mongoose.model('Client',ClientSchema)