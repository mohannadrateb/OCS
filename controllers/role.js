
const Role = require("../models/role");
const mongoose = require("mongoose");
const permissionsController = require('./permission');
const Permission = require("../models/persmissions");


const _get = (req,res)=>{
    Role.find()
  .then((roles)=>{
       return res.status(200).json(roles)
    })
  .catch((err)=>{
        res.send(err)
    })

};
const _getById = (req,res)=>{
    Role.findOne({"_id":req.params.id})
    .then((role)=>{
        res.json(role);
    })
    .catch((err)=>{
        res.json(err);
    })



};
const _create = (req,res)=>{
    let newRole = Role(req.body);
    newRole.save()
    .then((Role)=>{
        return res.status(200).json({
            message: " Role got created successfully"
        });
    })
    .catch((err)=>{
        return res.status(400).json({
            meassage: "Error when creating the Role",
            err
        })
    })



};

const _update = (req,res)=>{
    let roleId = req.params.id;
    let body = req.body.role;
    if( 'permissions' in body){
        updatePermissionsInRole(roleId,body,res);   
    }
    else updateRoleName(roleId,body,res);
       
}

const updatePermissionsInRole = (roleId,body,res)=>{
    Role.findByIdAndUpdate(roleId,{ $addToSet: {permissions: body.permissions } })
    .then(()=>{
        if('role' in body){
           return updateRoleName(roleId,body,res)  
        }
        else{

        return res.status(200).json({
            message:"Permissions in Role got Updated "
        });
    }
    })
    .catch((err)=>{
        return res.status(400).json({
            message: "Error happened, could not update permissions in  Role ",
            err
        });
    });

}

const updateRoleName = (roleId,body,res)=>{
    Role.findByIdAndUpdate(roleId,body)
    .then(()=>{
       return res.status(200).json({
           message:" The role name got updated"
       });
    }).catch((err)=>{
        return res.status(400).json({
            message: "Error happened, could not update the name of the Role ",
            err
        });
    }); 
}  


 

const _delete = (req,res)=>{
    let roleId = req.params.id;
    Role.findByIdAndDelete(roleId)
    .then(()=>{
        return res.status(200).json({
            message: "Role got deleted "
        })
    }).catch((err)=>{
        return res.status(400).json({
            message: " Error happened, could not delete Role",
            err
        });
    }); 


};

module.exports = {
    _get,
    _getById,
    _create,
    _update,
    _delete,
    
}