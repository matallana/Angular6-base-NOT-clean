'use strict'

var express = require('express');
var EventController = require('../../controller/eventos/eventos');


var api = express.Router();
var md_auth = require('../../middlerwares/authenticated');

var multipart = require('connect-multiparty');
var md_upload_minuta = multipart({uploadDir:'./uploads/minutas/'});







api.post('/guardar-eventos',  EventController.saveEventos);
api.post('/upload-minuta/:id', [md_auth.ensureAuth, md_upload_minuta], EventController.uploadMinuta);

api.get('/get-eventos', md_auth.ensureAuth, EventController.getEventos);
api.get('/get-eventospendientes/:id', md_auth.ensureAuth, EventController.getEventosbyuser);
api.get('/get-eventosbyuser/:id', md_auth.ensureAuth, EventController.getEventosbyusertotal);

api.get('/get-eventosbyid/:id', md_auth.ensureAuth, EventController.getEventosbyid);
api.get('/get-eventosbyidaprobado/:id', md_auth.ensureAuth, EventController.getEventosbyidaprobados);
api.get('/get-eventosbyidall/:id', md_auth.ensureAuth, EventController.getEventosbyidall);
api.get('/minuta/:imageFile', EventController.getMinutaFile);






api.get('/get-eventosporeditar/:id', md_auth.ensureAuth, EventController.getEventosporeditar);

api.get('/get-eventosbydate/:fecharango', EventController.getEventosbydate);
api.put('/update-eventos/:id', md_auth.ensureAuth, EventController.updateEventos);
api.put('/update-eventounidad/:id', md_auth.ensureAuth, EventController.updateEventoUnidad);
api.put('/update-reformular/:id', md_auth.ensureAuth, EventController.reformular);


api.get('/getCalendario/:id', EventController.getCalendario);
api.get('/getCalendarioAprobados/:id', EventController.getCalendarioAprobados);
api.get('/getCalendarioPendientes/:id', EventController.getCalendarioPendientes);







module.exports = api;
