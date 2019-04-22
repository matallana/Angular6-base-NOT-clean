'use strict'

var express = require('express');
var StockController = require('../../controller/eventos/stock');

var api = express.Router();


api.get('/get-pruebastock', StockController.pruebas);
api.get('/get-stock', StockController.getStock);
api.get('/get-stockbyevent/:id', StockController.getStockbyevent);
api.post('/guardar-stock', StockController.saveStock);
api.put('/update-stock/:id', StockController.updateStock);
api.put('/get-reservation/:id', StockController.timerreservation);
api.get('/cancel-reservation/:ips', StockController.cancelreservation);
api.get('/pedirip',StockController.pedirip);

// api.delete('/eliminar-cuenta/:id',md_auth.ensureAuth, CuentaController.deleteCuenta);

module.exports = api;



