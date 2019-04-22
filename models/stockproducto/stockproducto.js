'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventoSchema = require('../../models/evento/eventos');


var producto = mongoose.model('productos_info');



var StockproductoSchema = Schema({
    ProductoId:{type: Schema.ObjectId, 
        ref:'producto',
        require:true},
    cantidad: String,
    cantidadtemporal: String,
    valor: String,
    fechaCreacion: String,
});

//entidad del ticket objeto unico y represntativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('stockproducto_info', StockproductoSchema);