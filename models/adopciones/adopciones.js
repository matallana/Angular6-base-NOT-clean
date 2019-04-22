'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);


/* var venta = mongoose.model('observatorio_info');
 */


var AdopcionesSchema = Schema({
    nombreAdopcion: String,
    IdUser:  {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'usuario es requerido'],
    },
    IdProducto: {
        type: Schema.ObjectId,
        ref: 'productos_info',
        required: [true, 'producto es requerido'],
    },
    IdVenta: {
        type: Schema.ObjectId,
        ref: 'venta_info',
        required: [true, 'venta es requerida'],
    },
    IdCertAdopcion: String,
});

/* var clienteSchema = mongoose.model('clientes_info', ClientSchema);
 */
/* ClientSchema.plugin(autoIncrement.plugin, {model: 'clientes_info', field: 'pruebita'});
module.exports.clientes = clienteSchema; */

module.exports = mongoose.model('adopciones_info', AdopcionesSchema); 

/* module.exports = mongoose.model('clientefinal_info', ClientSchema.plugin(autoIncrement.plugin, {model: 'clientes_info', field: 'sessionId'}));
 */ 

/* 

schema.plugin(autoIncrement.plugin, {model: 'Product', field: 'itemId'});


//entidad del ticket objeto unico y representativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('clientes_info', ClientSchema); */