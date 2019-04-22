'use strict'

var express = require('express');
var PrediosController = require('../../controller/municipalidades/predios');


var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');







api.post('/guardar-predio',  PrediosController.guardarPredios);
api.get('/get-predios', PrediosController.getPredios);
api.get('/get-prediobyid/:id', PrediosController.getPrediosbyid);
api.get('/get-prediosprueba', PrediosController.pruebaPredios);

/* api.get('/get-eventosbydate/:fecharango', AdopcionController.getEventosbydate);
 *//* api.put('/update-eventos/:id', md_auth.ensureAuth, EventController.updateEventos);
 */



module.exports = api;

