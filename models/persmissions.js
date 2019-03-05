const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId= Schema.Types.ObjectId;
const PermissionSchema = new Schema({
    permission:{
       type:String,
       enum:['createUser', 'updateUser', 'DeleteUser',
             'CreateRole','updateRole', 'DleteRole' 
            ]       
    }
    
});

const Permission = mongoose.model('Permission' , PermissionSchema); 
module.exports = Permission; 