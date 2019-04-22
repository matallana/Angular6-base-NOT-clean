'use strict'

var express = require('express');
var AdopcionController = require('../../controller/adopciones/adopciones');


var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');







api.post('/guardar-adopcion',  AdopcionController.guardarAdopciones);
api.get('/get-adopciones/:id', AdopcionController.getAdopcion);
api.get('/get-adopcionprueba', AdopcionController.pruebaAdopciones);

/* api.get('/get-eventosbydate/:fecharango', AdopcionController.getEventosbydate);
 *//* api.put('/update-eventos/:id', md_auth.ensureAuth, EventController.updateEventos);
 */



module.exports = api;

