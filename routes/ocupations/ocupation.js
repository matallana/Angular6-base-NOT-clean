/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: routes profesion se crea api POST, PUT, GET se agrega el middlerwares
*Información: 
*/
'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var OcupationController = require('../../controller/ocupation/ocupation');



//Enviar
api.post('/registrar_ocupation',  md_auth.ensureAuth, OcupationController.saveOcupation);


//actualizar 
api.put('/update_ocupation/:id', md_auth.ensureAuth, OcupationController.updateOcupation);

//traer 
api.get('/get_ocupation', md_auth.ensureAuth, OcupationController.getOcupation);

module.exports = api; 