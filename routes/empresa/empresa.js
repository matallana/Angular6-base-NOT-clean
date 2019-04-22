/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: empresa js
*Información: Se crean las rutas post, put, get. se implemnta seguridad mendiante usuario registrado (Token)
*/
'use strict'

var express = require('express');
var api = express.Router();

var md_auth = require('../../middlerwares/authenticated');
var EmpresaController = require('../../controller/empresa/empresa');



//Enviar
api.post('/registrar_empresa', md_auth.ensureAuth, EmpresaController.saveEmpresa);


//actualizar 
api.put('/update_empresa/:id',  md_auth.ensureAuth, EmpresaController.updateEmpresa);

//traer 
api.get('/get_empresa',  md_auth.ensureAuth, EmpresaController.getEmpresa);

module.exports = api; 