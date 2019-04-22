'use strict'

var express = require('express');
var VentaController = require('../../controller/webpay/venta');

var api = express.Router();

api.post('/pagar', VentaController.initTransaction);
api.post('/verificar', VentaController.getTransactionResult);
api.post('/comprobante', VentaController.Comprobante);
api.post('/anular', VentaController.Anular);

module.exports = api;
