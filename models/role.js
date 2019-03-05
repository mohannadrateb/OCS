const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;
const RoleSchema = new Schema({
    role:{
        type:String
    },
    permissions:{
        type:Array,
        default:null
    },
    userId:{
        type:objectId,
        ref:'User'
    }
});

const Role = mongoose.model('Role',RoleSchema);
module.exports = Role;

