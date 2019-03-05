const express = require('express');
const router = express.Router();
const permissionController= require("../../controllers/permission");

const Schema = require('../../validation/validation');
const validate = require('../../middleware/validate');
const isAdmin = require("../../middleware/isAdmin");

//Get All permissions
router.get('',permissionController._get);
//Get a specfic permission
router.get('/:id',permissionController._getById);

//create A new permission
router.post('',validate(Schema.createPermission),permissionController._create);

//update a specfic permission
router.patch('/:id', permissionController._update);

// Delete a permission
router.delete('/:id',isAdmin,permissionController._delete);

module.exports= router;