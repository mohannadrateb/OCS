const express = require('express');
const router = express.Router();
const roleController= require("../../controllers/role");

const Schema = require('../../validation/validation');
const validate = require('../../middleware/validate');
const isAdmin = require("../../middleware/isAdmin");

//Get All roles
router.get('',roleController._get);
//Get a specfic role
router.get('/:id',roleController._getById);

//Register A new role
router.post('',validate(Schema.createRole),roleController._create);

//update a specfic role
router.patch('/:id', roleController._update);

// Delete a role
router.delete('/:id',isAdmin,roleController._delete);

module.exports= router;