'use strict'

var express = require('express');
/* var ObservatorioController = require('../../controller/observatorios/observatorios');
 */
var api = express.Router();

/* 
api.get('/get-pruebaobservatorio', ObservatorioController.pruebaObservatorios);
api.get('/get-observatorios', ObservatorioController.getObservatorios);

api.post('/guardar-observatorio', ObservatorioController.guardarObservatorio); */

// api.delete('/eliminar-cuenta/:id',md_auth.ensureAuth, CuentaController.deleteCuenta);

// api.put('/update-cuenta/:id',md_auth.ensureAuth, CuentaController.updateCuenta);
module.exports = api;
