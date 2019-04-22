'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventoSchema = require('../../models/evento/eventos');


var eventos = mongoose.model('eventos_info');



var StockSchema = Schema({
    evento:{type: Schema.ObjectId, 
        ref:'eventos',
        require:true},
    cantidad: String,
    cantidadtemporal: String,
    valor: String,
    fechaCreacion: String,
    fechaEvento: String,
    horaEvento: String,
    FechaActual:String,
});

//entidad del ticket objeto unico y represntativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('stock_info', StockSchema);