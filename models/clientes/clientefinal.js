'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);


/* var venta = mongoose.model('observatorio_info');
 */


var finalclientSchema = Schema({
    nombreUsuario: String,
    apellidoUsuario: String,
    emailUsuario: String,
    telefono: Number,
    pais: String,
});


/* var clienteSchema = mongoose.model('clientes_info', ClientSchema);
 */


/* ClientSchema.plugin(autoIncrement.plugin, {model: 'clientes_info', field: 'pruebita'});
module.exports.clientes = clienteSchema; */

module.exports = mongoose.model('finalclient_info', finalclientSchema); 

/* module.exports = mongoose.model('clientefinal_info', ClientSchema.plugin(autoIncrement.plugin, {model: 'clientes_info', field: 'sessionId'}));
 


*/ 

/* 

schema.plugin(autoIncrement.plugin, {model: 'Product', field: 'itemId'});


//entidad del ticket objeto unico y representativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('clientes_info', ClientSchema); */