'use strict'

var express = require('express');
var ProductoresController = require('../../controller/productores/productores');


var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');







api.post('/guardar-productor',  ProductoresController.guardarProductores);
api.get('/get-productores', ProductoresController.getProductores);
api.get('/get-productorbyid/:id', ProductoresController.getProductoresbyid);

api.get('/get-productoresprueba', ProductoresController.pruebaProductores);

/* api.get('/get-eventosbydate/:fecharango', AdopcionController.getEventosbydate);
 *//* api.put('/update-eventos/:id', md_auth.ensureAuth, EventController.updateEventos);
 */



module.exports = api;

