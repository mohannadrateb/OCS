
const User = require("../models/user");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const upload = require("../middleware/upload");

const _get = (req,res)=>{
  User.find()
  .then((users)=>{
        res.json(users)
    })
  .catch((err)=>{
        res.send(err)
    })
};
const _getById = (req,res)=>{
    User.findOne({"_id":req.params.id})
    .then((user)=>{
        res.json(user);
    })
    .catch((err)=>{
        res.json(err);
    })

};
const _create = (req,res)=>{
    let token="";
    let newUser = User(req.body);
    let registeredUser="";
    newUser.save()
    .then((user) => {
        registeredUser = user;
        return registeredUser.generateAuthToken();
    })
    .then((userAndToken)=>{
        registeredUser = userAndToken.user;
        token = userAndToken.token
      return  registeredUser.generateRefreshToken();

    })
    .then((refreshToken)=>{
        res.status(200)
        .header('Authorization', `Bearer ${token}`)
        .header('X-Refresh-Token', refreshToken)
        .cookie('auth', `Bearer ${token}`, {
          httpOnly: true
        })
        .cookie('refresh', refreshToken, {
          httpOnly: true
        }).json({
            registeredUser
        });

    })
    .catch((err)=>{
        return res.status(400).json({
            meassage: "Error when creating the user",
            err
        })
    })
   

};

const _update = (req,res)=>{
    let userId = req.params.id;
    let body = req.body.user;
    console.log(body);
    User.findByIdAndUpdate(userId,body)
    .then(()=>{
       return res.status(200).json({
           message:" Got updated"
       });
    }).catch((err)=>{
        return res.status(400).json({
            message: "Error happened, could not update user ",
            err
        });
    });


};

const _delete = (req,res)=>{
    let userId = req.params.id;
    User.findByIdAndDelete(userId)
    .then(()=>{
        return res.status(200).json({
            message: "User got deleted "
        })
    }).catch((err)=>{
        return res.status(400).json({
            message: " Error happened, could not delete user",
            err
        });
    });    
};

const _imageUpload = (req,res)=>{
    upload(req,res,next =>{
        res.status(200).json({
            message:"uploaded the message succesfully"
        });
    });
};

const _getFile = (req,res)=>{
    const id = req.params.id;
    const file = req.params.file;
    
    fs.readFile(`./uploads/${id}/${file}`,function(err,file){
         if(err){
             return res.status(400).json({
                 mesaage:"Access Denied",
                 error: err
             });  
         }
        res.writeHead(200,{'Content-type':'image/jpg'})
        res.end(file);

    }   
    );
    



}



 

module.exports = {
    _get,
    _getById,
    _create,
    _update,
    _delete,
    _imageUpload ,
    _getFile 
}


