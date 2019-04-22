/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: Route (GET POST PUT)
*Información: 
*/

'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var PaisController = require('../../controller/pais/pais');



//Enviar
api.post('/registrar_pais',  md_auth.ensureAuth, PaisController.savePais);


//actualizar 
api.put('/update_pais/:id', md_auth.ensureAuth, PaisController.updatePais);

//traer 
api.get('/get_pais', md_auth.ensureAuth, PaisController.getPais);

module.exports = api; 