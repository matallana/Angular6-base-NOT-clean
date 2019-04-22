/*
*Autor: Italo Schulz
*Fecha: 06-08-2018
*Modulo: Routes User
*Información: Listar, Mostar una User
*observacion: no se ha realizado la accion de eliminar. 
*modificado: 09-08-2018 se agregar upadateUserII
*/
'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var UserController = require('../../controller/usuario/user');
var multipart = require('connect-multiparty');

var md_upload = multipart({uploadDir:'./uploads/users'});
var md_upload_banner = multipart({uploadDir:'./uploads/users/banner'});


//Enviar

api.post('/register',  md_auth.ensureAuth, UserController.saveUser);
/* api.post('/registerdep',  md_auth.ensureAuth, UserController.saveUser);
 */
api.post('/registerhome', UserController.saveUserHome);
api.post('/login',  UserController.loginUser);
api.post('/upload-imagen-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.post('/upload-image-banner/:id', [md_auth.ensureAuth, md_upload_banner], UserController.uploadImageBanner);




//actualizar 
api.put('/updateuser', md_auth.ensureAuth, UserController.updateUser);
api.put('/update_user/:id', md_auth.ensureAuth, UserController.updateUserI);
api.put('/update_usera/:id', UserController.updateUserII);


//traer 
api.get('/imagen-banner-user/:imageFile', md_auth.ensureAuth, UserController.getImagenFileBanner);
api.get('/imagen-user/:imageFile', md_auth.ensureAuth, UserController.getImagenFile);
api.get('/get_user/:id',  md_auth.ensureAuth, UserController.getUser);
api.get('/get_users/',   md_auth.ensureAuth, UserController.getAllUser);
api.get('/get_usersbyempresa/:id',   md_auth.ensureAuth, UserController.getUsersbyempresa);
api.get('/get_direccionsbyempresa/:id',   md_auth.ensureAuth, UserController.getDireccionsbyempresa);



module.exports = api; 