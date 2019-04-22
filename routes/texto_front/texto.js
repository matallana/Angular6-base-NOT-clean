/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: texto js
*Información:Se crea datos publicos de observatorios (texto front)
*/
'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var TextoController = require('../../controller/front_texto/texto');



//Enviar
api.post('/registrar_texto', md_auth.ensureAuth, TextoController.saveTexto);


//actualizar 
api.put('/update_texto/:id',  md_auth.ensureAuth, TextoController.updateTexto);

//traer 
api.get('/get_texto', TextoController.getTexto);

module.exports = api; 