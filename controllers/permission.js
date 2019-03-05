
const Permission = require("../models/persmissions");
const mongoose = require("mongoose");



const _get = (req,res)=>{
  Permission.find({})
    .then((persmissions)=>{
    return res.status(200).json(persmissions);    
    });
};
const _getById = (req,res)=>{
    Permission.findOne({"_id":req.params.id})
    .then((permission)=>{
        res.status(200).json(permission);
    })
    .catch((err)=>{
        res.status(400).json(err);
    })



};
const _create = (req,res)=>{
    let newPermission = Permission(req.body);
    newPermission.save()
    .then(()=>{
      return res.status(200).json({
          message: " Permission got created successfully"
      });
  
    })
    .catch((err)=>{
        return res.status(400).json({
            meassage: "Error when creating the Permission",
            err
        })
    })
 

};

const _update = (req,res)=>{
    let permissionId = req.params.id;
    let body = req.body.permission;
    Permission.findByIdAndUpdate(permissionId,body)
    .then(()=>{
       return res.status(200).json({
           message:" Got updated"
       });
    }).catch((err)=>{
        return res.status(400).json({
            message: "Error happened, could not update Permission ",
            err
        });
    });

};

const _delete = (req,res)=>{
    let permissionId = req.params.id;
    Permission.findByIdAndDelete(permissionId)
    .then(()=>{
        return res.status(200).json({
            message: "Permission got deleted "
        })
    }).catch((err)=>{
        return res.status(400).json({
            message: " Error happened, could not delete permission",
            err
        });
    }); 
  

};

module.exports = {
    _get,
    _getById,
    _create,
    _update,
    _delete
}