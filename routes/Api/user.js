const express = require('express');
const router = express.Router();
const userController= require("../../controllers/user");

const Schema = require('../../validation/validation');
const validate = require('../../middleware/validate');
const isAdmin = require("../../middleware/isAdmin");
const authenticate = require("../../middleware/authenticate");
const upload = require("../../middleware/upload"); 





//Get All user
router.get('',userController._get);
//Get a specfic user
router.get('/:id',userController._getById);
//Get a new File
router.get('/file/:id/:file',userController._getFile)

//Register A new User
router.post('',validate(Schema.createUser),userController._create);
// Post a Picture
router.post('/upload/:id',userController._imageUpload) ;
//router.post('/upload/:id', upload,userController._imageUpload);

//update a specfic user
router.patch('/:id',authenticate, userController._update);

// Delete a user
router.delete('/:id',isAdmin,userController._delete);

module.exports= router;