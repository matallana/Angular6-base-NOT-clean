'use strict'

var express = require('express');
var ClientesController = require('../../controller/clientes/clientes');

var api = express.Router();


api.get('/get-pruebaclientes', ClientesController.pruebaClientes);
api.post('/guardar-cliente', ClientesController.guardarCliente);
api.get('/get-clientes', ClientesController.getClientes);

 
// api.delete('/eliminar-cuenta/:id',md_auth.ensureAuth, CuentaController.deleteCuenta);

// api.put('/update-cuenta/:id',md_auth.ensureAuth, CuentaController.updateCuenta);
module.exports = api;
