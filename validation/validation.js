const Joi = require('joi');

const createUser ={
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    userType: Joi.string().required(),
    roleId: Joi.string().optional().allow(null),
    isAdmin: Joi.string().optional().allow(false),
    tokens: Joi.array().optional()

}

const createRole ={
    role: Joi.string().required().min(4),
    permissions: Joi.array().optional()   
}

const createPermission ={
    permission: Joi.string().required().min(4),    
}
module.exports = {
    createUser,
    createRole,
    createPermission
}