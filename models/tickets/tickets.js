'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObservatorioSchema = require('../../models/tickets/stock');


var stock = mongoose.model('stock_info');



var TicketSchema = Schema({
    observatorio:{type: Schema.ObjectId, 
      ref:'stock',
      require:true},
    stock: String,
});

//entidad del ticket objeto unico y represntativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('tickets_info', EventoSchema);