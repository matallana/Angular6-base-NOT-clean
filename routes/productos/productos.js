'use strict'

var express = require('express');
var ProductosController = require('../../controller/productos/productos');


var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');







api.post('/guardar-producto',  ProductosController.guardarProducto);
api.get('/get-productos', ProductosController.getProductos);
api.get('/get-productosbyname/:name', ProductosController.getProductobyname);
api.get('/get-productoprueba', ProductosController.pruebaProductos);

/* api.get('/get-eventosbydate/:fecharango', AdopcionController.getEventosbydate);
 *//* api.put('/update-eventos/:id', md_auth.ensureAuth, EventController.updateEventos);
 */



module.exports = api;

