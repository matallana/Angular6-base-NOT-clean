/*
*Autor: Italo Schulz
*Fecha: 29-08-2018
*Modulo: Hora js
*Información: Se crean las rutas post, put, get. se implemnta seguridad mendiante usuario registrado (Token)
*/
'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var HoraController = require('../../controller/hora_evento/hora');



//Enviar
api.post('/registrar_hora',  md_auth.ensureAuth, HoraController.saveHora);


//actualizar 
/* api.put('/update_hora/:id',  md_auth.ensureAuth, HoraController.updateHora); */

//traer 
api.get('/get_hora',  md_auth.ensureAuth, HoraController.getHora);

module.exports = api; 