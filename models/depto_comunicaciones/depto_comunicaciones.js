'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);


var Depto_comunicacionesSchema = Schema({
    id_usuario: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Usuario es requerido']
    },
    id_municipalidad: {
        type: Schema.ObjectId,
        ref: 'Alcalde',
        required: [true, 'Alcalde es requerido'],
    },
});
 
module.exports = mongoose.model('Depto_comunicaciones', Depto_comunicacionesSchema);
