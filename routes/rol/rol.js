/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: Route (GET POST )
*Información: no se ha creado delete  & put 
*/

'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var RolController = require('../../controller/rol/rol');



//Enviar
api.post('/registrar_rol', RolController.saveRol);


//actualizar 

//traer 
api.get('/get_rol', md_auth.ensureAuth, RolController.getRol);
api.get('/get_rolbyname/:name', RolController.getRolbyname);


module.exports = api; 