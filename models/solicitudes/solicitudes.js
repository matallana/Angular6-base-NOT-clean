'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SolicitudesSchema = Schema({
    id_depto_comunic: {
      type: ObjectId,
      ref: 'Depto_comunicaciones',
      required: [true, 'Comunicaciones es requerido']
    },
    id_departamento: {
      type: ObjectId,
      ref: 'Departamentos',
      required: [true, 'Departamento es requerido']
    },
    categoria: {
      type: ObjectId,
      ref: 'Categoria_solicitud',
      required: [true, 'Categoria es requerido']
    },
    estado: String,
    fecha_creacion: Date,
    fecha_modificacion: Date,
    observaciones: {
      type: String,
      min: 10,
      max: 250,
    }

});

//entidad del ticket objeto unico y represntativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('Solicitudes', SolicitudesSchema);
