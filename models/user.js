const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
var config = require("config");
const Keys = require("../config/keys")



const userSchema = new Schema ({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    firstName:{
        type:String,
        required:[true,'First Name is required'] 
    },
    lastName:{
        type:String,
        required:[true,'Last Name is required']
    },
    userType:{
        type:String,
        enum:['Guest','Ocser'],
        required:[true,'user Type is required']
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token:{
            type:String,
            required:true
        }


    }],
    isAdmin:{
        type:Boolean,
        default:false      
    },
    facebookId:{
        type:String
    },
    roleId:{
        type:String,
        default:null
    }
})

userSchema.pre('save',function(next){
 var user= this
 if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hashedPassword)=>{
            user.password=hashedPassword;
            next();
     });
  });
}
 else next();
});

userSchema.statics.findByAuthToken = function(token){
    var user = this;
    return user.findOne({
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userSchema.statics.findByRefreshToken = function(token){
    var user = this;
    return user.findOne({
        'tokens.token': token,
        'tokens.access': 'refresh'
    });
};


userSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};


userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    },
    Keys.jwtAuthKey,
    {
        expiresIn:Keys.authTokenLife
    }).toString();
    return new Promise((resolve,reject)=>{
        user.tokens.push({
           access,
            token
        })
        return user.save()
        .then(() => {
            return resolve({
                token,
                user
            
            });
        })
        .catch((err)=>{
            return reject(err);
        });
    });   
};


userSchema.methods.generateRefreshToken = function(){
    var user = this;
    var access = 'refresh';
    var refreshToken = jwt.sign({
        _id: user._id.toHexString(),
        access
    },
    Keys.jwtRefreshKey,
    {
        expiresIn:Keys.refreshTokenLife
    }).toString();
    return new Promise((resolve,reject)=>{
        user.tokens.push({
            access,
            token:refreshToken
         })
         return user.save()
         .then(() => {
             return resolve({
                refreshToken
             
             });
         })
         .catch((err)=>{
             return reject(err);
         });

       

    });
    

    
    
  


}

const User = mongoose.model('User',userSchema);
module.exports = User;